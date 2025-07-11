import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import InitialWindow from "./Window/InitialWindow";
import MainWindow from "./Window/MainWindow";
import LayerEditor from "./Window/LayerEditor";
import MaterialLookup from "./Window/MaterialLookup";
import { XMLManager } from "./logic/XMLManager";
import { useState } from "react";

export default function App() {
  const [manager, setManager] = useState<XMLManager | null>(null);

  function handleFileLoaded(xmlString: string, filePath: string) {
    const newManager = new XMLManager();
    newManager.loadFile(xmlString, filePath);
    setManager(newManager);
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<InitialWindow onFileLoaded={handleFileLoaded} />} />

        {manager ? (
          <>
            <Route path="/main" element={<MainWindow manager={manager} />} />
            <Route path="/layers" element={<LayerEditor manager={manager} />} />
            <Route path="/materials" element={<MaterialLookup manager={manager} />} />
          </>
        ) : (
          <Route path="*" element={<Navigate to="/" replace />} />
        )}
      </Routes>
    </Router>
  );
}
