import { NextRequest } from "next/server";
import { requireAuth, errorResponse, successResponse } from "@/lib/api";
import { prisma } from "@/lib/prisma";

type RouteContext<T> = { params: T } | { params: Promise<T> };

async function resolveParams<T>(context: RouteContext<T>): Promise<T> {
  return context.params instanceof Promise ? await context.params : context.params;
}

export async function GET(_req: NextRequest, context: RouteContext<{ id: string }>) {
  const params = await resolveParams(context);

  const project = await prisma.project.findUnique({
    where: { id: params.id },
    include: {
      owner: true,
      members: {
        include: { user: true },
      },
      interests: {
        include: { user: true },
      },
      tasks: true,
    },
  });

  if (!project) {
    return errorResponse("Project not found.", 404);
  }

  return successResponse(project);
}

export async function PATCH(req: NextRequest, context: RouteContext<{ id: string }>) {
  const { user, response } = await requireAuth();
  if (!user) return response;

  const params = await resolveParams(context);

  const project = await prisma.project.findUnique({
    where: { id: params.id },
  });

  if (!project) {
    return errorResponse("Project not found.", 404);
  }

  if (project.ownerId !== user.id) {
    return errorResponse("Only the project owner can update this project.", 403);
  }

  const body = await req.json();
  const data: Record<string, unknown> = {};

  if (body.title) data.title = String(body.title);
  if (body.description) data.description = String(body.description);
  if (body.status) data.status = String(body.status);

  const updated = await prisma.project.update({
    where: { id: params.id },
    data,
  });

  return successResponse(updated);
}

export async function DELETE(_req: NextRequest, context: RouteContext<{ id: string }>) {
  const { user, response } = await requireAuth();
  if (!user) return response;

  const params = await resolveParams(context);

  const project = await prisma.project.findUnique({
    where: { id: params.id },
    select: { ownerId: true },
  });

  if (!project) {
    return errorResponse("Project not found.", 404);
  }

  if (project.ownerId !== user.id) {
    return errorResponse("Only the project owner can delete this project.", 403);
  }

  await prisma.project.delete({ where: { id: params.id } });

  return successResponse({ success: true });
}
