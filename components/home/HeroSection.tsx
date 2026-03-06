"use client";

import { motion } from "framer-motion";
import { ArrowRight, Globe, Compass, Sparkles } from "lucide-react";
import Link from "next/link";

export function HeroSection() {
    return (
        <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden hero-gradient">
            {/* Animated background elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-20 left-10 w-72 h-72 bg-cyan/10 rounded-full blur-3xl animate-float" />
                <div className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-light/10 rounded-full blur-3xl animate-float delay-200" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan/5 rounded-full blur-3xl" />

                {/* Grid pattern */}
                <div
                    className="absolute inset-0 opacity-[0.03]"
                    style={{
                        backgroundImage:
                            "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
                        backgroundSize: "60px 60px",
                    }}
                />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="space-y-8"
                >
                    {/* Badge */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                        className="inline-flex items-center gap-2 px-5 py-2 rounded-full glass text-cyan-light text-sm font-medium"
                    >
                        <Sparkles size={16} />
                        Giá Trị Của Trải Nghiệm
                    </motion.div>

                    {/* Headline */}
                    <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight font-[family-name:var(--font-playfair)]">
                        Khám Phá Thế Giới
                        <br />
                        <span className="gradient-text">Cùng Dynamic Travel</span>
                    </h1>

                    {/* Subtitle */}
                    <p className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
                        Hành trình được thiết kế riêng cho bạn — từ những bãi biển hoang sơ
                        đến những đỉnh núi hùng vĩ, mỗi chuyến đi là một trải nghiệm đáng
                        nhớ.
                    </p>

                    {/* CTA Buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6, duration: 0.5 }}
                        className="flex flex-col sm:flex-row gap-4 justify-center items-center"
                    >
                        <Link
                            href="/destinations"
                            className="group px-8 py-4 bg-gradient-to-r from-cyan to-cyan-light text-white rounded-full font-semibold text-lg hover:shadow-xl hover:shadow-cyan/30 transition-all duration-300 hover:scale-105 flex items-center gap-2"
                        >
                            Khám Phá Điểm Đến
                            <ArrowRight
                                size={20}
                                className="group-hover:translate-x-1 transition-transform"
                            />
                        </Link>
                        <Link
                            href="/contact"
                            className="px-8 py-4 bg-white/10 text-white rounded-full font-semibold text-lg hover:bg-white/20 transition-all duration-300 border border-white/20"
                        >
                            Tư Vấn Miễn Phí
                        </Link>
                    </motion.div>

                    {/* Quick stats */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1, duration: 0.6 }}
                        className="flex justify-center gap-8 sm:gap-16 pt-12"
                    >
                        {[
                            { icon: Globe, value: "50+", label: "Quốc Gia" },
                            { icon: Compass, value: "200+", label: "Tour" },
                            { icon: Sparkles, value: "10K+", label: "Khách Hàng" },
                        ].map(({ icon: Icon, value, label }, i) => (
                            <div key={i} className="text-center">
                                <Icon size={24} className="text-cyan mx-auto mb-2" />
                                <div className="text-2xl sm:text-3xl font-bold text-white">
                                    {value}
                                </div>
                                <div className="text-sm text-gray-400">{label}</div>
                            </div>
                        ))}
                    </motion.div>
                </motion.div>
            </div>

            {/* Bottom gradient fade */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent" />
        </section>
    );
}
