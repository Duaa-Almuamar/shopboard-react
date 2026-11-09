// The only component that draws toasts.
// Always rendered: screen readers only announce changes to a
// role="status" element that is already on the page
import type { ToastState } from "./useToast";

export default function Toast({ message, visible }: ToastState) {
  return (
    <p className={visible ? "toast is-visible" : "toast"} role="status">
      {message}
    </p>
  );
}
