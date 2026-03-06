import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { BookingForm } from "./BookingForm";
import Link from "next/link";
import { LogIn } from "lucide-react";

export default async function BookingPage() {
    const session = await auth();
    const destinations = await prisma.destination.findMany({ orderBy: { name: "asc" } });

    return (
        <>
            <section className="hero-gradient py-16 pt-20">
                <div className="max-w-7xl mx-auto px-4 text-center">
                    <h1 className="text-3xl sm:text-4xl font-bold text-white font-[family-name:var(--font-playfair)]">
                        Đặt Tour Du Lịch
                    </h1>
                    <p className="text-white/70 mt-2 max-w-xl mx-auto">
                        Điền thông tin bên dưới để đặt chuyến đi mơ ước của bạn
                    </p>
                </div>
            </section>

            <section className="py-16 bg-white">
                <div className="max-w-2xl mx-auto px-4">
                    {session ? (
                        <BookingForm
                            destinations={destinations.map((d) => ({ id: d.id, name: d.name, country: d.country }))}
                            userName={session.user.name}
                        />
                    ) : (
                        <div className="text-center py-12 bg-gray-50 rounded-2xl">
                            <LogIn size={40} className="mx-auto mb-4 text-cyan" />
                            <h2 className="text-xl font-bold text-navy mb-2">Vui lòng đăng nhập</h2>
                            <p className="text-gray-500 mb-6">Bạn cần đăng nhập để đặt tour du lịch</p>
                            <Link
                                href="/login"
                                className="inline-flex px-6 py-3 bg-gradient-to-r from-cyan to-cyan-light text-white rounded-full font-semibold hover:shadow-lg transition-all"
                            >
                                Đăng Nhập
                            </Link>
                        </div>
                    )}
                </div>
            </section>
        </>
    );
}
