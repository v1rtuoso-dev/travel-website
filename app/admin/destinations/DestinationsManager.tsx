"use client";

import { useState, useTransition } from "react";
import { createDestination, deleteDestination } from "@/lib/actions";
import { Plus, Trash2, MapPin, Star, Eye, X } from "lucide-react";
import { useRouter } from "next/navigation";

type Destination = {
    id: number;
    name: string;
    country: string;
    continent: string;
    description: string;
    imageUrl: string;
    price: number;
    rating: number;
    category: string;
    featured: boolean;
    _count: { bookings: number; reviews: number };
};

export function DestinationsManager({ destinations }: { destinations: Destination[] }) {
    const router = useRouter();
    const [showForm, setShowForm] = useState(false);
    const [isPending, startTransition] = useTransition();

    const handleCreate = async (formData: FormData) => {
        startTransition(async () => {
            await createDestination(formData);
            setShowForm(false);
            router.refresh();
        });
    };

    const handleDelete = async (id: number) => {
        if (!confirm("Bạn có chắc muốn xóa điểm đến này?")) return;
        startTransition(async () => {
            await deleteDestination(id);
            router.refresh();
        });
    };

    return (
        <div>
            <button
                onClick={() => setShowForm(!showForm)}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan to-cyan-light text-white font-medium text-sm hover:shadow-lg transition-all mb-6"
            >
                {showForm ? <X size={16} /> : <Plus size={16} />}
                {showForm ? "Đóng" : "Thêm điểm đến"}
            </button>

            {showForm && (
                <form action={handleCreate} className="bg-white rounded-2xl p-6 shadow-sm mb-6">
                    <h3 className="font-semibold text-navy mb-4">Thêm điểm đến mới</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input name="name" required placeholder="Tên điểm đến" className="px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-cyan text-sm" />
                        <input name="country" required placeholder="Quốc gia" className="px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-cyan text-sm" />
                        <select name="continent" required className="px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-cyan text-sm bg-white">
                            <option value="">Chọn châu lục</option>
                            <option value="Châu Á">Châu Á</option>
                            <option value="Châu Âu">Châu Âu</option>
                            <option value="Châu Mỹ">Châu Mỹ</option>
                            <option value="Châu Phi">Châu Phi</option>
                            <option value="Châu Đại Dương">Châu Đại Dương</option>
                        </select>
                        <select name="category" required className="px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-cyan text-sm bg-white">
                            <option value="">Chọn loại hình</option>
                            <option value="Biển đảo">Biển đảo</option>
                            <option value="Núi">Núi</option>
                            <option value="Thành phố">Thành phố</option>
                            <option value="Văn hóa">Văn hóa</option>
                            <option value="Thiên nhiên">Thiên nhiên</option>
                        </select>
                        <input name="price" type="number" required placeholder="Giá (VNĐ)" className="px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-cyan text-sm" />
                        <input name="rating" type="number" step="0.1" max="5" placeholder="Đánh giá (0-5)" className="px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-cyan text-sm" />
                        <input name="imageUrl" placeholder="URL hình ảnh" className="px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-cyan text-sm" />
                        <label className="flex items-center gap-2 px-4 py-3 cursor-pointer">
                            <input type="checkbox" name="featured" className="w-4 h-4 rounded text-cyan" />
                            <span className="text-sm text-gray-600">Nổi bật</span>
                        </label>
                    </div>
                    <textarea name="description" required placeholder="Mô tả" rows={3} className="w-full mt-4 px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-cyan text-sm" />
                    <button type="submit" disabled={isPending} className="mt-4 px-6 py-2.5 rounded-xl bg-navy text-white text-sm font-medium hover:bg-navy/90 transition-colors disabled:opacity-50">
                        {isPending ? "Đang lưu..." : "Lưu điểm đến"}
                    </button>
                </form>
            )}

            {/* Destinations table */}
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="text-left px-6 py-3 font-semibold text-gray-600">Điểm đến</th>
                                <th className="text-left px-4 py-3 font-semibold text-gray-600">Loại</th>
                                <th className="text-right px-4 py-3 font-semibold text-gray-600">Giá</th>
                                <th className="text-center px-4 py-3 font-semibold text-gray-600">Đánh giá</th>
                                <th className="text-center px-4 py-3 font-semibold text-gray-600">Bookings</th>
                                <th className="text-center px-4 py-3 font-semibold text-gray-600">Nổi bật</th>
                                <th className="px-4 py-3"></th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {destinations.map((dest) => (
                                <tr key={dest.id} className="hover:bg-gray-50/50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan/20 to-blue-200 flex items-center justify-center">
                                                <MapPin size={16} className="text-cyan" />
                                            </div>
                                            <div>
                                                <p className="font-medium text-navy">{dest.name}</p>
                                                <p className="text-xs text-gray-400">{dest.country} · {dest.continent}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-4 py-4"><span className="px-2 py-0.5 rounded-full bg-gray-100 text-gray-600 text-xs">{dest.category}</span></td>
                                    <td className="px-4 py-4 text-right font-medium text-navy">{dest.price.toLocaleString("vi-VN")}₫</td>
                                    <td className="px-4 py-4 text-center"><span className="flex items-center justify-center gap-1 text-amber-500"><Star size={12} className="fill-amber-400" />{dest.rating}</span></td>
                                    <td className="px-4 py-4 text-center text-gray-500">{dest._count.bookings}</td>
                                    <td className="px-4 py-4 text-center">
                                        {dest.featured ? (
                                            <span className="w-5 h-5 inline-flex items-center justify-center rounded-full bg-green-100 text-green-600"><Eye size={12} /></span>
                                        ) : (
                                            <span className="text-gray-300">—</span>
                                        )}
                                    </td>
                                    <td className="px-4 py-4">
                                        <button onClick={() => handleDelete(dest.id)} disabled={isPending} className="p-2 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors">
                                            <Trash2 size={16} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
