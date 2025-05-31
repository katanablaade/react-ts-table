import { useEffect } from "react";

export const useAutoHideNotification = (
  isVisible: boolean,
  onHide: () => void,
  duration: number = 3000
) => {
  useEffect(() => {
    if (!isVisible) return;

    const timer = setTimeout(() => {
      onHide();
    }, duration);

    return () => clearTimeout(timer);
  }, [isVisible, duration, onHide]);
};
