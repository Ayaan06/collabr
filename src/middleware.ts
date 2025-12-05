export { default } from "next-auth/middleware";

export const config = {
  matcher: ["/dashboard/:path*", "/projects/:path*", "/people/:path*", "/messages/:path*", "/profile/:path*"],
};
