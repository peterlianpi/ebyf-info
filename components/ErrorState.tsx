import { Button } from "./ui/button";
import ErrorMessage from "./ui/error-message";

interface ErrorStateProps {
  title?: string;
  message: string;
  retry?: () => void;
}

export function ErrorState({ title = "Something went wrong", message, retry }: ErrorStateProps) {
  return (
    <div className="space-y-4">
      {title && <h3 className="text-lg font-semibold">{title}</h3>}
      <ErrorMessage message={message} />
      {retry && (
        <Button variant="outline" onClick={retry}>
          Try again
        </Button>
      )}
    </div>
  );
}