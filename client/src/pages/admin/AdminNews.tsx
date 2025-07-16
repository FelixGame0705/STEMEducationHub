import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Newspaper } from "lucide-react";

export default function AdminNews() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Quản lý Tin tức</h1>
        <p className="text-gray-600 mt-2">
          Quản lý các bài viết tin tức
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Newspaper className="h-5 w-5 mr-2" />
            Bài viết tin tức
          </CardTitle>
          <CardDescription>
            Tính năng đang được phát triển
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-gray-500">
            Module quản lý tin tức sẽ sớm được hoàn thiện...
          </p>
        </CardContent>
      </Card>
    </div>
  );
}