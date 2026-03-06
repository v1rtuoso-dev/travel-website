"use client";

import { motion } from "framer-motion";
import {
    Phone,
    Mail,
    MapPin,
    Clock,
    Send,
    MessageSquare,
} from "lucide-react";
import { useState } from "react";

const contactInfo = [
    {
        icon: MapPin,
        title: "Địa Chỉ",
        details: ["R6 Royal City, 72A Nguyễn Trãi", "TP. Hà Nội, Việt Nam"],
    },
    {
        icon: Phone,
        title: "Điện Thoại",
        details: ["+84 123 456 789", "+84 987 654 321"],
    },
    {
        icon: Mail,
        title: "Email",
        details: ["info@dynamictravel.net", "booking@dynamictravel.net"],
    },
    {
        icon: Clock,
        title: "Giờ Làm Việc",
        details: ["Thứ 2 - Thứ 6: 8:00 - 18:00", "Thứ 7: 8:00 - 12:00"],
    },
];

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
    });
    const [status, setStatus] = useState<"idle" | "success">("idle");

    const handleSubmit = (e: React.SubmitEvent) => {
        e.preventDefault();
        // Simulate form submission
        setStatus("success");
        setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
    };

    return (
        <>
            {/* Hero */}
            <section className="hero-gradient py-20 pt-24">
                <div className="max-w-7xl mx-auto px-4 text-center">
                    <h1 className="text-4xl sm:text-5xl font-bold text-white font-[family-name:var(--font-playfair)]">
                        Liên Hệ Với Chúng Tôi
                    </h1>
                    <p className="text-gray-300 mt-4 max-w-2xl mx-auto">
                        Hãy liên hệ với Dynamic Travel để được tư vấn miễn phí về chuyến đi
                        của bạn.
                    </p>
                </div>
            </section>

            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                        {/* Contact Info */}
                        <div className="space-y-8">
                            <div>
                                <h2 className="text-2xl font-bold text-navy mb-2 font-[family-name:var(--font-playfair)]">
                                    Thông Tin Liên Hệ
                                </h2>
                                <p className="text-gray-600 text-sm">
                                    Chúng tôi luôn sẵn sàng hỗ trợ bạn.
                                </p>
                            </div>

                            {contactInfo.map((info) => (
                                <motion.div
                                    key={info.title}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    className="flex gap-4"
                                >
                                    <div className="w-12 h-12 rounded-xl bg-cyan/10 flex items-center justify-center shrink-0">
                                        <info.icon size={22} className="text-cyan" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-navy text-sm">
                                            {info.title}
                                        </h3>
                                        {info.details.map((d) => (
                                            <p key={d} className="text-gray-600 text-sm">
                                                {d}
                                            </p>
                                        ))}
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {/* Form */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="lg:col-span-2"
                        >
                            <div className="bg-gray-50 rounded-2xl p-8 sm:p-10">
                                <div className="flex items-center gap-3 mb-8">
                                    <MessageSquare size={24} className="text-cyan" />
                                    <h2 className="text-2xl font-bold text-navy font-[family-name:var(--font-playfair)]">
                                        Gửi Tin Nhắn
                                    </h2>
                                </div>

                                {status === "success" ? (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="text-center py-12"
                                    >
                                        <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                                            <Send size={28} className="text-green-600" />
                                        </div>
                                        <h3 className="text-xl font-bold text-navy mb-2">
                                            Gửi thành công!
                                        </h3>
                                        <p className="text-gray-600">
                                            Chúng tôi sẽ liên hệ lại bạn trong thời gian sớm nhất.
                                        </p>
                                        <button
                                            onClick={() => setStatus("idle")}
                                            className="mt-6 px-6 py-2 rounded-full bg-cyan text-white text-sm font-medium hover:bg-cyan-dark transition-colors"
                                        >
                                            Gửi tin nhắn khác
                                        </button>
                                    </motion.div>
                                ) : (
                                    <form onSubmit={handleSubmit} className="space-y-6">
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                            <div>
                                                <label className="block text-sm font-medium text-navy mb-2">
                                                    Họ và tên *
                                                </label>
                                                <input
                                                    type="text"
                                                    required
                                                    value={formData.name}
                                                    onChange={(e) =>
                                                        setFormData({ ...formData, name: e.target.value })
                                                    }
                                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-cyan focus:ring-2 focus:ring-cyan/20 transition-all"
                                                    placeholder="Nhập họ và tên"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-navy mb-2">
                                                    Email *
                                                </label>
                                                <input
                                                    type="email"
                                                    required
                                                    value={formData.email}
                                                    onChange={(e) =>
                                                        setFormData({ ...formData, email: e.target.value })
                                                    }
                                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-cyan focus:ring-2 focus:ring-cyan/20 transition-all"
                                                    placeholder="Nhập email"
                                                />
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                            <div>
                                                <label className="block text-sm font-medium text-navy mb-2">
                                                    Số điện thoại
                                                </label>
                                                <input
                                                    type="tel"
                                                    value={formData.phone}
                                                    onChange={(e) =>
                                                        setFormData({ ...formData, phone: e.target.value })
                                                    }
                                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-cyan focus:ring-2 focus:ring-cyan/20 transition-all"
                                                    placeholder="Nhập số điện thoại"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-navy mb-2">
                                                    Chủ đề
                                                </label>
                                                <select
                                                    value={formData.subject}
                                                    onChange={(e) =>
                                                        setFormData({ ...formData, subject: e.target.value })
                                                    }
                                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-cyan focus:ring-2 focus:ring-cyan/20 transition-all"
                                                >
                                                    <option value="">Chọn chủ đề</option>
                                                    <option value="tour">Tư vấn tour</option>
                                                    <option value="booking">Đặt tour</option>
                                                    <option value="visa">Hỗ trợ visa</option>
                                                    <option value="other">Khác</option>
                                                </select>
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-navy mb-2">
                                                Nội dung tin nhắn *
                                            </label>
                                            <textarea
                                                required
                                                rows={5}
                                                value={formData.message}
                                                onChange={(e) =>
                                                    setFormData({ ...formData, message: e.target.value })
                                                }
                                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-cyan focus:ring-2 focus:ring-cyan/20 transition-all resize-none"
                                                placeholder="Nhập nội dung tin nhắn..."
                                            />
                                        </div>

                                        <button
                                            type="submit"
                                            className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-gradient-to-r from-cyan to-cyan-light text-white font-semibold hover:shadow-lg hover:shadow-cyan/30 transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2"
                                        >
                                            Gửi Tin Nhắn
                                            <Send size={18} />
                                        </button>
                                    </form>
                                )}
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>
        </>
    );
}
