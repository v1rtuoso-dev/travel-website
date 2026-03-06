"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Globe, Users, MapPin, Award } from "lucide-react";

const stats = [
    { icon: Globe, value: 50, suffix: "+", label: "Quốc Gia Đã Đến" },
    { icon: Users, value: 10000, suffix: "+", label: "Khách Hàng Hài Lòng" },
    { icon: MapPin, value: 200, suffix: "+", label: "Tour Du Lịch" },
    { icon: Award, value: 15, suffix: "", label: "Năm Kinh Nghiệm" },
];

function AnimatedCounter({
    value,
    suffix,
    inView,
}: {
    value: number;
    suffix: string;
    inView: boolean;
}) {
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (!inView) return;
        const duration = 2000;
        const steps = 60;
        const stepValue = value / steps;
        let current = 0;
        const interval = setInterval(() => {
            current += stepValue;
            if (current >= value) {
                setCount(value);
                clearInterval(interval);
            } else {
                setCount(Math.floor(current));
            }
        }, duration / steps);
        return () => clearInterval(interval);
    }, [value, inView]);

    return (
        <span>
            {count.toLocaleString("vi-VN")}
            {suffix}
        </span>
    );
}

export function StatsSection() {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true });

    return (
        <section ref={ref} className="py-20 hero-gradient relative overflow-hidden">
            {/* Background effects */}
            <div className="absolute inset-0">
                <div className="absolute top-10 right-20 w-60 h-60 bg-cyan/10 rounded-full blur-3xl" />
                <div className="absolute bottom-10 left-20 w-80 h-80 bg-cyan-light/10 rounded-full blur-3xl" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                    {stats.map((stat, index) => (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.15 }}
                            className="text-center"
                        >
                            <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center mx-auto mb-4">
                                <stat.icon size={30} className="text-cyan-light" />
                            </div>
                            <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-2">
                                <AnimatedCounter
                                    value={stat.value}
                                    suffix={stat.suffix}
                                    inView={inView}
                                />
                            </div>
                            <div className="text-gray-300 text-sm">{stat.label}</div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
