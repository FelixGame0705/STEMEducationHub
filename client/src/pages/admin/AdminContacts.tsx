import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail } from "lucide-react";

export default function AdminContacts() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Quản lý Liên hệ</h1>
        <p className="text-gray-600 mt-2">
          Quản lý các tin nhắn liên hệ từ người dùng
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Mail className="h-5 w-5 mr-2" />
            Tin nhắn liên hệ
          </CardTitle>
          <CardDescription>
            Tính năng đang được phát triển
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-gray-500">
            Module quản lý liên hệ sẽ sớm được hoàn thiện...
          </p>
        </CardContent>
      </Card>
    </div>
  );
}