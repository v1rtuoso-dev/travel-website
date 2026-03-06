import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const { email } = await request.json();

        if (!email || !email.includes("@")) {
            return NextResponse.json(
                { error: "Email không hợp lệ" },
                { status: 400 }
            );
        }

        const existing = await prisma.newsletter.findUnique({ where: { email } });
        if (existing) {
            return NextResponse.json(
                { message: "Email đã được đăng ký" },
                { status: 200 }
            );
        }

        await prisma.newsletter.create({ data: { email } });
        return NextResponse.json({ message: "Đăng ký thành công" }, { status: 201 });
    } catch {
        return NextResponse.json({ error: "Có lỗi xảy ra" }, { status: 500 });
    }
}
