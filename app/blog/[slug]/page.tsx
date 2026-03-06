import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Calendar, User } from "lucide-react";

export default async function BlogPostPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;

    const post = await prisma.blogPost.findUnique({
        where: { slug },
        include: { author: true },
    });

    if (!post) notFound();

    return (
        <>
            {/* Hero */}
            <section className="hero-gradient py-20 pt-24">
                <div className="max-w-4xl mx-auto px-4">
                    <Link
                        href="/blog"
                        className="inline-flex items-center gap-2 text-cyan-light hover:text-white transition-colors mb-6 text-sm"
                    >
                        <ArrowLeft size={16} />
                        Quay lại Blog
                    </Link>
                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white font-[family-name:var(--font-playfair)] leading-tight">
                        {post.title}
                    </h1>
                    <div className="flex items-center gap-4 mt-6 text-sm text-gray-300">
                        <span className="flex items-center gap-1.5">
                            <Calendar size={14} />
                            {new Date(post.publishedAt).toLocaleDateString("vi-VN", {
                                day: "numeric",
                                month: "long",
                                year: "numeric",
                            })}
                        </span>
                        <span className="flex items-center gap-1.5">
                            <User size={14} />
                            {post.author.name}
                        </span>
                    </div>
                </div>
            </section>

            <article className="py-16 bg-white">
                <div className="max-w-4xl mx-auto px-4">
                    <div className="prose prose-lg max-w-none">
                        <p className="text-lg text-gray-700 leading-relaxed font-medium mb-8">
                            {post.excerpt}
                        </p>
                        <div className="text-gray-700 leading-relaxed whitespace-pre-line">
                            {post.content}
                        </div>
                    </div>
                </div>
            </article>
        </>
    );
}
