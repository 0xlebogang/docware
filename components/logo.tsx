import { Book } from "lucide-react";
import { cn } from "@/lib/utils";

export const Logo = () => {
  return (
    <div className="flex items-center justify-center gap-2 font-semibold text-lg">
      <LogoIcon className="w-6 h-6" />
      <span>Docware</span>
    </div>
  );
};

export const LogoIcon = ({ className }: { className?: string }) => {
  return <Book className={cn(className)} />;
};
