import { MemberRole } from "@prisma/client";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      role?: MemberRole | null;
    };
  }

  interface User {
    role?: MemberRole | null;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role?: MemberRole | null;
  }
}
