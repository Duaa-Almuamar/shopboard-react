interface LoadingMessageProps {
  message: string;
}

export default function LoadingMessage({ message }: LoadingMessageProps) {
  return (
    <p className="no-results" role="status">
      {message}
    </p>
  );
}
