import { NextRequest } from "next/server";
import { requireAuth, errorResponse, successResponse } from "@/lib/api";
import { prisma } from "@/lib/prisma";

type RouteContext<T> = { params: T } | { params: Promise<T> };

async function resolveParams<T>(context: RouteContext<T>): Promise<T> {
  return context.params instanceof Promise ? await context.params : context.params;
}

export async function PATCH(req: NextRequest, context: RouteContext<{ id: string }>) {
  const { user, response } = await requireAuth();
  if (!user) return response;

  const params = await resolveParams(context);

  const message = await prisma.message.findUnique({ where: { id: params.id } });
  if (!message) {
    return errorResponse("Message not found.", 404);
  }

  if (message.senderId !== user.id) {
    return errorResponse("You can only edit your own messages.", 403);
  }

  const body = await req.json();
  const content = body?.content?.trim();

  if (!content) {
    return errorResponse("Content is required.", 422);
  }

  const updated = await prisma.message.update({
    where: { id: params.id },
    data: { content },
  });

  return successResponse(updated);
}

export async function DELETE(_req: NextRequest, context: RouteContext<{ id: string }>) {
  const { user, response } = await requireAuth();
  if (!user) return response;

  const params = await resolveParams(context);

  const message = await prisma.message.findUnique({ where: { id: params.id } });
  if (!message) {
    return errorResponse("Message not found.", 404);
  }

  if (message.senderId !== user.id) {
    return errorResponse("You can only delete your own messages.", 403);
  }

  await prisma.message.delete({ where: { id: params.id } });

  return successResponse({ success: true });
}
