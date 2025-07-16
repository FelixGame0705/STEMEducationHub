import { useQuery } from "@tanstack/react-query";
import ProgramCard from "@/components/ProgramCard";
import { Skeleton } from "@/components/ui/skeleton";
import type { Program } from "@shared/schema";

export default function Programs() {
  const { data: programs = [], isLoading } = useQuery<Program[]>({
    queryKey: ["/api/programs"],
  });

  return (
    <div className="min-h-screen py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Chương trình học
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Khám phá các chương trình STEM đa dạng được thiết kế phù hợp với từng độ tuổi
          </p>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white rounded-xl p-6 space-y-4">
                <Skeleton className="w-full h-48 rounded-lg" />
                <Skeleton className="h-6 w-20" />
                <Skeleton className="h-6 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-10 w-full" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {programs.map((program) => (
              <ProgramCard key={program.id} program={program} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
