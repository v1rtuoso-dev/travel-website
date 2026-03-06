import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Calendar, User, ArrowLeft } from "lucide-react";

const gradients = [
    "from-cyan to-blue-600",
    "from-violet-500 to-purple-700",
    "from-orange-400 to-rose-500",
    "from-emerald-400 to-teal-600",
];

export default async function BlogPage() {
    const posts = await prisma.blogPost.findMany({
        orderBy: { publishedAt: "desc" },
        include: { author: true },
    });

    return (
        <>
            {/* Hero */}
            <section className="hero-gradient py-20 pt-24">
                <div className="max-w-7xl mx-auto px-4 text-center">
                    <h1 className="text-4xl sm:text-5xl font-bold text-white font-[family-name:var(--font-playfair)]">
                        Blog Du Lịch
                    </h1>
                    <p className="text-gray-300 mt-4 max-w-2xl mx-auto">
                        Cẩm nang du lịch, chia sẻ kinh nghiệm và những câu chuyện thú vị
                        từ Dynamic Travel.
                    </p>
                </div>
            </section>

            <section className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {posts.map((post, index) => (
                            <Link
                                key={post.id}
                                href={`/blog/${post.slug}`}
                                className="group block rounded-2xl overflow-hidden bg-white shadow-md hover:shadow-xl transition-all duration-500 card-hover"
                            >
                                <div
                                    className={`relative h-52 bg-gradient-to-br ${gradients[index % gradients.length]}`}
                                >
                                    {post.imageUrl && (
                                        <img src={post.imageUrl} alt={post.title} className="absolute inset-0 w-full h-full object-cover" />
                                    )}
                                </div>
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
                                    <h2 className="text-xl font-bold text-navy group-hover:text-cyan transition-colors line-clamp-2">
                                        {post.title}
                                    </h2>
                                    <p className="text-gray-600 text-sm line-clamp-3 leading-relaxed">
                                        {post.excerpt}
                                    </p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}
