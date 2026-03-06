"use client";

import { useState, useTransition } from "react";
import { createBlogPost, deleteBlogPost } from "@/lib/actions";
import { useRouter } from "next/navigation";
import { Plus, Trash2, FileText, X, ExternalLink } from "lucide-react";
import Link from "next/link";

type Post = {
    id: number;
    title: string;
    slug: string;
    excerpt: string;
    publishedAt: string;
    author: { name: string };
};

export function BlogManager({ posts }: { posts: Post[] }) {
    const router = useRouter();
    const [showForm, setShowForm] = useState(false);
    const [isPending, startTransition] = useTransition();

    const handleCreate = (formData: FormData) => {
        startTransition(async () => {
            await createBlogPost(formData);
            setShowForm(false);
            router.refresh();
        });
    };

    const handleDelete = (id: number) => {
        if (!confirm("Xóa bài viết này?")) return;
        startTransition(async () => {
            await deleteBlogPost(id);
            router.refresh();
        });
    };

    return (
        <div>
            <button onClick={() => setShowForm(!showForm)} className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan to-cyan-light text-white font-medium text-sm hover:shadow-lg transition-all mb-6">
                {showForm ? <X size={16} /> : <Plus size={16} />}
                {showForm ? "Đóng" : "Thêm bài viết"}
            </button>

            {showForm && (
                <form action={handleCreate} className="bg-white rounded-2xl p-6 shadow-sm mb-6">
                    <h3 className="font-semibold text-navy mb-4">Bài viết mới</h3>
                    <div className="space-y-4">
                        <input name="title" required placeholder="Tiêu đề bài viết" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-cyan text-sm" />
                        <input name="imageUrl" placeholder="URL hình ảnh (tùy chọn)" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-cyan text-sm" />
                        <textarea name="excerpt" required placeholder="Tóm tắt ngắn" rows={2} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-cyan text-sm" />
                        <textarea name="content" required placeholder="Nội dung bài viết" rows={6} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-cyan text-sm" />
                    </div>
                    <button type="submit" disabled={isPending} className="mt-4 px-6 py-2.5 rounded-xl bg-navy text-white text-sm font-medium hover:bg-navy/90 transition-colors disabled:opacity-50">
                        {isPending ? "Đang lưu..." : "Đăng bài"}
                    </button>
                </form>
            )}

            <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                {posts.length === 0 ? (
                    <div className="p-12 text-center text-gray-400">
                        <FileText size={40} className="mx-auto mb-3 opacity-50" />
                        <p>Chưa có bài viết nào</p>
                    </div>
                ) : (
                    <div className="divide-y divide-gray-100">
                        {posts.map((post) => (
                            <div key={post.id} className="p-6 flex items-start justify-between gap-4 hover:bg-gray-50/50 transition-colors">
                                <div className="flex-1 min-w-0">
                                    <h3 className="font-semibold text-navy truncate">{post.title}</h3>
                                    <p className="text-sm text-gray-500 mt-1 line-clamp-1">{post.excerpt}</p>
                                    <div className="flex items-center gap-3 mt-2 text-xs text-gray-400">
                                        <span>{post.author.name}</span>
                                        <span>·</span>
                                        <span>{new Date(post.publishedAt).toLocaleDateString("vi-VN")}</span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 flex-shrink-0">
                                    <Link href={`/blog/${post.slug}`} className="p-2 rounded-lg text-gray-400 hover:text-cyan hover:bg-cyan/5 transition-colors">
                                        <ExternalLink size={16} />
                                    </Link>
                                    <button onClick={() => handleDelete(post.id)} disabled={isPending} className="p-2 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors">
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
