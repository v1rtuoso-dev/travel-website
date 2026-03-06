import { prisma } from "@/lib/prisma";
import { MapPin, Star, Search, SlidersHorizontal } from "lucide-react";
import Link from "next/link";
import { DestinationFilters } from "@/components/DestinationFilters";

const gradients = [
    "from-cyan to-blue-600",
    "from-orange-400 to-rose-500",
    "from-emerald-400 to-teal-600",
    "from-violet-500 to-purple-700",
    "from-cyan-400 to-sky-600",
    "from-amber-400 to-orange-600",
    "from-rose-400 to-pink-600",
    "from-indigo-400 to-blue-700",
];

function formatPrice(price: number) {
    return new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
        maximumFractionDigits: 0,
    }).format(price);
}

export default async function DestinationsPage({
    searchParams,
}: {
    searchParams: Promise<{ continent?: string; category?: string; search?: string }>;
}) {
    const params = await searchParams;

    const where: Record<string, unknown> = {};
    if (params.continent) where.continent = params.continent;
    if (params.category) where.category = params.category;
    if (params.search) {
        where.OR = [
            { name: { contains: params.search } },
            { country: { contains: params.search } },
            { description: { contains: params.search } },
        ];
    }

    const destinations = await prisma.destination.findMany({
        where,
        orderBy: { rating: "desc" },
    });

    const allDestinations = await prisma.destination.findMany({
        select: { continent: true, category: true },
    });

    const continents = [...new Set(allDestinations.map((d) => d.continent))];
    const categories = [...new Set(allDestinations.map((d) => d.category))];

    return (
        <>
            {/* Page Hero */}
            <section className="hero-gradient py-20 pt-24">
                <div className="max-w-7xl mx-auto px-4 text-center">
                    <h1 className="text-4xl sm:text-5xl font-bold text-white font-[family-name:var(--font-playfair)]">
                        Điểm Đến Du Lịch
                    </h1>
                    <p className="text-gray-300 mt-4 max-w-2xl mx-auto">
                        Khám phá những điểm đến tuyệt vời nhất được chọn lọc bởi Dynamic
                        Travel. Từ biển đảo đến núi rừng, từ trong nước đến quốc tế.
                    </p>
                </div>
            </section>

            <section className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4">
                    {/* Filters */}
                    <DestinationFilters
                        continents={continents}
                        categories={categories}
                        currentContinent={params.continent}
                        currentCategory={params.category}
                        currentSearch={params.search}
                    />

                    {/* Results count */}
                    <p className="text-gray-500 text-sm mb-8">
                        Tìm thấy <span className="font-semibold text-navy">{destinations.length}</span> điểm đến
                    </p>

                    {/* Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {destinations.map((dest, index) => (
                            <Link
                                key={dest.id}
                                href={`/destinations`}
                                className="group block rounded-2xl overflow-hidden bg-white shadow-md hover:shadow-2xl transition-all duration-500 card-hover"
                            >
                                <div
                                    className={`relative h-48 bg-gradient-to-br ${gradients[index % gradients.length]}`}
                                >
                                    {dest.imageUrl && (
                                        <img src={dest.imageUrl} alt={dest.name} className="absolute inset-0 w-full h-full object-cover" />
                                    )}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                                    <div className="absolute bottom-3 left-3">
                                        <span className="px-3 py-1 rounded-full bg-white/20 text-white text-xs font-medium backdrop-blur-sm">
                                            {dest.category}
                                        </span>
                                    </div>
                                    <div className="absolute top-3 right-3 px-2.5 py-1 rounded-lg bg-white/90 text-navy font-bold text-xs shadow">
                                        {formatPrice(dest.price)}
                                    </div>
                                </div>
                                <div className="p-4 space-y-2">
                                    <h3 className="font-bold text-navy group-hover:text-cyan transition-colors">
                                        {dest.name}
                                    </h3>
                                    <div className="flex items-center gap-1.5 text-gray-500 text-xs">
                                        <MapPin size={12} className="text-cyan" />
                                        {dest.country}
                                    </div>
                                    <p className="text-gray-600 text-xs line-clamp-2">
                                        {dest.description}
                                    </p>
                                    <div className="flex items-center gap-1 pt-1">
                                        <Star size={14} className="text-gold fill-gold" />
                                        <span className="text-xs font-semibold">{dest.rating}</span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>

                    {destinations.length === 0 && (
                        <div className="text-center py-20">
                            <Search size={48} className="text-gray-300 mx-auto mb-4" />
                            <p className="text-gray-500 text-lg">
                                Không tìm thấy điểm đến nào phù hợp.
                            </p>
                        </div>
                    )}
                </div>
            </section>
        </>
    );
}
