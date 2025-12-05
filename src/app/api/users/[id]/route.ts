import { NextRequest, NextResponse } from "next/server";
import { errorResponse, successResponse } from "@/lib/api";
import { prisma } from "@/lib/prisma";

type RouteContext = { params: Promise<{ id: string }> };

async function getParams(context: RouteContext) {
  return context.params;
}

export async function GET(
  _req: NextRequest,
  context: RouteContext,
): Promise<NextResponse> {
  const params = await getParams(context);

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
