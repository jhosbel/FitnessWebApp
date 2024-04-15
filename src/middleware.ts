export { default } from "next-auth/middleware";

export const config = {
  matcher: ["/training/:path*", "/feeding", "/dashboard", "/settings", "/profile"],
};
