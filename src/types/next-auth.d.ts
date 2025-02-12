import "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      email: string;
      token: string;
      id: string;
      role: string;
      userConfig: { id: string };
    };
  }
}
