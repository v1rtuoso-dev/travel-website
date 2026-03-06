import { prisma } from "@/lib/prisma";
import { MapPin, CalendarCheck, FileText, Star, Users, TrendingUp } from "lucide-react";

export default async function AdminDashboard() {
    const [destinations, bookings, blogPosts, reviews, users, newsletters] = await Promise.all([
        prisma.destination.count(),
        prisma.booking.count(),
        prisma.blogPost.count(),
        prisma.review.count(),
        prisma.user.count(),
        prisma.newsletter.count(),
    ]);

    const pendingBookings = await prisma.booking.count({ where: { status: "PENDING" } });
    const pendingReviews = await prisma.review.count({ where: { isApproved: false } });

    const stats = [
        { label: "Điểm đến", value: destinations, icon: MapPin, color: "bg-cyan/10 text-cyan" },
        { label: "Đặt chỗ", value: bookings, icon: CalendarCheck, color: "bg-blue-100 text-blue-600" },
        { label: "Bài viết", value: blogPosts, icon: FileText, color: "bg-purple-100 text-purple-600" },
        { label: "Đánh giá", value: reviews, icon: Star, color: "bg-amber-100 text-amber-600" },
        { label: "Người dùng", value: users, icon: Users, color: "bg-green-100 text-green-600" },
        { label: "Newsletter", value: newsletters, icon: TrendingUp, color: "bg-pink-100 text-pink-600" },
    ];

    return (
        <div>
            <h1 className="text-2xl font-bold text-navy mb-6">Tổng quan</h1>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
                {stats.map((stat) => (
                    <div key={stat.label} className="bg-white rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex items-center gap-3">
                            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${stat.color}`}>
                                <stat.icon size={20} />
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-navy">{stat.value}</p>
                                <p className="text-xs text-gray-500">{stat.label}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Pending alerts */}
            {(pendingBookings > 0 || pendingReviews > 0) && (
                <div className="bg-white rounded-2xl p-6 shadow-sm">
                    <h2 className="text-lg font-bold text-navy mb-4">Cần xử lý</h2>
                    <div className="space-y-3">
                        {pendingBookings > 0 && (
                            <div className="flex items-center justify-between p-4 rounded-xl bg-yellow-50 border border-yellow-100">
                                <div className="flex items-center gap-3">
                                    <CalendarCheck size={20} className="text-yellow-600" />
                                    <span className="text-sm font-medium text-yellow-800">{pendingBookings} đặt chỗ đang chờ xác nhận</span>
                                </div>
                                <a href="/admin/bookings" className="text-sm text-yellow-700 font-medium hover:underline">Xem →</a>
                            </div>
                        )}
                        {pendingReviews > 0 && (
                            <div className="flex items-center justify-between p-4 rounded-xl bg-orange-50 border border-orange-100">
                                <div className="flex items-center gap-3">
                                    <Star size={20} className="text-orange-600" />
                                    <span className="text-sm font-medium text-orange-800">{pendingReviews} đánh giá chờ duyệt</span>
                                </div>
                                <a href="/admin/reviews" className="text-sm text-orange-700 font-medium hover:underline">Xem →</a>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
