import { NextRequest, NextResponse } from "next/server";
import { requireAuth, errorResponse, successResponse } from "@/lib/api";
import { prisma } from "@/lib/prisma";
import { TaskStatus } from "@prisma/client";

type RouteContext = { params: Promise<{ taskId: string }> };

async function getParams(context: RouteContext) {
  return context.params;
}

export async function PATCH(
  req: NextRequest,
  context: RouteContext,
): Promise<NextResponse> {
  const { user, response } = await requireAuth();
  if (!user) return response;

  const params = await getParams(context);

  const task = await prisma.task.findUnique({
    where: { id: params.taskId },
    include: { project: true },
  });

  if (!task) {
    return errorResponse("Task not found.", 404);
  }

  const member = await prisma.projectMember.findUnique({
    where: {
      projectId_userId: { projectId: task.projectId, userId: user.id },
    },
  });

  if (task.project.ownerId !== user.id && !member) {
    return errorResponse("Only project members can update tasks.", 403);
  }

  const body = await req.json();
  const data: Record<string, unknown> = {};

  if (body.title) data.title = String(body.title);
  if (body.description !== undefined) data.description = body.description ? String(body.description) : null;

  if (body.status) {
    const status = String(body.status).toUpperCase();
    if (!Object.values(TaskStatus).includes(status as TaskStatus)) {
      return errorResponse("Invalid status.", 422);
    }
    data.status = status;
  }

  if (body.assigneeId !== undefined) {
    if (body.assigneeId === null) {
      data.assigneeId = null;
    } else {
      const assignee = await prisma.projectMember.findUnique({
        where: {
          projectId_userId: { projectId: task.projectId, userId: String(body.assigneeId) },
        },
      });
      if (!assignee) {
        return errorResponse("Assignee must be part of the project.", 400);
      }
      data.assigneeId = String(body.assigneeId);
    }
  }

  const updated = await prisma.task.update({
    where: { id: params.taskId },
    data,
  });

  return successResponse(updated);
}
