import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users } from "lucide-react";

export default function AdminStudents() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Quản lý Học viên</h1>
        <p className="text-gray-600 mt-2">
          Quản lý thông tin học viên tiêu biểu
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Users className="h-5 w-5 mr-2" />
            Học viên tiêu biểu
          </CardTitle>
          <CardDescription>
            Tính năng đang được phát triển
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-gray-500">
            Module quản lý học viên sẽ sớm được hoàn thiện...
          </p>
        </CardContent>
      </Card>
    </div>
  );
}