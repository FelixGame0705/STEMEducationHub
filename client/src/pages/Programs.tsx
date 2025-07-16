import { useQuery } from "@tanstack/react-query";
import ProgramCard from "@/components/ProgramCard";
import { Skeleton } from "@/components/ui/skeleton";
import type { Program } from "@shared/schema";

export default function Programs() {
  const { data, isLoading } = useQuery({
    queryKey: ["/api/programs"],
    queryFn: () => fetch("/api/programs").then((res) => res.json()),
  });

  // Tách mảng chương trình từ object trả về
  const programs: Program[] = data?.programs || [];

  return (
    <div className="py-8 px-4">
      <h1 className="text-3xl font-bold mb-2">Chương trình học</h1>
      <p className="text-gray-600 mb-6">
        Khám phá các chương trình STEM đa dạng được thiết kế phù hợp với từng độ tuổi
      </p>

      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <Skeleton key={i} className="h-48 w-full rounded-xl" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {programs.map((program) => (
            <ProgramCard key={program.id} program={program} />
          ))}
        </div>
      )}
    </div>
  );
}
