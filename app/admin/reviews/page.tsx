import { prisma } from "@/lib/prisma";
import { ReviewsManager } from "./ReviewsManager";

export default async function AdminReviews() {
    const reviews = await prisma.review.findMany({
        orderBy: { createdAt: "desc" },
        include: {
            user: true,
            destination: true,
        },
    });

    return (
        <div>
            <h1 className="text-2xl font-bold text-navy mb-6">Quản lý đánh giá</h1>
            <ReviewsManager reviews={JSON.parse(JSON.stringify(reviews))} />
        </div>
    );
}
