import { NextRequest } from "next/server";
import { requireAuth, errorResponse, successResponse } from "@/lib/api";
import { prisma } from "@/lib/prisma";
import { TaskStatus } from "@prisma/client";

type RouteContext<T> = { params: T } | { params: Promise<T> };

async function resolveParams<T>(context: RouteContext<T>): Promise<T> {
  return context.params instanceof Promise ? await context.params : context.params;
}

export async function POST(req: NextRequest, context: RouteContext<{ id: string }>) {
  const { user, response } = await requireAuth();
  if (!user) return response;

  const params = await resolveParams(context);

  const project = await prisma.project.findUnique({
    where: { id: params.id },
  });

  if (!project) {
    return errorResponse("Project not found.", 404);
  }

  const member = await prisma.projectMember.findUnique({
    where: {
      projectId_userId: { projectId: params.id, userId: user.id },
    },
  });

  if (project.ownerId !== user.id && !member) {
    return errorResponse("Only members can add tasks.", 403);
  }

  const body = await req.json();
  const title = body?.title?.trim();

  if (!title) {
    return errorResponse("Task title is required.", 422);
  }

  const statusInput = body?.status?.toUpperCase();
  const status = Object.values(TaskStatus).includes(statusInput)
    ? (statusInput as TaskStatus)
    : TaskStatus.TODO;

  if (body.assigneeId) {
    const assignee = await prisma.projectMember.findUnique({
      where: {
        projectId_userId: { projectId: params.id, userId: body.assigneeId },
      },
    });
    if (!assignee) {
      return errorResponse("Assignee must be a project member.", 400);
    }
  }

  const task = await prisma.task.create({
    data: {
      title,
      description: body?.description ?? null,
      status,
      projectId: params.id,
      assigneeId: body?.assigneeId ?? null,
    },
  });

  return successResponse(task, 201);
}
