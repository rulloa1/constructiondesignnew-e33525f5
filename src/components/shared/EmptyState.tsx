interface EmptyStateProps {
  message: string;
}

/**
 * Reusable empty state component
 */
export const EmptyState = ({ message }: EmptyStateProps) => {
  return (
    <div className="text-center py-12 text-muted-foreground">
      {message}
    </div>
  );
};
