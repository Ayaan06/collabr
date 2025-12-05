import { NextRequest, NextResponse } from "next/server";
import { requireAuth, errorResponse, successResponse } from "@/lib/api";
import { prisma } from "@/lib/prisma";

export async function GET(
  _req: NextRequest,
  context: { params: Promise<{ id: string }> },
): Promise<NextResponse> {
  const { id } = await context.params;

  const interests = await prisma.projectInterest.findMany({
    where: { projectId: id },
    include: { user: true },
    orderBy: { createdAt: "desc" },
  });

  return successResponse(interests);
}

export async function POST(
  req: NextRequest,
  context: { params: Promise<{ id: string }> },
): Promise<NextResponse> {
  const { user, response } = await requireAuth();
  if (!user) return response;

  const { id } = await context.params;

  const project = await prisma.project.findUnique({
    where: { id },
    select: { ownerId: true, title: true },
  });

  if (!project) {
    return errorResponse("Project not found.", 404);
  }

  const existing = await prisma.projectInterest.findUnique({
    where: {
      projectId_userId: {
        projectId: id,
        userId: user.id,
      },
    },
  });

  if (existing) {
    return errorResponse("You have already requested to join this project.", 409);
  }

  const body = await req.json();
  const message = body?.message ? String(body.message) : null;

  const interest = await prisma.projectInterest.create({
    data: {
      projectId: id,
      userId: user.id,
      message,
    },
  });

  await prisma.notification.create({
    data: {
      userId: project.ownerId,
      title: "New project interest",
      body: `${user.name ?? "Someone"} wants to join ${project.title}.`,
    },
  });

  return successResponse(interest, 201);
}
