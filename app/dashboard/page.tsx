import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Calendar, MapPin, Users, Star, Clock, CheckCircle, XCircle, Plus } from "lucide-react";

export default async function DashboardPage() {
    const session = await auth();
    if (!session?.user) redirect("/login");

    const bookings = await prisma.booking.findMany({
        where: { userId: session.user.id },
        include: { destination: true },
        orderBy: { createdAt: "desc" },
    });

    const reviews = await prisma.review.findMany({
        where: { userId: session.user.id },
        include: { destination: true },
        orderBy: { createdAt: "desc" },
    });

    const statusColors: Record<string, string> = {
        PENDING: "bg-yellow-100 text-yellow-700",
        CONFIRMED: "bg-green-100 text-green-700",
        CANCELLED: "bg-red-100 text-red-700",
    };
    const statusLabels: Record<string, string> = {
        PENDING: "Đang chờ",
        CONFIRMED: "Đã xác nhận",
        CANCELLED: "Đã hủy",
    };

    return (
        <>
            <section className="hero-gradient py-16 pt-20">
                <div className="max-w-7xl mx-auto px-4">
                    <h1 className="text-3xl sm:text-4xl font-bold text-white font-[family-name:var(--font-playfair)]">
                        Xin chào, {session.user.name}!
                    </h1>
                    <p className="text-white/70 mt-2">Quản lý chuyến đi và đánh giá của bạn</p>
                </div>
            </section>

            <section className="py-12 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4">
                    {/* Stats */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
                        <div className="bg-white rounded-2xl p-6 shadow-sm">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-xl bg-cyan/10 flex items-center justify-center"><MapPin className="text-cyan" size={24} /></div>
                                <div>
                                    <p className="text-2xl font-bold text-navy">{bookings.length}</p>
                                    <p className="text-sm text-gray-500">Đặt chỗ</p>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white rounded-2xl p-6 shadow-sm">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center"><CheckCircle className="text-green-600" size={24} /></div>
                                <div>
                                    <p className="text-2xl font-bold text-navy">{bookings.filter(b => b.status === "CONFIRMED").length}</p>
                                    <p className="text-sm text-gray-500">Đã xác nhận</p>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white rounded-2xl p-6 shadow-sm">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center"><Star className="text-amber-500" size={24} /></div>
                                <div>
                                    <p className="text-2xl font-bold text-navy">{reviews.length}</p>
                                    <p className="text-sm text-gray-500">Đánh giá</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Bookings */}
                    <div className="bg-white rounded-2xl shadow-sm mb-8">
                        <div className="flex items-center justify-between p-6 border-b border-gray-100">
                            <h2 className="text-xl font-bold text-navy">Các chuyến đi của bạn</h2>
                            <Link href="/booking" className="flex items-center gap-1 text-sm text-cyan font-medium hover:underline">
                                <Plus size={16} /> Đặt tour mới
                            </Link>
                        </div>
                        {bookings.length === 0 ? (
                            <div className="p-12 text-center text-gray-400">
                                <MapPin size={40} className="mx-auto mb-3 opacity-50" />
                                <p>Bạn chưa có chuyến đi nào</p>
                                <Link href="/destinations" className="inline-block mt-3 text-cyan font-medium hover:underline">Khám phá điểm đến →</Link>
                            </div>
                        ) : (
                            <div className="divide-y divide-gray-100">
                                {bookings.map((booking) => (
                                    <div key={booking.id} className="p-6 flex flex-col sm:flex-row sm:items-center gap-4 hover:bg-gray-50/50 transition-colors">
                                        <div className="flex-1">
                                            <h3 className="font-semibold text-navy">{booking.destination.name}</h3>
                                            <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1 text-sm text-gray-500">
                                                <span className="flex items-center gap-1"><Calendar size={14} /> {new Date(booking.travelDate).toLocaleDateString("vi-VN")}</span>
                                                <span className="flex items-center gap-1"><Users size={14} /> {booking.travelers} người</span>
                                                <span className="flex items-center gap-1"><Clock size={14} /> {new Date(booking.createdAt).toLocaleDateString("vi-VN")}</span>
                                            </div>
                                            {booking.message && <p className="text-xs text-gray-400 mt-1">{booking.message}</p>}
                                        </div>
                                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColors[booking.status]}`}>
                                            {statusLabels[booking.status]}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Reviews */}
                    <div className="bg-white rounded-2xl shadow-sm">
                        <div className="p-6 border-b border-gray-100">
                            <h2 className="text-xl font-bold text-navy">Đánh giá của bạn</h2>
                        </div>
                        {reviews.length === 0 ? (
                            <div className="p-12 text-center text-gray-400">
                                <Star size={40} className="mx-auto mb-3 opacity-50" />
                                <p>Bạn chưa viết đánh giá nào</p>
                            </div>
                        ) : (
                            <div className="divide-y divide-gray-100">
                                {reviews.map((review) => (
                                    <div key={review.id} className="p-6 hover:bg-gray-50/50 transition-colors">
                                        <div className="flex items-start justify-between">
                                            <div>
                                                <h3 className="font-semibold text-navy">{review.destination.name}</h3>
                                                <div className="flex gap-0.5 mt-1">
                                                    {[...Array(5)].map((_, i) => (
                                                        <Star key={i} size={14} className={i < review.rating ? "text-amber-400 fill-amber-400" : "text-gray-200"} />
                                                    ))}
                                                </div>
                                                <p className="text-sm text-gray-600 mt-2">{review.comment}</p>
                                            </div>
                                            <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${review.isApproved ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}>
                                                {review.isApproved ? "Đã duyệt" : "Chờ duyệt"}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </>
    );
}
