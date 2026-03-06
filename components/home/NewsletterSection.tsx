"use client";

import { motion } from "framer-motion";
import { Send, Sparkles } from "lucide-react";
import { useState } from "react";

export function NewsletterSection() {
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) return;

        setStatus("loading");
        try {
            const res = await fetch("/api/newsletter", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
            });
            if (res.ok) {
                setStatus("success");
                setEmail("");
            } else {
                setStatus("error");
            }
        } catch {
            setStatus("error");
        }
    };

    return (
        <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="relative rounded-3xl overflow-hidden hero-gradient p-12 sm:p-16 text-center"
                >
                    {/* Decorative elements */}
                    <div className="absolute top-10 left-10 w-40 h-40 bg-cyan/10 rounded-full blur-3xl" />
                    <div className="absolute bottom-10 right-10 w-60 h-60 bg-cyan-light/10 rounded-full blur-3xl" />

                    <div className="relative z-10 max-w-2xl mx-auto">
                        <Sparkles size={32} className="text-cyan-light mx-auto mb-4" />

                        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 font-[family-name:var(--font-playfair)]">
                            Đừng Bỏ Lỡ Ưu Đãi
                        </h2>
                        <p className="text-gray-300 mb-8 leading-relaxed">
                            Đăng ký nhận bản tin để cập nhật những tour mới nhất, khuyến mãi
                            hấp dẫn và cẩm nang du lịch từ Dynamic Travel.
                        </p>

                        <form
                            onSubmit={handleSubmit}
                            className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto"
                        >
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Nhập email của bạn..."
                                required
                                className="flex-1 px-6 py-4 rounded-full bg-white/10 border border-white/20 text-white placeholder:text-gray-400 focus:outline-none focus:border-cyan focus:bg-white/15 transition-all"
                            />
                            <button
                                type="submit"
                                disabled={status === "loading"}
                                className="px-8 py-4 rounded-full bg-gradient-to-r from-cyan to-cyan-light text-white font-semibold hover:shadow-lg hover:shadow-cyan/30 transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2 disabled:opacity-60"
                            >
                                {status === "loading" ? (
                                    "Đang gửi..."
                                ) : (
                                    <>
                                        Đăng Ký
                                        <Send size={18} />
                                    </>
                                )}
                            </button>
                        </form>

                        {status === "success" && (
                            <motion.p
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="mt-4 text-cyan-light font-medium"
                            >
                                ✓ Đăng ký thành công! Cảm ơn bạn.
                            </motion.p>
                        )}
                        {status === "error" && (
                            <motion.p
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="mt-4 text-red-400 font-medium"
                            >
                                Có lỗi xảy ra. Vui lòng thử lại.
                            </motion.p>
                        )}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
