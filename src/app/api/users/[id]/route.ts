import { NextRequest } from "next/server";
import { errorResponse, successResponse } from "@/lib/api";
import { prisma } from "@/lib/prisma";

type Params = { params: { id: string } };

export async function GET(_req: NextRequest, { params }: Params) {
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
