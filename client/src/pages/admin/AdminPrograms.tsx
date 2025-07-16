import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen } from "lucide-react";

export default function AdminPrograms() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Quản lý Chương trình</h1>
        <p className="text-gray-600 mt-2">
          Quản lý các chương trình học STEM
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <BookOpen className="h-5 w-5 mr-2" />
            Chương trình học
          </CardTitle>
          <CardDescription>
            Tính năng đang được phát triển
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-gray-500">
            Module quản lý chương trình sẽ sớm được hoàn thiện...
          </p>
        </CardContent>
      </Card>
    </div>
  );
}