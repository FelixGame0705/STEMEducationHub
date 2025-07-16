import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { Calendar, MapPin, Clock } from "lucide-react";
import type { Event } from "@shared/schema";

export default function Events() {
  const [activeTab, setActiveTab] = useState<"upcoming" | "all">("upcoming");

  const { data: events = [], isLoading } = useQuery<Event[]>({
    queryKey: ["/api/events", activeTab],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (activeTab === "upcoming") params.append("upcoming", "true");
      
      const res = await fetch(`/api/events?${params}`);
      return res.json();
    },
  });

  return (
    <div className="min-h-screen py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Sự kiện
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Tham gia các sự kiện STEM thú vị và bổ ích
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as "upcoming" | "all")} className="mb-8">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2">
            <TabsTrigger value="upcoming">Sự kiện sắp tới</TabsTrigger>
            <TabsTrigger value="all">Tất cả sự kiện</TabsTrigger>
          </TabsList>
        </Tabs>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-white rounded-xl p-6 space-y-4">
                <Skeleton className="w-full h-48 rounded-lg" />
                <div className="space-y-4">
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-1/2" />
                  <Skeleton className="h-4 w-2/3" />
                  <Skeleton className="h-10 w-full" />
                </div>
              </div>
            ))}
          </div>
        ) : events.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">
              {activeTab === "upcoming" ? "Không có sự kiện sắp tới nào." : "Không có sự kiện nào."}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {events.map((event) => (
              <Card key={event.id} className="hover:shadow-xl transition-shadow">
                <CardContent className="p-6">
                  <img 
                    src={event.image} 
                    alt={event.title}
                    className="w-full h-48 object-cover rounded-lg mb-4"
                  />
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {event.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-4">
                    {event.description}
                  </p>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm text-gray-500">
                      <Calendar className="w-4 h-4 mr-2" />
                      {new Date(event.startDate).toLocaleDateString('vi-VN')} - {new Date(event.endDate).toLocaleDateString('vi-VN')}
                    </div>
                    
                    <div className="flex items-center text-sm text-gray-500">
                      <MapPin className="w-4 h-4 mr-2" />
                      {event.location}
                    </div>
                  </div>
                  
                  {event.registrationRequired && (
                    <div className="mb-4">
                      <Badge className="bg-orange-100 text-orange-800">
                        Cần đăng ký
                      </Badge>
                    </div>
                  )}
                  
                  <Button className="w-full bg-ocean-blue text-white hover:bg-blue-700">
                    Tìm hiểu thêm
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
