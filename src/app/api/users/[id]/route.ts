import { NextRequest, NextResponse } from "next/server";
import { errorResponse, successResponse } from "@/lib/api";
import { prisma } from "@/lib/prisma";

export async function GET(
  _req: NextRequest,
  context: { params: Promise<{ id: string }> },
): Promise<NextResponse> {
  const { id } = await context.params;

  const user = await prisma.user.findUnique({
    where: { id },
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
