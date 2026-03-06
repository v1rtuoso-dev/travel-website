import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import {
    LayoutDashboard, MapPin, CalendarCheck, FileText, Star, ChevronRight,
} from "lucide-react";

const sidebarLinks = [
    { href: "/admin", label: "Tổng quan", icon: LayoutDashboard },
    { href: "/admin/destinations", label: "Điểm đến", icon: MapPin },
    { href: "/admin/bookings", label: "Đặt chỗ", icon: CalendarCheck },
    { href: "/admin/blog", label: "Blog", icon: FileText },
    { href: "/admin/reviews", label: "Đánh giá", icon: Star },
];

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = await auth();
    if (!session?.user || session.user.role !== "ADMIN") redirect("/");

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Admin header */}
            <div className="bg-navy text-white py-3">
                <div className="max-w-[1400px] mx-auto px-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan to-cyan-light flex items-center justify-center text-white text-xs font-bold">DT</div>
                        <span className="font-semibold text-sm">Admin Panel</span>
                    </div>
                    <div className="flex items-center gap-4 text-sm">
                        <span className="text-gray-300">{session.user.name}</span>
                        <Link href="/" className="text-cyan hover:text-white transition-colors flex items-center gap-1">
                            Về trang chủ <ChevronRight size={14} />
                        </Link>
                    </div>
                </div>
            </div>

            <div className="max-w-[1400px] mx-auto px-4 py-6 flex gap-6">
                {/* Sidebar */}
                <aside className="w-60 flex-shrink-0 hidden lg:block">
                    <nav className="bg-white rounded-2xl shadow-sm p-3 sticky top-24">
                        {sidebarLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-gray-600 hover:bg-cyan/5 hover:text-cyan transition-all"
                            >
                                <link.icon size={18} />
                                {link.label}
                            </Link>
                        ))}
                    </nav>
                </aside>

                {/* Mobile nav */}
                <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t z-40 px-2 py-1">
                    <div className="flex justify-around">
                        {sidebarLinks.map((link) => (
                            <Link key={link.href} href={link.href} className="flex flex-col items-center gap-0.5 py-2 px-3 text-gray-500 hover:text-cyan transition-colors">
                                <link.icon size={18} />
                                <span className="text-[10px]">{link.label}</span>
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Content */}
                <main className="flex-1 min-w-0 pb-20 lg:pb-0">{children}</main>
            </div>
        </div>
    );
}
