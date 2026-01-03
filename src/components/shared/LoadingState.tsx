import { Loader2 } from "lucide-react";

interface LoadingStateProps {
  message?: string;
}

/**
 * Reusable loading state component with spinner
 */
export const LoadingState = ({ message = "Loading..." }: LoadingStateProps) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 gap-3">
      <Loader2 className="h-8 w-8 animate-spin text-primary" />
      {message && <p className="text-sm text-muted-foreground">{message}</p>}
    </div>
  );
};
