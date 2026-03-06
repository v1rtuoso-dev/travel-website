"use client";

import { motion } from "framer-motion";
import { Globe, Map, Shield, Hotel, Plane, HeartHandshake } from "lucide-react";

const services = [
    {
        icon: Globe,
        title: "Tour Trong Nước",
        description:
            "Khám phá vẻ đẹp Việt Nam từ Bắc vào Nam với các tour được thiết kế chuyên nghiệp.",
        color: "from-cyan to-blue-600",
    },
    {
        icon: Plane,
        title: "Tour Quốc Tế",
        description:
            "Hành trình đến những điểm đến nổi tiếng thế giới với lịch trình tối ưu.",
        color: "from-orange-400 to-rose-500",
    },
    {
        icon: Map,
        title: "Tour Theo Yêu Cầu",
        description:
            "Thiết kế chuyến đi riêng theo sở thích và ngân sách của bạn.",
        color: "from-emerald-400 to-teal-600",
    },
    {
        icon: Shield,
        title: "Hỗ Trợ Visa",
        description:
            "Dịch vụ làm visa nhanh chóng, đảm bảo tỷ lệ đậu cao cho mọi quốc gia.",
        color: "from-violet-500 to-purple-700",
    },
    {
        icon: Hotel,
        title: "Đặt Phòng Khách Sạn",
        description:
            "Hệ thống khách sạn đối tác từ bình dân đến 5 sao với giá ưu đãi nhất.",
        color: "from-amber-400 to-orange-500",
    },
    {
        icon: HeartHandshake,
        title: "Bảo Hiểm Du Lịch",
        description:
            "An tâm trên mọi chuyến đi với gói bảo hiểm du lịch toàn diện.",
        color: "from-rose-400 to-pink-600",
    },
];

export function ServicesSection() {
    return (
        <section className="py-20 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <motion.span
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="text-cyan font-semibold text-sm uppercase tracking-widest"
                    >
                        Dịch vụ của chúng tôi
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-3xl sm:text-4xl lg:text-5xl font-bold text-navy mt-3 font-[family-name:var(--font-playfair)]"
                    >
                        Dịch Vụ Đẳng Cấp
                    </motion.h2>
                    <motion.div
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                        className="w-20 h-1 bg-gradient-to-r from-cyan to-cyan-light mx-auto mt-6"
                    />
                </div>

                {/* Services Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.map((service, index) => (
                        <motion.div
                            key={service.title}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="group p-8 rounded-2xl bg-white shadow-sm hover:shadow-xl transition-all duration-500 card-hover"
                        >
                            <div
                                className={`w-14 h-14 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                            >
                                <service.icon size={26} className="text-white" />
                            </div>
                            <h3 className="text-xl font-bold text-navy mb-3">
                                {service.title}
                            </h3>
                            <p className="text-gray-600 leading-relaxed text-sm">
                                {service.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
