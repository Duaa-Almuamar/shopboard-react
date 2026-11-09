// The only component that draws toasts.
// Always rendered: screen readers only announce changes to a
// role="status" element that is already on the page
import { useToastStore } from "./toast.state";

export default function Toast() {
  const message = useToastStore((state) => state.message);
  const visible = useToastStore((state) => state.visible);

  return (
    <p className={visible ? "toast is-visible" : "toast"} role="status">
      {message}
    </p>
  );
}
