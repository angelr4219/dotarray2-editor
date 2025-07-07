type ViewMode = "main" | "layers" | "materials";
import { useState } from "react";
import { parseXML, buildXML } from "./utils/xmlParser";
import LayerEditor from "./pages/LayerEditor";
import MaterialLookup from "./pages/MaterialLookup";

export default function App() {
  const [xmlObj, setXmlObj] = useState<any>(null);
  const [fileName, setFileName] = useState("edited.xml");
  const [view, setView] = useState<ViewMode>("main");

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setFileName(file.name.replace(".xml", "_edited.xml"));

    const reader = new FileReader();
    reader.onload = () => {
      const parsed = parseXML(reader.result as string);
      setXmlObj(parsed);
    };
    reader.readAsText(file);
  };

  const handleDownload = () => {
    const blob = new Blob([buildXML(xmlObj)], { type: "text/xml" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = fileName;
    link.click();
  };

  return (
    <div className="p-8 max-w-4xl mx-auto text-gray-900">
      <h1 className="text-3xl font-bold mb-4">DotArray2 XML Editor</h1>
      <input type="file" accept=".xml" onChange={handleFileUpload} className="mb-4" />

      {xmlObj && (
        <>
          <div className="mb-4 space-x-2">
            <button
              onClick={() => setView("main")}
              className={`px-4 py-2 rounded ${view === "main" ? "bg-blue-700 text-white" : "bg-gray-200"}`}
            >
              Main
            </button>
            <button
              onClick={() => setView("layers")}
              className={`px-4 py-2 rounded ${view === "layers" ? "bg-blue-700 text-white" : "bg-gray-200"}`}
            >
              Edit Layers
            </button>
            <button
              onClick={() => setView("materials")}
              className={`px-4 py-2 rounded ${view === "materials" ? "bg-blue-700 text-white" : "bg-gray-200"}`}
            >
              Material Lookup
            </button>
          </div>

          {view === "layers" && <LayerEditor xmlObj={xmlObj} setXmlObj={setXmlObj} />}
          {view === "materials" && <MaterialLookup xmlObj={xmlObj} />}
          {view === "main" && (
            <pre className="text-sm bg-white p-4 rounded shadow max-h-[600px] overflow-auto">
              {JSON.stringify(xmlObj, null, 2)}
            </pre>
          )}

        </>
      )}
    </div>
  );
}
