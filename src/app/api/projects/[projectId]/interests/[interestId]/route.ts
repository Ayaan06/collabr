import { NextRequest, NextResponse } from "next/server";
import { requireAuth, errorResponse, successResponse } from "@/lib/api";
import { prisma } from "@/lib/prisma";
import { InterestStatus } from "@prisma/client";

export async function PATCH(
  req: NextRequest,
  context: { params: Promise<{ projectId: string; interestId: string }> },
): Promise<NextResponse> {
  const { user, response } = await requireAuth();
  if (!user) return response;

  const { projectId, interestId } = await context.params;

  const interest = await prisma.projectInterest.findUnique({
    where: { id: interestId },
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
    where: { id: interestId },
    data: { status },
    include: { user: true },
  });

  if (status === InterestStatus.ACCEPTED) {
    await prisma.projectMember.upsert({
      where: {
        projectId_userId: { projectId, userId: interest.userId },
      },
      create: {
        projectId,
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
