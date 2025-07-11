import { useState } from "react";
import Button from "./Button";

interface DropdownButtonProps {
  label: string;
  options: { label: string; action: () => void }[];
}

export default function DropdownButton({ label, options }: DropdownButtonProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative inline-block">
      <Button onClick={() => setOpen(!open)}>{label}</Button>

      {open && (
        <div className="absolute right-0 mt-2 bg-white border rounded shadow z-50">
          {options.map((opt, idx) => (
            <button
              key={idx}
              onClick={() => {
                opt.action();
                setOpen(false);
              }}
              className="block w-full px-4 py-2 text-left hover:bg-gray-100"
            >
              {opt.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
