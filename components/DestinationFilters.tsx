"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { Search, X } from "lucide-react";

export function DestinationFilters({
    continents,
    categories,
    currentContinent,
    currentCategory,
    currentSearch,
}: {
    continents: string[];
    categories: string[];
    currentContinent?: string;
    currentCategory?: string;
    currentSearch?: string;
}) {
    const router = useRouter();
    const [search, setSearch] = useState(currentSearch || "");

    const updateFilter = (key: string, value: string | undefined) => {
        const params = new URLSearchParams();
        if (key === "continent" && value) params.set("continent", value);
        else if (currentContinent) params.set("continent", currentContinent);

        if (key === "category" && value) params.set("category", value);
        else if (currentCategory) params.set("category", currentCategory);

        if (key === "search" && value) params.set("search", value);
        else if (key !== "search" && currentSearch) params.set("search", currentSearch);

        if (key === "clear") {
            router.push("/destinations");
            return;
        }

        router.push(`/destinations?${params.toString()}`);
    };

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        updateFilter("search", search || undefined);
    };

    const hasFilters = currentContinent || currentCategory || currentSearch;

    return (
        <div className="space-y-6 mb-10">
            {/* Search */}
            <form onSubmit={handleSearch} className="flex gap-3 max-w-lg">
                <div className="relative flex-1">
                    <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Tìm kiếm điểm đến..."
                        className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-cyan focus:ring-2 focus:ring-cyan/20 transition-all"
                    />
                </div>
                <button
                    type="submit"
                    className="px-6 py-3 rounded-xl bg-cyan text-white font-medium hover:bg-cyan-dark transition-colors"
                >
                    Tìm
                </button>
            </form>

            {/* Filter pills */}
            <div className="flex flex-wrap gap-6">
                <div className="space-y-2">
                    <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        Khu vực
                    </span>
                    <div className="flex flex-wrap gap-2">
                        {continents.map((c) => (
                            <button
                                key={c}
                                onClick={() =>
                                    updateFilter("continent", currentContinent === c ? undefined : c)
                                }
                                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${currentContinent === c
                                        ? "bg-cyan text-white"
                                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                                    }`}
                            >
                                {c}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="space-y-2">
                    <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        Loại hình
                    </span>
                    <div className="flex flex-wrap gap-2">
                        {categories.map((c) => (
                            <button
                                key={c}
                                onClick={() =>
                                    updateFilter("category", currentCategory === c ? undefined : c)
                                }
                                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${currentCategory === c
                                        ? "bg-cyan text-white"
                                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                                    }`}
                            >
                                {c}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Clear filters */}
            {hasFilters && (
                <button
                    onClick={() => {
                        setSearch("");
                        updateFilter("clear", undefined);
                    }}
                    className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-red-500 transition-colors"
                >
                    <X size={14} />
                    Xoá bộ lọc
                </button>
            )}
        </div>
    );
}
