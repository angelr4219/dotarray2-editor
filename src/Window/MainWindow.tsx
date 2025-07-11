// MainWindow.tsx
import { Link } from "react-router-dom";
import { XMLManager } from "../logic/XMLManager";
import Header from "../Components/Header";
import { useState } from "react";

export default function MainWindow({ manager }: { manager: XMLManager }) {
  const [xmlContent, setXmlContent] = useState(manager.dumpPretty());

  function handleXmlChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setXmlContent(e.target.value);
    manager.updateFromString(e.target.value);
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header title="DotArray2 XML Editor">
        <Link to="/main" className="px-4 py-2 bg-white rounded shadow">Main</Link>
        <Link to="/layers" className="px-4 py-2 bg-white rounded shadow">Edit Layers</Link>
        <Link to="/materials" className="px-4 py-2 bg-white rounded shadow">Material Lookup</Link>
      </Header>

      <main className="flex-grow p-4 mt-[64px]">
        <h1 className="text-xl font-bold mb-4">Main Window</h1>
        <div className="grid grid-cols-2 gap-4">
          <textarea
            className="w-full h-[80vh] border rounded p-2"
            value={xmlContent}
            onChange={handleXmlChange}
          />
          <textarea
            className="w-full h-[80vh] border rounded p-2"
            value={manager.dumpPretty()}
            readOnly
          />
        </div>
      </main>
    </div>
  );
}
