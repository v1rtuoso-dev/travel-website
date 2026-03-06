"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Calendar, ArrowRight, User } from "lucide-react";

const gradients = [
    "from-cyan to-blue-600",
    "from-violet-500 to-purple-700",
    "from-orange-400 to-rose-500",
];

type BlogPost = {
    id: number;
    title: string;
    slug: string;
    excerpt: string;
    imageUrl: string;
    publishedAt: Date;
    author: { name: string };
};

export function BlogPreview({ posts }: { posts: BlogPost[] }) {
    if (posts.length === 0) return null;

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
                        Blog du lịch
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-3xl sm:text-4xl lg:text-5xl font-bold text-navy mt-3 font-[family-name:var(--font-playfair)]"
                    >
                        Cẩm Nang Du Lịch
                    </motion.h2>
                    <motion.div
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                        className="w-20 h-1 bg-gradient-to-r from-cyan to-cyan-light mx-auto mt-6"
                    />
                </div>

                {/* Blog Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {posts.map((post, index) => (
                        <motion.div
                            key={post.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <Link
                                href={`/blog/${post.slug}`}
                                className="group block rounded-2xl overflow-hidden bg-white shadow-md hover:shadow-xl transition-all duration-500 card-hover"
                            >
                                {/* Image placeholder / Original Image */}
                                <div
                                    className={`h-48 bg-gradient-to-br ${gradients[index % gradients.length]} relative overflow-hidden`}
                                >
                                    {post.imageUrl && (
                                        <img src={post.imageUrl} alt={post.title} className="absolute inset-0 w-full h-full object-cover" />
                                    )}
                                    <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-all duration-300" />
                                </div>

                                {/* Content */}
                                <div className="p-6 space-y-4">
                                    <div className="flex items-center gap-4 text-xs text-gray-500">
                                        <span className="flex items-center gap-1">
                                            <Calendar size={12} />
                                            {new Date(post.publishedAt).toLocaleDateString("vi-VN", {
                                                day: "numeric",
                                                month: "long",
                                                year: "numeric",
                                            })}
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <User size={12} />
                                            {post.author.name}
                                        </span>
                                    </div>

                                    <h3 className="text-lg font-bold text-navy group-hover:text-cyan transition-colors line-clamp-2">
                                        {post.title}
                                    </h3>

                                    <p className="text-gray-600 text-sm line-clamp-2 leading-relaxed">
                                        {post.excerpt}
                                    </p>

                                    <span className="text-cyan font-medium text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                                        Đọc thêm
                                        <ArrowRight size={14} />
                                    </span>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>

                {/* View all */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="text-center mt-12"
                >
                    <Link
                        href="/blog"
                        className="inline-flex items-center gap-2 px-8 py-3 rounded-full border-2 border-cyan text-cyan font-semibold hover:bg-cyan hover:text-white transition-all duration-300"
                    >
                        Xem Tất Cả Bài Viết
                        <ArrowRight size={18} />
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}
