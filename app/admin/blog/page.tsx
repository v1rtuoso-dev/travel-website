import { prisma } from "@/lib/prisma";
import { BlogManager } from "./BlogManager";

export default async function AdminBlog() {
    const posts = await prisma.blogPost.findMany({
        orderBy: { publishedAt: "desc" },
        include: { author: true },
    });

    return (
        <div>
            <h1 className="text-2xl font-bold text-navy mb-6">Quản lý Blog</h1>
            <BlogManager posts={JSON.parse(JSON.stringify(posts))} />
        </div>
    );
}
