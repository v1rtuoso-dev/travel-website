"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { MapPin, Star, ArrowRight } from "lucide-react";

type Destination = {
    id: number;
    name: string;
    country: string;
    description: string;
    imageUrl: string;
    price: number;
    rating: number;
    category: string;
};

const gradients = [
    "from-cyan to-blue-600",
    "from-orange-400 to-rose-500",
    "from-emerald-400 to-teal-600",
    "from-violet-500 to-purple-700",
    "from-cyan-400 to-sky-600",
    "from-amber-400 to-orange-600",
];

function formatPrice(price: number) {
    return new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
        maximumFractionDigits: 0,
    }).format(price);
}

export function FeaturedDestinations({
    destinations,
}: {
    destinations: Destination[];
}) {
    return (
        <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <motion.span
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="text-cyan font-semibold text-sm uppercase tracking-widest"
                    >
                        Điểm đến nổi bật
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-3xl sm:text-4xl lg:text-5xl font-bold text-navy mt-3 font-[family-name:var(--font-playfair)]"
                    >
                        Khám Phá Những Điểm Đến Tuyệt Vời
                    </motion.h2>
                    <motion.div
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                        className="w-20 h-1 bg-gradient-to-r from-cyan to-cyan-light mx-auto mt-6"
                    />
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {destinations.map((dest, index) => (
                        <motion.div
                            key={dest.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <Link
                                href={`/destinations`}
                                className="group block rounded-2xl overflow-hidden bg-white shadow-md hover:shadow-2xl transition-all duration-500 card-hover"
                            >
                                {/* Image placeholder / Original Image */}
                                <div
                                    className={`relative h-56 bg-gradient-to-br ${gradients[index % gradients.length]} flex items-end`}
                                >
                                    {dest.imageUrl && (
                                        <img src={dest.imageUrl} alt={dest.name} className="absolute inset-0 w-full h-full object-cover" />
                                    )}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                                    <div className="relative p-5 w-full">
                                        <span className="inline-block px-3 py-1 rounded-full bg-white/20 text-white text-xs font-medium backdrop-blur-sm">
                                            {dest.category}
                                        </span>
                                    </div>
                                    {/* Price badge */}
                                    <div className="absolute top-4 right-4 px-3 py-1.5 rounded-lg bg-white/90 text-navy font-bold text-sm shadow-lg">
                                        {formatPrice(dest.price)}
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-5 space-y-3">
                                    <h3 className="text-xl font-bold text-navy group-hover:text-cyan transition-colors">
                                        {dest.name}
                                    </h3>
                                    <div className="flex items-center gap-2 text-gray-500 text-sm">
                                        <MapPin size={14} className="text-cyan" />
                                        <span>{dest.country}</span>
                                    </div>
                                    <p className="text-gray-600 text-sm line-clamp-2 leading-relaxed">
                                        {dest.description}
                                    </p>
                                    <div className="flex items-center justify-between pt-2">
                                        <div className="flex items-center gap-1">
                                            <Star
                                                size={16}
                                                className="text-gold fill-gold"
                                            />
                                            <span className="text-sm font-semibold text-navy">
                                                {dest.rating}
                                            </span>
                                        </div>
                                        <span className="text-cyan font-medium text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                                            Xem chi tiết
                                            <ArrowRight size={14} />
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>

                {/* View all link */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="text-center mt-12"
                >
                    <Link
                        href="/destinations"
                        className="inline-flex items-center gap-2 px-8 py-3 rounded-full border-2 border-cyan text-cyan font-semibold hover:bg-cyan hover:text-white transition-all duration-300"
                    >
                        Xem Tất Cả Điểm Đến
                        <ArrowRight size={18} />
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}
