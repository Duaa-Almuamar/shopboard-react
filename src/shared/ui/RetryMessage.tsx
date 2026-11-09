interface RetryMessageProps {
  message: string;
  onRetry: () => void;
}

export default function RetryMessage({ message, onRetry }: RetryMessageProps) {
  return (
    <div className="no-results" role="alert">
      <p>{message}</p>
      <button className="button" type="button" onClick={onRetry}>
        Try again
      </button>
    </div>
  );
}
