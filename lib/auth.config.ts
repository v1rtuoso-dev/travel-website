import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

// Edge-compatible auth config — used by middleware only
// No DB/Prisma imports allowed here
export const { auth: authMiddleware } = NextAuth({
    providers: [
        Credentials({
            name: "credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Mật khẩu", type: "password" },
            },
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            async authorize(_credentials) {
                // This middleware config only validates JWT tokens
                // Actual credential verification happens in lib/auth.ts
                return null;
            },
        }),
    ],
    callbacks: {
        jwt({ token, user }) {
            if (user) {
                token.role = (user as { role?: string }).role;
                token.id = user.id;
            }
            return token;
        },
        session({ session, token }) {
            if (session.user) {
                (session.user as { role?: string }).role = token.role as string;
                (session.user as { id?: string }).id = token.id as string;
            }
            return session;
        },
    },
    pages: {
        signIn: "/login",
    },
    session: {
        strategy: "jwt",
    },
});
