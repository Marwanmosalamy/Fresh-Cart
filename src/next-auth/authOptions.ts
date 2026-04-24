import { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { jwtDecode } from "jwt-decode";
export const authOptions: NextAuthOptions = {
  providers: [
    Credentials({
      name: "myLogin",

      credentials: {
        email: {
          label: "email",
          type: "email",
          placeholder: "example@example.com",
        },
        password: {
          label: "password",
          type: "password",
          placeholder: "********",
        },
      },

      async authorize(credentials, req) {
        try {
          const res = await fetch(
            `https://ecommerce.routemisr.com/api/v1/auth/signin`,
            {
              method: "POST",
              body: JSON.stringify({
                email: credentials?.email,
                password: credentials?.password,
              }),
              headers: { "content-type": "application/json" },
            },
          );

          const result = await res.json();
          console.log("result of login ", result);

          if (!res.ok) {
            throw new Error(result.message || "invalid login");
          }
          const jwt: { id: string } = jwtDecode(result.token);
          console.log("jwt-decode", jwt);

          return {
            id: jwt.id,
            name: result.user.name,
            email: result.user.email,
            phone: result.user.phone ?? "",
            accessToken: result.token,
          };
        } catch (err) {
          console.log("error from api", err);
          throw new Error((err as Error).message);
          return null;
        }
      },
    }),
  ],

  callbacks: {
    jwt(param) {
      if (param.user) {
        param.token.routeToken = param.user.accessToken;
        param.token.id = param.user.id;
        param.token.phone = (param.user as any).phone ?? "";
      }

      return param.token;
    },
    session({ token, session }) {
      session.id = token.id;
      session.routeToken = token.routeToken;
      (session as any).phone = token.phone ?? "";
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
};
