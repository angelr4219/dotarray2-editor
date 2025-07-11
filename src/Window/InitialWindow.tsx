// InitialWindow.tsx
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../Components/Header";

interface InitialWindowProps {
  onFileLoaded: (xmlString: string, filePath: string) => void;
}

export default function InitialWindow({ onFileLoaded }: InitialWindowProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  function handleFiles(files: FileList | null) {
    if (!files?.length) return;
    const file = files[0];
    if (!file.name.endsWith(".xml")) {
      alert("Only XML files are supported.");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      const xmlString = reader.result as string;
      onFileLoaded(xmlString, file.name);
      navigate("/main");
    };
    reader.readAsText(file);
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header title="DotArray2 XML Editor" />
      <main className="flex-grow flex flex-col items-center justify-center">
        <h1 className="text-xl font-bold mb-4">Select XML File</h1>
        <button onClick={() => fileInputRef.current?.click()} className="px-4 py-2 bg-blue-600 text-white rounded">Load Custom XML</button>
        <input
          ref={fileInputRef}
          type="file"
          accept=".xml"
          className="hidden"
          onChange={(e) => handleFiles(e.target.files)}
        />
      </main>
    </div>
  );
}
