import { useCallback, useEffect, useRef, useState } from "react";

export interface ToastState {
  message: string;
  visible: boolean;
}

// Same timing as the original showToast: show, restart the timer on every call,
// hide after `duration` ms. The text stays in place after hiding (only the class goes).
export function useToast() {
  const [toast, setToast] = useState<ToastState>({ message: "", visible: false });
  const hideTimer = useRef<number | undefined>(undefined);

  const showToast = useCallback((message: string, duration = 2000) => {
    setToast({ message, visible: true });

    window.clearTimeout(hideTimer.current);
    hideTimer.current = window.setTimeout(() => {
      setToast((current) => ({ ...current, visible: false }));
    }, duration);
  }, []);

  useEffect(() => () => window.clearTimeout(hideTimer.current), []);

  return { toast, showToast };
}
