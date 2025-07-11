interface MaterialDialogProps {
  material: any;
  onClose: () => void;
}

export default function MaterialDialog({ material, onClose }: MaterialDialogProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded shadow-lg p-6 w-full max-w-md max-h-[80vh] overflow-auto">
        <h2 className="text-lg font-bold mb-4">
          Material: {material.name?.["@_value"] || "Unnamed"}
        </h2>

        <div className="space-y-2">
          {Object.entries(material).map(([key, val]: any) => {
            if (key === "name" || typeof val !== "object" || !val["@_value"]) return null;
            return (
              <div key={key} className="flex justify-between">
                <span className="font-medium">{key}:</span>
                <span>{val["@_value"]}</span>
              </div>
            );
          })}
        </div>

        <div className="flex justify-end mt-4">
          <button onClick={onClose} className="px-4 py-2 bg-gray-300 rounded">Close</button>
        </div>
      </div>
    </div>
  );
}
