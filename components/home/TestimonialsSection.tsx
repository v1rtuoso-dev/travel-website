"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

type Review = {
    id: number;
    rating: number;
    comment: string;
    user: { name: string; image: string | null };
    destination: { name: string };
};

export function TestimonialsSection({ reviews }: { reviews: Review[] }) {
    if (reviews.length === 0) return null;

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
                        Đánh giá khách hàng
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-3xl sm:text-4xl lg:text-5xl font-bold text-navy mt-3 font-[family-name:var(--font-playfair)]"
                    >
                        Khách Hàng Nói Gì Về Chúng Tôi
                    </motion.h2>
                    <motion.div
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                        className="w-20 h-1 bg-gradient-to-r from-cyan to-cyan-light mx-auto mt-6"
                    />
                </div>

                {/* Reviews Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {reviews.map((review, index) => (
                        <motion.div
                            key={review.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="p-8 rounded-2xl bg-gray-50 hover:bg-white hover:shadow-xl transition-all duration-500 relative card-hover"
                        >
                            {/* Quote Icon */}
                            <Quote
                                size={32}
                                className="text-cyan/20 absolute top-6 right-6"
                            />

                            {/* Stars */}
                            <div className="flex gap-1 mb-4">
                                {Array.from({ length: 5 }).map((_, i) => (
                                    <Star
                                        key={i}
                                        size={16}
                                        className={
                                            i < review.rating
                                                ? "text-gold fill-gold"
                                                : "text-gray-300"
                                        }
                                    />
                                ))}
                            </div>

                            {/* Comment */}
                            <p className="text-gray-700 leading-relaxed mb-6 text-sm">
                                &ldquo;{review.comment}&rdquo;
                            </p>

                            {/* User */}
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan to-cyan-light flex items-center justify-center text-white font-bold text-lg">
                                    {review.user.name.charAt(0)}
                                </div>
                                <div>
                                    <div className="font-semibold text-navy text-sm">
                                        {review.user.name}
                                    </div>
                                    <div className="text-gray-500 text-xs">
                                        Tour {review.destination.name}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
