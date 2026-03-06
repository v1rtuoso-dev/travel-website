import { authMiddleware } from "@/lib/auth.config";
import { NextResponse } from "next/server";

export default authMiddleware((req) => {
    const { pathname } = req.nextUrl;
    const isLoggedIn = !!req.auth;
    const role = req.auth?.user?.role;

    // Protect admin routes
    if (pathname.startsWith("/admin")) {
        if (!isLoggedIn) {
            return NextResponse.redirect(new URL("/login", req.url));
        }
        if (role !== "ADMIN") {
            return NextResponse.redirect(new URL("/", req.url));
        }
    }

    // Protect customer dashboard
    if (pathname.startsWith("/dashboard")) {
        if (!isLoggedIn) {
            return NextResponse.redirect(new URL("/login", req.url));
        }
    }

    return NextResponse.next();
});

export const config = {
    matcher: ["/admin/:path*", "/dashboard/:path*"],
};
