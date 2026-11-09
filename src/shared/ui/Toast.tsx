// The only component that draws toasts.
// Always rendered: screen readers only announce changes to a
// role="status" element that is already on the page

interface ToastProps {
  message: string;
  visible: boolean;
}

export default function Toast({ message, visible }: ToastProps) {
  return (
    <p className={visible ? "toast is-visible" : "toast"} role="status">
      {message}
    </p>
  );
}
