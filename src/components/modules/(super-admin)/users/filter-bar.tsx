"use client"
import { useRouter, useSearchParams } from 'next/navigation';

export function FilterBar() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const filter = searchParams.get("filter") || "all";

    const handleFilter = (status: string) => {
        const currentParams = new URLSearchParams(searchParams);
        if(status === "all") {
            currentParams.delete("filter");
        } else {
            currentParams.set("filter", status);
            currentParams.delete("page");
            currentParams.set("page", "1");
        }
        router.push(`?${currentParams.toString()}`);
    };

  return (
    <div className="flex items-center justify-between mb-6 bg-zinc-900 px-6 py-4 rounded-xl border border-zinc-800">
      <div className="flex items-center gap-6">
        {/* Status Filter */}
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest">Status:</span>
          <div className="flex gap-2">
            <button 
              className={`px-3 py-1 text-[10px] font-bold uppercase rounded  transition-colors ${filter === "all" ? "bg-zinc-800 text-purple-400 hover:bg-zinc-700" : "text-zinc-500 hover:text-zinc-300"}`}
              onClick={() => handleFilter("all")}
            >
              All
            </button>
            <button 
              className={`px-3 py-1 text-[10px] font-bold uppercase rounded  transition-colors ${filter === "active" ? "bg-zinc-800 text-purple-400 hover:bg-zinc-700" : "text-zinc-500 hover:text-zinc-300"}`}
              onClick={() => handleFilter("active")}
                >
              Active
            </button>
            <button 
              className={`px-3 py-1 text-[10px] font-bold uppercase rounded  transition-colors ${filter === "banned" ? "bg-zinc-800 text-purple-400 hover:bg-zinc-700" : "text-zinc-500 hover:text-zinc-300"}`}
              onClick={() => handleFilter("banned")}
            >
              Banned
            </button>
            <button 
              className={`px-3 py-1 text-[10px] font-bold uppercase rounded  transition-colors ${filter === "inactive" ? "bg-zinc-800 text-purple-400 hover:bg-zinc-700" : "text-zinc-500 hover:text-zinc-300"}`}
              onClick={() => handleFilter("inactive")}
            >
              Inactive
            </button>
          </div>
        </div>

        {/* Divider */}
        <div className="h-6 w-px bg-zinc-800"></div>

      </div>

    </div>
  );
}
