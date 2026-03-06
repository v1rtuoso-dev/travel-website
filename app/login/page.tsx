"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Mail, Lock, LogIn, AlertCircle } from "lucide-react";
import Link from "next/link";

export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        const result = await signIn("credentials", {
            email,
            password,
            redirect: false,
        });

        setLoading(false);

        if (result?.error) {
            setError("Email hoặc mật khẩu không đúng");
        } else {
            router.push("/dashboard");
            router.refresh();
        }
    };

    return (
        <>
            <section className="hero-gradient py-16 pt-20">
                <div className="max-w-7xl mx-auto px-4 text-center">
                    <h1 className="text-3xl sm:text-4xl font-bold text-white font-[family-name:var(--font-playfair)]">
                        Đăng Nhập
                    </h1>
                </div>
            </section>

            <section className="py-16 bg-white">
                <div className="max-w-md mx-auto px-4">
                    <div className="bg-gray-50 rounded-2xl p-8">
                        <div className="text-center mb-8">
                            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan to-cyan-light flex items-center justify-center mx-auto mb-4">
                                <LogIn size={28} className="text-white" />
                            </div>
                            <h2 className="text-xl font-bold text-navy">Chào mừng trở lại</h2>
                            <p className="text-gray-500 text-sm mt-1">Đăng nhập để quản lý chuyến đi của bạn</p>
                        </div>

                        {error && (
                            <div className="flex items-center gap-2 p-3 mb-6 rounded-lg bg-red-50 text-red-600 text-sm">
                                <AlertCircle size={16} />
                                {error}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div>
                                <label className="block text-sm font-medium text-navy mb-2">Email</label>
                                <div className="relative">
                                    <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                                    <input
                                        type="email"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-cyan focus:ring-2 focus:ring-cyan/20 transition-all"
                                        placeholder="Nhập email"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-navy mb-2">Mật khẩu</label>
                                <div className="relative">
                                    <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                                    <input
                                        type="password"
                                        required
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-cyan focus:ring-2 focus:ring-cyan/20 transition-all"
                                        placeholder="Nhập mật khẩu"
                                    />
                                </div>
                            </div>
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full py-3.5 rounded-full bg-gradient-to-r from-cyan to-cyan-light text-white font-semibold hover:shadow-lg hover:shadow-cyan/30 transition-all duration-300 hover:scale-[1.02] disabled:opacity-60"
                            >
                                {loading ? "Đang đăng nhập..." : "Đăng Nhập"}
                            </button>
                        </form>

                        <div className="mt-6 p-4 rounded-lg bg-cyan/5 border border-cyan/10">
                            <p className="text-xs text-gray-500 font-medium mb-2">Tài khoản demo:</p>
                            <p className="text-xs text-gray-600">Admin: <code className="bg-gray-200 px-1 rounded">admin@dynamictravel.vn</code></p>
                            <p className="text-xs text-gray-600">Customer: <code className="bg-gray-200 px-1 rounded">an.nguyen@email.com</code></p>
                            <p className="text-xs text-gray-600">Mật khẩu: <code className="bg-gray-200 px-1 rounded">password</code></p>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
