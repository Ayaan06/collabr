import { NextRequest } from "next/server";
import { errorResponse, successResponse } from "@/lib/api";
import { prisma } from "@/lib/prisma";
import { hash } from "bcryptjs";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const email = body?.email?.toLowerCase().trim();
  const password = body?.password as string | undefined;
  const name = body?.name?.trim() ?? null;

  if (!email || !password) {
    return errorResponse("Email and password are required.", 422);
  }

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    return errorResponse("An account with this email already exists.", 409);
  }

  const hashedPassword = await hash(password, 12);

  const user = await prisma.user.create({
    data: {
      email,
      name,
      hashedPassword,
    },
  });

  return successResponse(
    {
      id: user.id,
      email: user.email,
      name: user.name,
    },
    201,
  );
}
