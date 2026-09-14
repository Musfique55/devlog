import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

interface AppSubmitButtonProps {
  isPending?: boolean;
  pendingLabel?: string;
  children?: React.ReactNode;
  className?: string;
  disabled?: boolean;
}

export const AppSubmitButton = ({
  isPending = false,
  pendingLabel = "Submitting…",
  children,
  className,
  disabled = false,
}: AppSubmitButtonProps) => {
  return (
    <Button type="submit" disabled={disabled || isPending} className={cn(
  className,
  "w-full py-3.5 bg-primary text-white font-semibold text-sm tracking-tight rounded-lg hover:bg-primary/90 active:scale-[0.98] transition-all duration-200 shadow-lg shadow-primary/30 mt-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
)} 
    aria-disabled={disabled || isPending}
    aria-label={isPending ? pendingLabel : undefined}
    aria-busy={isPending}>
    {isPending ? <span className="flex items-center gap-2">{pendingLabel} <Loader2 className="w-4 h-4 animate-spin" /></span> : children}
    </Button>
  )
}

