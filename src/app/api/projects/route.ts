import { NextRequest } from "next/server";
import { requireAuth, errorResponse, successResponse } from "@/lib/api";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const ownerId = searchParams.get("ownerId") ?? undefined;
  const includeMembers = searchParams.get("withMembers") === "true";

  const projects = await prisma.project.findMany({
    where: ownerId ? { ownerId } : undefined,
    include: {
      owner: true,
      members: includeMembers
        ? {
            include: {
              user: true,
            },
          }
        : false,
      interests: {
        include: {
          user: true,
        },
      },
      tasks: true,
    },
    orderBy: { createdAt: "desc" },
  });

  return successResponse(projects);
}

export async function POST(req: NextRequest) {
  const { user, response } = await requireAuth();
  if (!user) return response;

  const body = await req.json();
  const title = body?.title?.trim();
  const description = body?.description?.trim();
  const status = body?.status?.trim() || "active";

  if (!title || !description) {
    return errorResponse("Title and description are required.", 422);
  }

  const project = await prisma.project.create({
    data: {
      title,
      description,
      status,
      ownerId: user.id,
    },
  });

  return successResponse(project, 201);
}
