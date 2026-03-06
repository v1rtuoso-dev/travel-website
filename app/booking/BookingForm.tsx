"use client";

import { useState, useTransition } from "react";
import { createBooking } from "@/lib/actions";
import { useRouter } from "next/navigation";
import { MapPin, Calendar, Users, MessageSquare, CheckCircle } from "lucide-react";

type Props = {
    destinations: { id: number; name: string; country: string }[];
    userName: string;
};

export function BookingForm({ destinations, userName }: Props) {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();
    const [success, setSuccess] = useState(false);

    const handleSubmit = (formData: FormData) => {
        startTransition(async () => {
            await createBooking(formData);
            setSuccess(true);
            setTimeout(() => router.push("/dashboard"), 2000);
        });
    };

    if (success) {
        return (
            <div className="text-center py-12 bg-green-50 rounded-2xl">
                <CheckCircle size={48} className="mx-auto mb-4 text-green-500" />
                <h2 className="text-xl font-bold text-green-800 mb-2">Đặt tour thành công!</h2>
                <p className="text-green-600">Chúng tôi sẽ liên hệ bạn sớm nhất. Đang chuyển đến dashboard...</p>
            </div>
        );
    }

    return (
        <div className="bg-gray-50 rounded-2xl p-8">
            <p className="text-sm text-gray-500 mb-6">
                Xin chào <strong className="text-navy">{userName}</strong>, hãy chọn chuyến đi của bạn!
            </p>

            <form action={handleSubmit} className="space-y-5">
                <div>
                    <label className="block text-sm font-medium text-navy mb-2">
                        <MapPin size={16} className="inline mr-1" /> Điểm đến
                    </label>
                    <select name="destinationId" required className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-cyan focus:ring-2 focus:ring-cyan/20 bg-white text-sm">
                        <option value="">Chọn điểm đến</option>
                        {destinations.map((d) => (
                            <option key={d.id} value={d.id}>{d.name} ({d.country})</option>
                        ))}
                    </select>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                        <label className="block text-sm font-medium text-navy mb-2">
                            <Calendar size={16} className="inline mr-1" /> Ngày đi
                        </label>
                        <input
                            type="date"
                            name="travelDate"
                            required
                            min={new Date().toISOString().split("T")[0]}
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-cyan focus:ring-2 focus:ring-cyan/20 text-sm"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-navy mb-2">
                            <Users size={16} className="inline mr-1" /> Số người
                        </label>
                        <input
                            type="number"
                            name="travelers"
                            required
                            min={1}
                            max={20}
                            defaultValue={2}
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-cyan focus:ring-2 focus:ring-cyan/20 text-sm"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-navy mb-2">
                        <MessageSquare size={16} className="inline mr-1" /> Ghi chú
                    </label>
                    <textarea
                        name="message"
                        rows={3}
                        placeholder="Yêu cầu đặc biệt, câu hỏi..."
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-cyan focus:ring-2 focus:ring-cyan/20 text-sm resize-none"
                    />
                </div>

                <button
                    type="submit"
                    disabled={isPending}
                    className="w-full py-3.5 rounded-full bg-gradient-to-r from-cyan to-cyan-light text-white font-semibold hover:shadow-lg hover:shadow-cyan/30 transition-all duration-300 hover:scale-[1.02] disabled:opacity-60"
                >
                    {isPending ? "Đang xử lý..." : "Đặt Tour Ngay"}
                </button>
            </form>
        </div>
    );
}
