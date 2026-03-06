"use client";

import { motion } from "framer-motion";
import { Users, Award, Heart, Target, Globe, Shield } from "lucide-react";
import Image from "next/image";

const values = [
    {
        icon: Heart,
        title: "Tận Tâm",
        description: "Chúng tôi đặt khách hàng làm trung tâm trong mọi hoạt động.",
    },
    {
        icon: Award,
        title: "Chất Lượng",
        description: "Cam kết chất lượng dịch vụ vượt trội trong từng chuyến đi.",
    },
    {
        icon: Shield,
        title: "An Toàn",
        description: "An toàn và bảo mật luôn là ưu tiên hàng đầu của chúng tôi.",
    },
    {
        icon: Target,
        title: "Chuyên Nghiệp",
        description: "Đội ngũ giàu kinh nghiệm, luôn sẵn sàng phục vụ bạn.",
    },
];

const team = [
    { name: "Nguyễn Minh Tuấn", role: "Giám đốc điều hành", color: "from-cyan to-blue-600" },
    { name: "Trần Thị Hương", role: "Trưởng phòng Tour", color: "from-orange-400 to-rose-500" },
    { name: "Lê Văn Đức", role: "Chuyên viên tư vấn", color: "from-emerald-400 to-teal-600" },
    { name: "Phạm Thu Hà", role: "Quản lý Marketing", color: "from-violet-500 to-purple-700" },
];

export default function AboutPage() {
    return (
        <>
            {/* Hero */}
            <section className="hero-gradient py-20 pt-24">
                <div className="max-w-7xl mx-auto px-4 text-center">
                    <h1 className="text-4xl sm:text-5xl font-bold text-white font-[family-name:var(--font-playfair)]">
                        Về Dynamic Travel
                    </h1>
                    <p className="text-gray-300 mt-4 max-w-2xl mx-auto">
                        Hơn 15 năm kinh nghiệm mang đến những chuyến đi đáng nhớ cho hàng
                        nghìn khách hàng.
                    </p>
                </div>
            </section>

            {/* Story */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="space-y-6"
                        >
                            <span className="text-cyan font-semibold text-sm uppercase tracking-widest">
                                Câu chuyện của chúng tôi
                            </span>
                            <h2 className="text-3xl sm:text-4xl font-bold text-navy font-[family-name:var(--font-playfair)]">
                                Giá Trị Của Trải Nghiệm
                            </h2>
                            <p className="text-gray-600 leading-relaxed">
                                Dynamic Travel được thành lập từ năm 2020 với sứ mệnh mang đến
                                những trải nghiệm du lịch đẳng cấp cho người Việt. Chúng tôi
                                tin rằng mỗi chuyến đi không chỉ là một hành trình mà còn là
                                một cuộc sống mới.
                            </p>
                            <p className="text-gray-600 leading-relaxed">
                                Với đội ngũ chuyên nghiệp và mạng lưới đối tác rộng khắp, chúng
                                tôi tự hào đã phục vụ hơn 10.000 khách hàng với tỷ lệ hài lòng
                                đến 98%.
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="relative"
                        >
                            <div className="rounded-2xl overflow-hidden bg-gradient-to-br from-cyan to-navy h-80 flex items-center justify-center">
                                <Image
                                    src="/logo.png"
                                    alt="Dynamic Travel"
                                    width={240}
                                    height={80}
                                    className="brightness-0 invert opacity-30"
                                />
                            </div>
                            {/* Stats overlay */}
                            <div className="absolute -bottom-6 -right-6 bg-white rounded-2xl shadow-xl p-6 space-y-1">
                                <div className="text-3xl font-bold text-cyan">98%</div>
                                <div className="text-sm text-gray-500">Khách hàng hài lòng</div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Values */}
            <section className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-16">
                        <span className="text-cyan font-semibold text-sm uppercase tracking-widest">
                            Giá trị cốt lõi
                        </span>
                        <h2 className="text-3xl sm:text-4xl font-bold text-navy mt-3 font-[family-name:var(--font-playfair)]">
                            Tại Sao Chọn Dynamic Travel
                        </h2>
                        <div className="w-20 h-1 bg-gradient-to-r from-cyan to-cyan-light mx-auto mt-6" />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {values.map((v, i) => (
                            <motion.div
                                key={v.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="text-center p-8 rounded-2xl bg-white shadow-sm hover:shadow-xl transition-all card-hover"
                            >
                                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan to-cyan-light flex items-center justify-center mx-auto mb-6">
                                    <v.icon size={28} className="text-white" />
                                </div>
                                <h3 className="text-lg font-bold text-navy mb-3">{v.title}</h3>
                                <p className="text-gray-600 text-sm">{v.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Team */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-16">
                        <span className="text-cyan font-semibold text-sm uppercase tracking-widest">
                            Đội ngũ
                        </span>
                        <h2 className="text-3xl sm:text-4xl font-bold text-navy mt-3 font-[family-name:var(--font-playfair)]">
                            Đội Ngũ Chuyên Gia
                        </h2>
                        <div className="w-20 h-1 bg-gradient-to-r from-cyan to-cyan-light mx-auto mt-6" />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {team.map((member, i) => (
                            <motion.div
                                key={member.name}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="text-center card-hover"
                            >
                                <div
                                    className={`w-32 h-32 rounded-full bg-gradient-to-br ${member.color} mx-auto mb-6 flex items-center justify-center text-white text-3xl font-bold`}
                                >
                                    {member.name.charAt(0)}
                                </div>
                                <h3 className="text-lg font-bold text-navy">{member.name}</h3>
                                <p className="text-gray-500 text-sm mt-1">{member.role}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}
