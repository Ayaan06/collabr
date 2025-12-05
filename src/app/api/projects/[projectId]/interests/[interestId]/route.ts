import { NextRequest } from "next/server";
import { requireAuth, errorResponse, successResponse } from "@/lib/api";
import { prisma } from "@/lib/prisma";
import { InterestStatus } from "@prisma/client";

type RouteContext<T> = { params: T } | { params: Promise<T> };

async function resolveParams<T>(context: RouteContext<T>): Promise<T> {
  return context.params instanceof Promise ? await context.params : context.params;
}

export async function PATCH(req: NextRequest, context: RouteContext<{ projectId: string; interestId: string }>) {
  const { user, response } = await requireAuth();
  if (!user) return response;

  const params = await resolveParams(context);

  const interest = await prisma.projectInterest.findUnique({
    where: { id: params.interestId },
    include: { project: true, user: true },
  });

  if (!interest) {
    return errorResponse("Interest request not found.", 404);
  }

  if (interest.project.ownerId !== user.id) {
    return errorResponse("Only the project owner can update interests.", 403);
  }

  const body = await req.json();
  const status = String(body?.status ?? "").toUpperCase() as InterestStatus;

  if (!Object.values(InterestStatus).includes(status)) {
    return errorResponse("Invalid status.", 422);
  }

  const updated = await prisma.projectInterest.update({
    where: { id: params.interestId },
    data: { status },
    include: { user: true },
  });

  if (status === InterestStatus.ACCEPTED) {
    await prisma.projectMember.upsert({
      where: {
        projectId_userId: { projectId: params.projectId, userId: interest.userId },
      },
      create: {
        projectId: params.projectId,
        userId: interest.userId,
      },
      update: {},
    });
  }

  await prisma.notification.create({
    data: {
      userId: interest.userId,
      title: "Project interest updated",
      body: `Your request to join ${interest.project.title} is now ${status.toLowerCase()}.`,
    },
  });

  return successResponse(updated);
}
