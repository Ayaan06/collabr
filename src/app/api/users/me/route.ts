import { NextRequest } from "next/server";
import { requireAuth, errorResponse, successResponse } from "@/lib/api";
import { prisma } from "@/lib/prisma";
import { MemberRole } from "@prisma/client";

export async function PATCH(req: NextRequest) {
  const { user, response } = await requireAuth();
  if (!user) return response;

  const body = await req.json();
  const data: Record<string, unknown> = {};

  if (body.name !== undefined) data.name = body.name ? String(body.name) : null;
  if (body.headline !== undefined) data.headline = body.headline ? String(body.headline) : null;
  if (body.bio !== undefined) data.bio = body.bio ? String(body.bio) : null;
  if (body.location !== undefined) data.location = body.location ? String(body.location) : null;
  if (body.role !== undefined) {
    const role = String(body.role).toUpperCase();
    if (!Object.keys(MemberRole).includes(role)) {
      return errorResponse("Invalid role.", 422);
    }
    data.role = role;
  }

  if (Array.isArray(body.skills)) {
    data.skills = body.skills.map((skill: unknown) => String(skill));
  }

  if (Object.keys(data).length === 0) {
    return errorResponse("No updates provided.", 400);
  }

  const updated = await prisma.user.update({
    where: { id: user.id },
    data,
  });

  return successResponse(updated);
}
