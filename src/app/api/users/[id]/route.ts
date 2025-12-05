import { NextRequest } from "next/server";
import { errorResponse, successResponse } from "@/lib/api";
import { prisma } from "@/lib/prisma";

type RouteContext<T> = { params: T } | { params: Promise<T> };

async function resolveParams<T>(context: RouteContext<T>): Promise<T> {
  return context.params instanceof Promise ? await context.params : context.params;
}

export async function GET(_req: NextRequest, context: RouteContext<{ id: string }>) {
  const params = await resolveParams(context);

  const user = await prisma.user.findUnique({
    where: { id: params.id },
    include: {
      ownedProjects: true,
      projectMembership: {
        include: {
          project: true,
        },
      },
      projectInterests: true,
      notifications: {
        orderBy: { createdAt: "desc" },
        take: 20,
      },
    },
  });

  if (!user) {
    return errorResponse("User not found.", 404);
  }

  return successResponse(user);
}
