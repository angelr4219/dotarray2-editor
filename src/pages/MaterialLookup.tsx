import { useState } from "react";

interface Props {
  xmlObj: any;
}

export default function MaterialLookup({ xmlObj }: Props) {
  const [selected, setSelected] = useState<string | null>(null);

  const materials =
    xmlObj.DotArray2_Parameters?.MaterialList?.Material ?? [];

  const selectedMaterial = materials.find(
    (m: any) => m.name?.value === selected
  );

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Material Lookup</h2>
      <div className="flex flex-wrap gap-2 mb-6">
        {materials.map((mat: any, idx: number) => (
          <button
            key={idx}
            onClick={() => setSelected(mat.name?.value)}
            className={`px-3 py-1 rounded border ${
              selected === mat.name?.value
                ? "bg-blue-600 text-white"
                : "bg-gray-100 hover:bg-gray-200"
            }`}
          >
            {mat.name?.value}
          </button>
        ))}
      </div>

      {selectedMaterial && (
        <div className="bg-white p-4 rounded shadow max-w-md">
          <h3 className="text-lg font-semibold mb-2">
            {selectedMaterial.name.value}
          </h3>
          <ul className="text-sm space-y-1">
            {Object.entries(selectedMaterial).map(([key, val]: [string, any]) =>
              key === "name" ? null : (
                <li key={key}>
                  <strong>{key}</strong>: {val.value}
                </li>
              )
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
