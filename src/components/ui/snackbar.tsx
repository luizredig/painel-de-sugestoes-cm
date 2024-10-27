// src/components/ui/Snackbar.tsx
import { useEffect, useState } from "react";

type SnackbarProps = {
  message: string;
  isVisible: boolean;
  onClose: () => void;
};

const Snackbar = ({ message, isVisible, onClose }: SnackbarProps) => {
  const [show, setShow] = useState(isVisible);

  useEffect(() => {
    if (isVisible) {
      setShow(true);
      const timer = setTimeout(() => {
        setShow(false);
        onClose();
      }, 1500);

      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  return (
    <div
      className={`fixed left-1/2 top-0 mt-4 -translate-x-1/2 transform transition-all duration-300 ${
        show ? "translate-y-0 opacity-100" : "-translate-y-10 opacity-0"
      } z-50`}
    >
      <div className="rounded bg-primary px-4 py-2 text-white shadow-lg">
        {message}
      </div>
    </div>
  );
};

export default Snackbar;
