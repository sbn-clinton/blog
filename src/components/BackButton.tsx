import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";

const BackButton = () => {
  const router = useRouter();
  return (
    <div className="btn " onClick={() => router.back()}>
      <ChevronLeft className="w-5 h-5" />
      <span className="text-sm md:text-base">Back</span>
    </div>
  );
};

export default BackButton;
