import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";

const BackButton = () => {
  const router = useRouter();
  return (
    <div className="btn btn-sm md:btn-md" onClick={() => router.back()}>
      <ChevronLeft className="w-3 h-3 md:w-5 md:h-5 mr-1" />
      <span className="text-sm md:text-base">Back</span>
    </div>
  );
};

export default BackButton;
