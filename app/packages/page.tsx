"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Check, X as XIcon, ArrowRight, Star, Clock, Users, MapPin } from "lucide-react";
import { packages, formatPrice } from "./data";

export default function PackagesPage() {
    return (
        <>
            <section className="hero-gradient py-20 pt-24">
                <div className="max-w-7xl mx-auto px-4 text-center">
                    <h1 className="text-4xl sm:text-5xl font-bold text-white font-[family-name:var(--font-playfair)]">
                        Tour Du Lịch
                    </h1>
                    <p className="text-gray-300 mt-4 max-w-2xl mx-auto">
                        Các gói tour được thiết kế tối ưu với giá cả hợp lý và dịch vụ đẳng cấp từ Dynamic Travel.
                    </p>
                </div>
            </section>

            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {packages.map((pkg, index) => (
                            <motion.div
                                key={pkg.name}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.15 }}
                                className={`relative rounded-2xl overflow-hidden bg-white shadow-lg hover:shadow-2xl transition-all duration-500 card-hover ${pkg.popular ? "ring-2 ring-cyan" : ""}`}
                            >
                                {pkg.popular && (
                                    <div className="absolute top-4 right-4 z-10 px-3 py-1 rounded-full bg-cyan text-white text-xs font-bold">Phổ biến nhất</div>
                                )}
                                <div className={`bg-gradient-to-br ${pkg.color} p-8 text-white`}>
                                    <h3 className="text-2xl font-bold mb-2">{pkg.name}</h3>
                                    <div className="flex items-center gap-2 text-white/80 text-sm mb-4">
                                        <MapPin size={14} />{pkg.destinations}
                                    </div>
                                    <div className="flex items-end gap-3">
                                        <span className="text-3xl font-bold">{formatPrice(pkg.price)}</span>
                                        <span className="text-white/60 line-through text-sm mb-1">{formatPrice(pkg.originalPrice)}</span>
                                    </div>
                                    <span className="text-white/80 text-xs">/người</span>
                                </div>
                                <div className="p-8 space-y-6">
                                    <div className="flex items-center justify-between text-sm text-gray-600">
                                        <span className="flex items-center gap-1.5"><Clock size={14} className="text-cyan" />{pkg.duration}</span>
                                        <span className="flex items-center gap-1.5"><Users size={14} className="text-cyan" />{pkg.groupSize}</span>
                                        <span className="flex items-center gap-1"><Star size={14} className="text-gold fill-gold" />{pkg.rating}</span>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-navy text-sm mb-3">Bao gồm</h4>
                                        <ul className="space-y-2">
                                            {pkg.includes.map((item) => (
                                                <li key={item} className="flex items-center gap-2 text-sm text-gray-600">
                                                    <Check size={14} className="text-green-500 shrink-0" />{item}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-navy text-sm mb-3">Không bao gồm</h4>
                                        <ul className="space-y-2">
                                            {pkg.excludes.map((item) => (
                                                <li key={item} className="flex items-center gap-2 text-sm text-gray-400">
                                                    <XIcon size={14} className="text-red-400 shrink-0" />{item}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    <Link href="/booking" className={`w-full flex items-center justify-center gap-2 py-3.5 rounded-full font-semibold text-sm transition-all duration-300 hover:scale-105 ${pkg.popular ? "bg-gradient-to-r from-cyan to-cyan-light text-white hover:shadow-lg hover:shadow-cyan/30" : "border-2 border-cyan text-cyan hover:bg-cyan hover:text-white"}`}>
                                        Đặt Tour Ngay <ArrowRight size={16} />
                                    </Link>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}
