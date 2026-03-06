"use client";

import { useTransition } from "react";
import { updateBookingStatus } from "@/lib/actions";
import { useRouter } from "next/navigation";
import { Calendar, Users, User, MapPin, MessageSquare } from "lucide-react";

type Booking = {
    id: number;
    travelDate: string;
    travelers: number;
    status: string;
    message: string | null;
    createdAt: string;
    user: { name: string; email: string };
    destination: { name: string; country: string };
};

const statusConfig: Record<string, { label: string; color: string; bg: string }> = {
    PENDING: { label: "Đang chờ", color: "text-yellow-700", bg: "bg-yellow-100" },
    CONFIRMED: { label: "Đã xác nhận", color: "text-green-700", bg: "bg-green-100" },
    CANCELLED: { label: "Đã hủy", color: "text-red-700", bg: "bg-red-100" },
};

export function BookingsManager({ bookings }: { bookings: Booking[] }) {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();

    const handleStatusChange = (bookingId: number, status: string) => {
        startTransition(async () => {
            await updateBookingStatus(bookingId, status);
            router.refresh();
        });
    };

    return (
        <div className="space-y-4">
            {bookings.length === 0 ? (
                <div className="bg-white rounded-2xl p-12 text-center text-gray-400 shadow-sm">
                    <Calendar size={40} className="mx-auto mb-3 opacity-50" />
                    <p>Chưa có đặt chỗ nào</p>
                </div>
            ) : (
                bookings.map((booking) => {
                    const config = statusConfig[booking.status];
                    return (
                        <div key={booking.id} className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
                            <div className="flex flex-col md:flex-row md:items-center gap-4">
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-2">
                                        <MapPin size={16} className="text-cyan" />
                                        <h3 className="font-semibold text-navy">{booking.destination.name}</h3>
                                        <span className="text-xs text-gray-400">({booking.destination.country})</span>
                                    </div>
                                    <div className="flex flex-wrap gap-x-5 gap-y-1 text-sm text-gray-500">
                                        <span className="flex items-center gap-1"><User size={14} /> {booking.user.name}</span>
                                        <span className="flex items-center gap-1"><Calendar size={14} /> {new Date(booking.travelDate).toLocaleDateString("vi-VN")}</span>
                                        <span className="flex items-center gap-1"><Users size={14} /> {booking.travelers} người</span>
                                    </div>
                                    {booking.message && (
                                        <p className="flex items-start gap-1 mt-2 text-xs text-gray-400">
                                            <MessageSquare size={12} className="mt-0.5 flex-shrink-0" /> {booking.message}
                                        </p>
                                    )}
                                    <p className="text-xs text-gray-300 mt-2">Đặt lúc: {new Date(booking.createdAt).toLocaleString("vi-VN")}</p>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${config.bg} ${config.color}`}>
                                        {config.label}
                                    </span>
                                    {booking.status === "PENDING" && (
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => handleStatusChange(booking.id, "CONFIRMED")}
                                                disabled={isPending}
                                                className="px-3 py-1.5 rounded-lg bg-green-500 text-white text-xs font-medium hover:bg-green-600 transition-colors disabled:opacity-50"
                                            >
                                                Xác nhận
                                            </button>
                                            <button
                                                onClick={() => handleStatusChange(booking.id, "CANCELLED")}
                                                disabled={isPending}
                                                className="px-3 py-1.5 rounded-lg bg-red-500 text-white text-xs font-medium hover:bg-red-600 transition-colors disabled:opacity-50"
                                            >
                                                Hủy
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    );
                })
            )}
        </div>
    );
}
