"use client";

import { useState, useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, Phone, Mail, User, LogOut, LayoutDashboard, Shield } from "lucide-react";

const navLinks = [
    { href: "/", label: "Trang Chủ" },
    { href: "/destinations", label: "Điểm Đến" },
    { href: "/packages", label: "Tour" },
    { href: "/blog", label: "Blog" },
    { href: "/about", label: "Về Chúng Tôi" },
    { href: "/contact", label: "Liên Hệ" },
];

export function Header() {
    const { data: session } = useSession();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <>
            {/* Top bar */}
            <div className="bg-navy text-white text-sm py-2 hidden md:block">
                <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
                    <div className="flex items-center gap-6">
                        <a href="tel:+84123456789" className="flex items-center gap-2 hover:text-cyan transition-colors">
                            <Phone size={14} /><span>+84 123 456 789</span>
                        </a>
                        <a href="mailto:info@dynamictravel.vn" className="flex items-center gap-2 hover:text-cyan transition-colors">
                            <Mail size={14} /><span>info@dynamictravel.vn</span>
                        </a>
                    </div>
                    <span className="text-gray-300">Giá Trị Của Trải Nghiệm</span>
                </div>
            </div>

            {/* Main header */}
            <header className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled ? "bg-white/95 backdrop-blur-md shadow-lg" : "bg-white shadow-sm"}`}>
                <div className="max-w-7xl mx-auto px-4">
                    <div className="flex items-center justify-between h-20">
                        <Link href="/" className="flex items-center gap-3 group">
                            <Image src="/logo.png" alt="Dynamic Travel" width={180} height={50} className="h-12 w-auto transition-transform group-hover:scale-105" priority />
                        </Link>

                        <nav className="hidden lg:flex items-center gap-1">
                            {navLinks.map((link) => (
                                <Link key={link.href} href={link.href} className="px-4 py-2 rounded-lg text-navy font-medium hover:text-cyan hover:bg-cyan/5 transition-all duration-200 text-[15px]">
                                    {link.label}
                                </Link>
                            ))}
                        </nav>

                        <div className="flex items-center gap-3">
                            {session ? (
                                <div className="relative">
                                    <button
                                        onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                                        className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                                    >
                                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan to-cyan-light flex items-center justify-center text-white text-sm font-bold">
                                            {session.user.name?.charAt(0) || "U"}
                                        </div>
                                        <span className="hidden sm:inline text-sm font-medium text-navy">{session.user.name}</span>
                                    </button>
                                    {isUserMenuOpen && (
                                        <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-100 py-2 animate-fade-in z-50">
                                            <div className="px-4 py-2 border-b border-gray-100">
                                                <p className="text-sm font-medium text-navy">{session.user.name}</p>
                                                <p className="text-xs text-gray-500">{session.user.email}</p>
                                                <span className="inline-block mt-1 px-2 py-0.5 rounded-full bg-cyan/10 text-cyan text-xs font-medium">
                                                    {session.user.role === "ADMIN" ? "Quản trị viên" : "Khách hàng"}
                                                </span>
                                            </div>
                                            <Link href="/dashboard" onClick={() => setIsUserMenuOpen(false)} className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                                                <LayoutDashboard size={16} /> Dashboard
                                            </Link>
                                            {session.user.role === "ADMIN" && (
                                                <Link href="/admin" onClick={() => setIsUserMenuOpen(false)} className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                                                    <Shield size={16} /> Admin Panel
                                                </Link>
                                            )}
                                            <button
                                                onClick={() => { signOut(); setIsUserMenuOpen(false); }}
                                                className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors"
                                            >
                                                <LogOut size={16} /> Đăng xuất
                                            </button>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <>
                                    <Link href="/login" className="hidden sm:inline-flex px-4 py-2 text-navy font-medium text-sm hover:text-cyan transition-colors">
                                        Đăng Nhập
                                    </Link>
                                    <Link href="/booking" className="hidden sm:inline-flex px-6 py-2.5 bg-gradient-to-r from-cyan to-cyan-light text-white rounded-full font-semibold text-sm hover:shadow-lg hover:shadow-cyan/30 transition-all duration-300 hover:scale-105">
                                        Đặt Tour Ngay
                                    </Link>
                                </>
                            )}

                            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="lg:hidden p-2 rounded-lg text-navy hover:bg-gray-100 transition-colors" aria-label="Toggle menu">
                                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                            </button>
                        </div>
                    </div>
                </div>

                {isMobileMenuOpen && (
                    <div className="lg:hidden border-t border-gray-100 bg-white animate-fade-in">
                        <nav className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-1">
                            {navLinks.map((link) => (
                                <Link key={link.href} href={link.href} onClick={() => setIsMobileMenuOpen(false)} className="px-4 py-3 rounded-lg text-navy font-medium hover:text-cyan hover:bg-cyan/5 transition-all">
                                    {link.label}
                                </Link>
                            ))}
                            {!session && (
                                <>
                                    <Link href="/login" onClick={() => setIsMobileMenuOpen(false)} className="px-4 py-3 rounded-lg text-navy font-medium hover:text-cyan hover:bg-cyan/5 transition-all">
                                        Đăng Nhập
                                    </Link>
                                    <Link href="/booking" onClick={() => setIsMobileMenuOpen(false)} className="mt-2 px-6 py-3 bg-gradient-to-r from-cyan to-cyan-light text-white rounded-full font-semibold text-center">
                                        Đặt Tour Ngay
                                    </Link>
                                </>
                            )}
                        </nav>
                    </div>
                )}
            </header>
        </>
    );
}
