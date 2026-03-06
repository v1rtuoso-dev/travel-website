"use client";

import { useTransition } from "react";
import { toggleReviewApproval, deleteReview } from "@/lib/actions";
import { useRouter } from "next/navigation";
import { Star, Trash2, CheckCircle, XCircle, User, MapPin } from "lucide-react";

type Review = {
    id: number;
    rating: number;
    comment: string;
    isApproved: boolean;
    createdAt: string;
    user: { name: string; email: string };
    destination: { name: string };
};

export function ReviewsManager({ reviews }: { reviews: Review[] }) {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();

    const handleToggle = (id: number) => {
        startTransition(async () => {
            await toggleReviewApproval(id);
            router.refresh();
        });
    };

    const handleDelete = (id: number) => {
        if (!confirm("Xóa đánh giá này?")) return;
        startTransition(async () => {
            await deleteReview(id);
            router.refresh();
        });
    };

    const approved = reviews.filter((r) => r.isApproved);
    const pending = reviews.filter((r) => !r.isApproved);

    return (
        <div className="space-y-6">
            {/* Stats */}
            <div className="flex gap-4">
                <div className="bg-white rounded-xl px-5 py-3 shadow-sm">
                    <span className="text-sm text-gray-500">Tổng: </span>
                    <span className="font-bold text-navy">{reviews.length}</span>
                </div>
                <div className="bg-white rounded-xl px-5 py-3 shadow-sm">
                    <span className="text-sm text-gray-500">Đã duyệt: </span>
                    <span className="font-bold text-green-600">{approved.length}</span>
                </div>
                <div className="bg-white rounded-xl px-5 py-3 shadow-sm">
                    <span className="text-sm text-gray-500">Chờ duyệt: </span>
                    <span className="font-bold text-yellow-600">{pending.length}</span>
                </div>
            </div>

            {/* Pending first */}
            {pending.length > 0 && (
                <div>
                    <h2 className="text-lg font-semibold text-navy mb-3">Chờ duyệt ({pending.length})</h2>
                    <div className="space-y-3">
                        {pending.map((review) => (
                            <ReviewCard key={review.id} review={review} isPending={isPending} onToggle={handleToggle} onDelete={handleDelete} />
                        ))}
                    </div>
                </div>
            )}

            {/* Approved */}
            <div>
                <h2 className="text-lg font-semibold text-navy mb-3">Đã duyệt ({approved.length})</h2>
                <div className="space-y-3">
                    {approved.length === 0 ? (
                        <div className="bg-white rounded-2xl p-8 text-center text-gray-400 shadow-sm">Chưa có đánh giá nào được duyệt</div>
                    ) : (
                        approved.map((review) => (
                            <ReviewCard key={review.id} review={review} isPending={isPending} onToggle={handleToggle} onDelete={handleDelete} />
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}

function ReviewCard({
    review, isPending, onToggle, onDelete,
}: {
    review: Review; isPending: boolean; onToggle: (id: number) => void; onDelete: (id: number) => void;
}) {
    return (
        <div className={`bg-white rounded-2xl p-5 shadow-sm border-l-4 ${review.isApproved ? "border-green-400" : "border-yellow-400"} hover:shadow-md transition-shadow`}>
            <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="flex gap-0.5">
                            {[...Array(5)].map((_, i) => (
                                <Star key={i} size={14} className={i < review.rating ? "text-amber-400 fill-amber-400" : "text-gray-200"} />
                            ))}
                        </div>
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${review.isApproved ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}>
                            {review.isApproved ? "Đã duyệt" : "Chờ duyệt"}
                        </span>
                    </div>
                    <p className="text-sm text-gray-700">{review.comment}</p>
                    <div className="flex items-center gap-4 mt-2 text-xs text-gray-400">
                        <span className="flex items-center gap-1"><User size={12} /> {review.user.name}</span>
                        <span className="flex items-center gap-1"><MapPin size={12} /> {review.destination.name}</span>
                        <span>{new Date(review.createdAt).toLocaleDateString("vi-VN")}</span>
                    </div>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                    <button onClick={() => onToggle(review.id)} disabled={isPending} className={`p-2 rounded-lg transition-colors ${review.isApproved ? "text-yellow-500 hover:bg-yellow-50" : "text-green-500 hover:bg-green-50"}`} title={review.isApproved ? "Bỏ duyệt" : "Duyệt"}>
                        {review.isApproved ? <XCircle size={18} /> : <CheckCircle size={18} />}
                    </button>
                    <button onClick={() => onDelete(review.id)} disabled={isPending} className="p-2 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors">
                        <Trash2 size={18} />
                    </button>
                </div>
            </div>
        </div>
    );
}
