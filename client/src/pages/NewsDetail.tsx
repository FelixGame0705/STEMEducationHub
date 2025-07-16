import { useQuery } from "@tanstack/react-query";
import { useRoute } from "wouter";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft, Calendar } from "lucide-react";
import { Link } from "wouter";
import DOMPurify from "dompurify";
import type { News } from "@shared/schema";

export default function NewsDetail() {
  const [match, params] = useRoute("/tin-tuc/:slug");
  const slug = params?.slug;

  const {
    data: news,
    isLoading,
    error,
  } = useQuery<News>({
    queryKey: ["/api/news", slug],
    enabled: !!slug,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-8">
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-64 w-full rounded-xl" />
            <div className="space-y-4">
              <Skeleton className="h-6 w-32" />
              <Skeleton className="h-12 w-3/4" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-2/3" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !news) {
    return (
      <div className="min-h-screen py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              Không tìm thấy bài viết
            </h1>
            <Link href="/tin-tuc">
              <Button className="bg-ocean-blue text-white hover:bg-blue-700">
                Quay lại danh sách tin tức
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const categoryColors = {
    "TIN TỨC": "bg-ocean-blue text-white",
    "SỰ KIỆN": "bg-green-500 text-white",
    WORKSHOP: "bg-purple-500 text-white",
  };

  return (
    <div className="min-h-screen py-20 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link href="/tin-tuc">
          <Button variant="ghost" className="mb-8">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Quay lại
          </Button>
        </Link>

        <article className="bg-white rounded-xl shadow-lg overflow-hidden">
          <img
            src={news.image}
            alt={news.title}
            className="w-full h-full object-cover"
          />

          <div className="p-8">
            <div className="flex items-center mb-6">
              <Badge
                className={
                  categoryColors[
                    news.category as keyof typeof categoryColors
                  ] || "bg-gray-500 text-white"
                }
              >
                {news.category}
              </Badge>
              <div className="flex items-center text-gray-500 ml-4">
                <Calendar className="w-4 h-4 mr-2" />
                {new Date(news.publishedAt).toLocaleDateString("vi-VN", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </div>
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              {news.title}
            </h1>

            <div className="prose prose-lg max-w-none">
              <p className="text-lg text-gray-600 mb-6">{news.excerpt}</p>

              <div
                className="text-gray-700 prose max-w-none"
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(news.content),
                }}
              />
            </div>
          </div>
        </article>

        <div className="mt-8 text-center">
          <Button className="bg-accent-orange text-white hover:bg-orange-600">
            <Link href="/lien-he">Đăng ký học thử miễn phí</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
