interface HeaderProps {
    title: string;
    children?: React.ReactNode;
  }
  
  export default function Header({ title, children }: HeaderProps) {
    return (
      <header className="fixed top-0 left-0 right-0 bg-gray-100 p-4 shadow flex items-center justify-center z-50">
        <h1 className="text-lg font-bold">{title}</h1>
  
        <div className="absolute right-4 flex gap-2">
          {children}
        </div>
      </header>
    );
  }
  