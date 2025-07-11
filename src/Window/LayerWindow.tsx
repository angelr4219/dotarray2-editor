import { useState } from "react";

interface LayerWindowProps {
  layerData: any;
  materials: string[];
  index: number;
  onSave: (index: number, updatedLayer: any) => void;
  onClose: () => void;
}

export default function LayerWindow({
  layerData,
  materials,
  index,
  onSave,
  onClose,
}: LayerWindowProps) {
  const [formData, setFormData] = useState({
    name: layerData.name?.["@_value"] || "",
    materialType: layerData.materialType?.["@_value"] || "",
    height: layerData.height?.["@_value"] || "",
    panelDensity: layerData.panelDensity?.["@_value"] || "",
    localWaveCalcType: layerData.localWaveCalcType?.["@_value"] || "",
  });

  function handleChange(key: string, value: string) {
    setFormData((prev) => ({ ...prev, [key]: value }));
  }

  function handleSave() {
    if (isNaN(Number(formData.height)) || isNaN(Number(formData.panelDensity))) {
      alert("Height and Panel Density must be numeric.");
      return;
    }

    const updated = {
      name: { "@_value": formData.name },
      materialType: { "@_value": formData.materialType },
      height: { "@_value": formData.height },
      panelDensity: { "@_value": formData.panelDensity },
      localWaveCalcType: { "@_value": formData.localWaveCalcType },
    };

    onSave(index, updated);
    onClose();
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded shadow-lg p-6 w-full max-w-md">
        <h2 className="text-lg font-bold mb-4">Edit Layer {index + 1}</h2>

        {Object.entries(formData).map(([key, value]) =>
          key === "materialType" ? (
            <div key={key} className="mb-2">
              <label className="block text-sm font-medium">{key}</label>
              <select
                value={value}
                onChange={(e) => handleChange(key, e.target.value)}
                className="border rounded p-1 w-full"
              >
                {materials.map((mat) => (
                  <option key={mat} value={mat}>{mat}</option>
                ))}
              </select>
            </div>
          ) : (
            <div key={key} className="mb-2">
              <label className="block text-sm font-medium">{key}</label>
              <input
                type="text"
                value={value}
                onChange={(e) => handleChange(key, e.target.value)}
                className="border rounded p-1 w-full"
              />
            </div>
          )
        )}

        <div className="flex justify-end gap-2 mt-4">
          <button onClick={onClose} className="px-4 py-2 bg-gray-300 rounded">Cancel</button>
          <button onClick={handleSave} className="px-4 py-2 bg-blue-600 text-white rounded">Save</button>
        </div>
      </div>
    </div>
  );
}
 