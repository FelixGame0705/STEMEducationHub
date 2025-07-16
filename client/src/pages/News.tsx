import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import NewsCard from "@/components/NewsCard";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import type { News } from "@shared/schema";

export default function News() {
  const [filterCategory, setFilterCategory] = useState<string>("");

  const { data: news = [], isLoading } = useQuery<News[]>({
    queryKey: ["/api/news", filterCategory],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (filterCategory) params.append("category", filterCategory);
      
      const res = await fetch(`/api/news?${params}`);
      return res.json();
    },
  });

  const categories = ["TIN TỨC", "SỰ KIỆN", "WORKSHOP"];

  return (
    <div className="min-h-screen py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Tin tức
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Cập nhật những thông tin mới nhất về giáo dục STEM
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <Select value={filterCategory} onValueChange={setFilterCategory}>
            <SelectTrigger className="w-full sm:w-48">
              <SelectValue placeholder="Chọn danh mục" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">Tất cả danh mục</SelectItem>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {filterCategory && (
            <Button
              variant="outline"
              onClick={() => setFilterCategory("")}
            >
              Xóa bộ lọc
            </Button>
          )}
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white rounded-xl overflow-hidden space-y-4">
                <Skeleton className="w-full h-48" />
                <div className="p-6 space-y-4">
                  <Skeleton className="h-6 w-20" />
                  <Skeleton className="h-6 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-20" />
                </div>
              </div>
            ))}
          </div>
        ) : news.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">Không có tin tức nào phù hợp với bộ lọc.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {news.map((newsItem) => (
              <NewsCard key={newsItem.id} news={newsItem} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
