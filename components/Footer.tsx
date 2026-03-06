import Link from "next/link";
import Image from "next/image";
import {
    Phone,
    Mail,
    MapPin,
    Facebook,
    Instagram,
    Youtube,
    Send,
} from "lucide-react";

const quickLinks = [
    { href: "/destinations", label: "Điểm Đến" },
    { href: "/packages", label: "Tour Du Lịch" },
    { href: "/blog", label: "Blog" },
    { href: "/about", label: "Về Chúng Tôi" },
    { href: "/contact", label: "Liên Hệ" },
    { href: "/booking", label: "Đặt Tour" },
];

const destinations = [
    { href: "/destinations?continent=Châu+Á", label: "Châu Á" },
    { href: "/destinations?continent=Châu+Âu", label: "Châu Âu" },
    { href: "/destinations?category=Biển+đảo", label: "Biển Đảo" },
    { href: "/destinations?category=Núi", label: "Núi" },
    { href: "/destinations?category=Thành+phố", label: "Thành Phố" },
    { href: "/destinations?category=Văn+hóa", label: "Văn Hóa" },
];

export function Footer() {
    return (
        <footer className="bg-navy text-white">
            {/* Main Footer */}
            <div className="max-w-7xl mx-auto px-4 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                    {/* Company Info */}
                    <div className="space-y-6">
                        <Image
                            src="/logo.png"
                            alt="Dynamic Travel"
                            width={160}
                            height={44}
                            className="h-11 w-auto brightness-0 invert"
                        />
                        <p className="text-gray-300 text-sm leading-relaxed">
                            Dynamic Travel mang đến cho bạn những chuyến đi đáng nhớ với dịch
                            vụ chuyên nghiệp và trải nghiệm du lịch đẳng cấp.
                        </p>
                        <div className="flex gap-3">
                            {[
                                { icon: Facebook, href: "#" },
                                { icon: Instagram, href: "#" },
                                { icon: Youtube, href: "#" },
                            ].map(({ icon: Icon, href }, i) => (
                                <a
                                    key={i}
                                    href={href}
                                    className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-cyan transition-colors duration-300"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <Icon size={18} />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-lg font-semibold mb-6 relative">
                            Liên Kết Nhanh
                            <span className="absolute bottom-[-8px] left-0 w-10 h-0.5 bg-cyan" />
                        </h3>
                        <ul className="space-y-3">
                            {quickLinks.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-gray-300 hover:text-cyan transition-colors text-sm"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Destinations */}
                    <div>
                        <h3 className="text-lg font-semibold mb-6 relative">
                            Điểm Đến
                            <span className="absolute bottom-[-8px] left-0 w-10 h-0.5 bg-cyan" />
                        </h3>
                        <ul className="space-y-3">
                            {destinations.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-gray-300 hover:text-cyan transition-colors text-sm"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact & Newsletter */}
                    <div>
                        <h3 className="text-lg font-semibold mb-6 relative">
                            Liên Hệ
                            <span className="absolute bottom-[-8px] left-0 w-10 h-0.5 bg-cyan" />
                        </h3>
                        <div className="space-y-4 text-sm text-gray-300">
                            <div className="flex items-start gap-3">
                                <MapPin size={18} className="text-cyan mt-0.5 shrink-0" />
                                <span>R6 Royal City, 72A Nguyễn Trãi, TP. Hà Nội</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <Phone size={18} className="text-cyan shrink-0" />
                                <a href="tel:+84123456789" className="hover:text-cyan transition-colors">
                                    +84 123 456 789
                                </a>
                            </div>
                            <div className="flex items-center gap-3">
                                <Mail size={18} className="text-cyan shrink-0" />
                                <a href="mailto:info@dynamictravel.vn" className="hover:text-cyan transition-colors">
                                    info@dynamictravel.vn
                                </a>
                            </div>
                        </div>

                        {/* Newsletter mini form */}
                        <div className="mt-6">
                            <p className="text-sm text-gray-300 mb-3">Đăng ký nhận tin</p>
                            <form className="flex gap-2">
                                <input
                                    type="email"
                                    placeholder="Email của bạn"
                                    className="flex-1 px-4 py-2.5 rounded-lg bg-white/10 border border-white/10 text-white placeholder:text-gray-400 text-sm focus:outline-none focus:border-cyan transition-colors"
                                />
                                <button
                                    type="submit"
                                    className="p-2.5 rounded-lg bg-cyan hover:bg-cyan-light transition-colors"
                                >
                                    <Send size={18} />
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-white/10">
                <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-gray-400">
                    <p>© 2026 Dynamic Travel. Tất cả quyền được bảo lưu.</p>
                    <div className="flex gap-6">
                        <Link href="/privacy" className="hover:text-cyan transition-colors">
                            Chính sách bảo mật
                        </Link>
                        <Link href="/terms" className="hover:text-cyan transition-colors">
                            Điều khoản sử dụng
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
