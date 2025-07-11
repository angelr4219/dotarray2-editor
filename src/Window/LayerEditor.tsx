// LayerEditor.tsx
import { useState } from "react";
import { XMLManager } from "../logic/XMLManager";
import LayerWindow from "./LayerWindow";

interface LayerEditorProps {
  manager: XMLManager;
}

export default function LayerEditor({ manager }: LayerEditorProps) {
  const [activeLayer, setActiveLayer] = useState<number | null>(null);

  const layers = manager.getLayers();
  const materials = manager.getMaterials().map((mat: any) => mat.name?.["@_value"] || "Unnamed");

  function handleLayerSave(index: number, updatedLayer: any) {
    manager.updateLayer(index, "name", updatedLayer.name["@_value"]);
    manager.updateLayer(index, "materialType", updatedLayer.materialType["@_value"]);
    manager.updateLayer(index, "height", updatedLayer.height["@_value"]);
    manager.updateLayer(index, "panelDensity", updatedLayer.panelDensity["@_value"]);
    manager.updateLayer(index, "localWaveCalcType", updatedLayer.localWaveCalcType["@_value"]);
  }

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Edit Layers</h2>
      <div className="flex flex-col gap-2">
        {layers.map((layer: any, index: number) => (
          <div className="relative group">
            <button
              onClick={() => setActiveLayer(index)}
              className="px-4 py-2 bg-white rounded shadow border"
            >
              Layer {index + 1}: {layer.name?.["@_value"] || "Unnamed"}
            </button>
          <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-1 hidden group-hover:block bg-black text-white text-xs rounded px-2 py-1">Click to edit layer details</span>
        </div>
        ))}
      </div>

      {activeLayer !== null && (
        <LayerWindow
          layerData={layers[activeLayer]}
          materials={materials}
          index={activeLayer}
          onSave={handleLayerSave}
          onClose={() => setActiveLayer(null)}
        />
      )}
    </div>
  );}