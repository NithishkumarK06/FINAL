
import { cn } from "@/lib/utils";

interface LogoProps {
  variant?: 'default' | 'small';
  className?: string;
}

const Logo = ({ variant = 'default', className }: LogoProps) => {
  return (
    <div className={cn("flex items-center", className)}>
      {variant === 'default' ? (
        <div className="flex flex-col items-center">
          <img 
            src="/lovable-uploads/77ab54d7-6622-4ba7-b566-93efba2ba0e9.png" 
            alt="HOSPITRAX Logo" 
            className="h-36 w-auto object-contain animate-fade-in" 
          />
        </div>
      ) : (
        <div className="flex items-center gap-3">
          <img 
            src="/lovable-uploads/77ab54d7-6622-4ba7-b566-93efba2ba0e9.png" 
            alt="HOSPITRAX Logo" 
            className="h-20 w-auto object-contain" 
          />
        </div>
      )}
    </div>
  );
};

export default Logo;
