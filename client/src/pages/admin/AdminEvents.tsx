import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "lucide-react";

export default function AdminEvents() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Quản lý Sự kiện</h1>
        <p className="text-gray-600 mt-2">
          Quản lý các sự kiện và hoạt động
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Calendar className="h-5 w-5 mr-2" />
            Sự kiện
          </CardTitle>
          <CardDescription>
            Tính năng đang được phát triển
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-gray-500">
            Module quản lý sự kiện sẽ sớm được hoàn thiện...
          </p>
        </CardContent>
      </Card>
    </div>
  );
}