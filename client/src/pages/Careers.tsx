import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Clock, DollarSign, Mail } from "lucide-react";

export default function Careers() {
  const jobs = [
    {
      title: "Giáo viên Robotics",
      type: "Toàn thời gian",
      location: "TP. Hồ Chí Minh",
      salary: "15-25 triệu",
      description: "Giảng dạy các khóa học Robotics cho học sinh tiểu học và THCS. Có kinh nghiệm với Otto Robot và Microbit.",
      requirements: [
        "Tốt nghiệp đại học chuyên ngành Kỹ thuật/Công nghệ thông tin",
        "Có kinh nghiệm với robotics giáo dục",
        "Kỹ năng giao tiếp tốt với trẻ em",
        "Đam mê giáo dục STEM"
      ],
      benefits: [
        "Mức lương cạnh tranh",
        "Bảo hiểm y tế",
        "Được đào tạo chuyên sâu",
        "Môi trường làm việc năng động"
      ]
    },
    {
      title: "Giáo viên Lập trình Python",
      type: "Toàn thời gian",
      location: "TP. Hồ Chí Minh",
      salary: "18-30 triệu",
      description: "Giảng dạy Python cho học sinh THCS. Thiết kế curriculum và phát triển tài liệu học tập.",
      requirements: [
        "Tốt nghiệp đại học chuyên ngành Công nghệ thông tin",
        "Thành thạo Python và các framework",
        "Kinh nghiệm giảng dạy ưu tiên",
        "Kỹ năng thiết kế curriculum"
      ],
      benefits: [
        "Mức lương hấp dẫn",
        "Thưởng theo hiệu quả",
        "Hỗ trợ tham gia khóa học nâng cao",
        "Cơ hội thăng tiến"
      ]
    },
    {
      title: "Trợ giảng STEM",
      type: "Bán thời gian",
      location: "TP. Hồ Chí Minh",
      salary: "8-12 triệu",
      description: "Hỗ trợ giáo viên trong các lớp học STEM. Phù hợp với sinh viên năm cuối hoặc mới tốt nghiệp.",
      requirements: [
        "Sinh viên năm cuối hoặc mới tốt nghiệp",
        "Có kiến thức cơ bản về STEM",
        "Yêu thích làm việc với trẻ em",
        "Thời gian linh hoạt"
      ],
      benefits: [
        "Thời gian làm việc linh hoạt",
        "Kinh nghiệm giảng dạy",
        "Môi trường thân thiện",
        "Cơ hội học hỏi"
      ]
    },
    {
      title: "Chuyên viên Phát triển Chương trình",
      type: "Toàn thời gian",
      location: "TP. Hồ Chí Minh",
      salary: "20-35 triệu",
      description: "Nghiên cứu và phát triển các chương trình giáo dục STEM mới. Thiết kế curriculum và đánh giá hiệu quả.",
      requirements: [
        "Thạc sĩ Giáo dục hoặc chuyên ngành liên quan",
        "Kinh nghiệm phát triển chương trình giáo dục",
        "Hiểu biết về STEM education",
        "Kỹ năng nghiên cứu và phân tích"
      ],
      benefits: [
        "Mức lương cao",
        "Hỗ trợ nghiên cứu",
        "Cơ hội sáng tạo",
        "Phát triển nghề nghiệp"
      ]
    }
  ];

  return (
    <div className="min-h-screen py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Tuyển dụng
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Tham gia đội ngũ STEM Center để cùng xây dựng tương lai giáo dục
          </p>
        </div>

        {/* Why Join Us */}
        <div className="bg-white rounded-xl p-8 mb-16">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">
            Tại sao chọn STEM Center?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-ocean-blue rounded-full flex items-center justify-center mx-auto mb-4">
                <Badge className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Môi trường sáng tạo
              </h3>
              <p className="text-gray-600">
                Làm việc trong môi trường năng động, được khuyến khích sáng tạo và phát triển ý tưởng mới
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <DollarSign className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Đãi ngộ hấp dẫn
              </h3>
              <p className="text-gray-600">
                Mức lương cạnh tranh, thưởng theo hiệu quả và các chế độ phúc lợi tốt
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Phát triển nghề nghiệp
              </h3>
              <p className="text-gray-600">
                Cơ hội học hỏi, đào tạo chuyên sâu và thăng tiến trong sự nghiệp
              </p>
            </div>
          </div>
        </div>

        {/* Job Listings */}
        <div className="space-y-6">
          {jobs.map((job, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-2">
                    <div className="flex flex-wrap items-center gap-2 mb-4">
                      <Badge 
                        className={
                          job.type === "Toàn thời gian" 
                            ? "bg-green-100 text-green-800" 
                            : "bg-blue-100 text-blue-800"
                        }
                      >
                        {job.type}
                      </Badge>
                      <div className="flex items-center text-gray-500 text-sm">
                        <MapPin className="w-4 h-4 mr-1" />
                        {job.location}
                      </div>
                      <div className="flex items-center text-gray-500 text-sm">
                        <DollarSign className="w-4 h-4 mr-1" />
                        {job.salary}
                      </div>
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {job.title}
                    </h3>
                    
                    <p className="text-gray-600 mb-4">
                      {job.description}
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Yêu cầu:</h4>
                        <ul className="text-sm text-gray-600 space-y-1">
                          {job.requirements.map((req, i) => (
                            <li key={i} className="flex items-start">
                              <span className="text-ocean-blue mr-2">•</span>
                              {req}
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Quyền lợi:</h4>
                        <ul className="text-sm text-gray-600 space-y-1">
                          {job.benefits.map((benefit, i) => (
                            <li key={i} className="flex items-start">
                              <span className="text-green-500 mr-2">•</span>
                              {benefit}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col justify-center">
                    <Button className="bg-ocean-blue text-white hover:bg-blue-700 mb-4">
                      <Mail className="w-4 h-4 mr-2" />
                      Ứng tuyển ngay
                    </Button>
                    <Button variant="outline" className="border-ocean-blue text-ocean-blue hover:bg-ocean-blue hover:text-white">
                      Tìm hiểu thêm
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Contact */}
        <div className="text-center mt-16">
          <p className="text-gray-600 mb-4">
            Không tìm thấy vị trí phù hợp? Hãy gửi CV của bạn cho chúng tôi!
          </p>
          <Button className="bg-accent-orange text-white hover:bg-orange-600">
            Gửi CV tự do
          </Button>
        </div>
      </div>
    </div>
  );
}
