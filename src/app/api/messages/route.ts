import { NextRequest } from "next/server";
import { requireAuth, errorResponse, successResponse } from "@/lib/api";
import { prisma } from "@/lib/prisma";
import type { Prisma } from "@prisma/client";

export async function GET(req: NextRequest) {
  const { user, response } = await requireAuth();
  if (!user) return response;

  const searchParams = req.nextUrl.searchParams;
  const projectId = searchParams.get("projectId");
  const peerId = searchParams.get("peerId");

  if (projectId) {
    const project = await prisma.project.findUnique({
      where: { id: projectId },
      include: {
        members: { select: { userId: true } },
      },
    });

    if (!project) {
      return errorResponse("Project not found.", 404);
    }

    const isMember = project.ownerId === user.id || project.members.some((m) => m.userId === user.id);
    if (!isMember) {
      return errorResponse("You must be a project member to view messages.", 403);
    }
  }

  const where: Prisma.MessageWhereInput = {
    ...(projectId ? { projectId } : {}),
  };

  if (peerId) {
    where.OR = [
      { senderId: user.id, recipientId: peerId },
      { senderId: peerId, recipientId: user.id },
    ];
  } else {
    where.OR = [{ senderId: user.id }, { recipientId: user.id }];
  }

  const messages = await prisma.message.findMany({
    where,
    include: { sender: true, recipient: true },
    orderBy: { createdAt: "asc" },
  });

  return successResponse(messages);
}

export async function POST(req: NextRequest) {
  const { user, response } = await requireAuth();
  if (!user) return response;

  const body = await req.json();
  const content = body?.content?.trim();
  const projectId: string | null = body?.projectId ?? null;
  const recipientId: string | null = body?.recipientId ?? null;

  if (!content) {
    return errorResponse("Message content is required.", 422);
  }

  if (!projectId && !recipientId) {
    return errorResponse("A projectId or recipientId is required.", 422);
  }

  if (projectId) {
    const project = await prisma.project.findUnique({
      where: { id: projectId },
      include: {
        members: { select: { userId: true } },
      },
    });

    if (!project) {
      return errorResponse("Project not found.", 404);
    }

    const isMember = project.ownerId === user.id || project.members.some((m) => m.userId === user.id);
    if (!isMember) {
      return errorResponse("You must be a project member to post messages.", 403);
    }
  }

  const message = await prisma.message.create({
    data: {
      content,
      projectId,
      senderId: user.id,
      recipientId,
    },
    include: { sender: true, recipient: true },
  });

  return successResponse(message, 201);
}
