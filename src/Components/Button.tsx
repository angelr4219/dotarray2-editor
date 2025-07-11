interface ButtonProps {
    children: React.ReactNode;
    onClick?: () => void;
    type?: "button" | "submit" | "reset";
    className?: string;
  }
  
  export default function Button({
    children,
    onClick,
    type = "button",
    className = "",
  }: ButtonProps) {
    return (
      <button
        type={type}
        onClick={onClick}
        className={`px-4 py-2 rounded shadow ${className}`}
      >
        {children}
      </button>
    );
  }
  