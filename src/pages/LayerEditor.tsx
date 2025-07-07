interface Props {
    xmlObj: any;
    setXmlObj: (obj: any) => void;
  }
  
  export default function LayerEditor({ xmlObj, setXmlObj }: Props) {
    const layers = xmlObj.DotArray2_Parameters?.LayeredStructure?.Layer ?? [];
  
    const handleUpdate = (index: number, key: string, value: string) => {
      const updatedLayers = [...layers];
      updatedLayers[index][key].value = value;
      const updated = { ...xmlObj };
      updated.DotArray2_Parameters.LayeredStructure.Layer = updatedLayers;
      setXmlObj(updated);
    };
  
    return (
      <div>
        <h2 className="text-xl font-semibold mb-4">LayeredStructure Editor</h2>
  
        {layers.map((layer: any, idx: number) => (
          <div key={idx} className="border p-4 rounded mb-4 bg-white shadow">
            <h3 className="font-semibold mb-2">Layer {idx + 1}</h3>
            {Object.entries(layer).map(([key, val]: [string, any]) => (
              <div key={key} className="mb-2">
                <label className="block text-sm font-medium">
                  {key}:
                  <input
                    className="ml-2 border px-2 py-1 rounded text-sm"
                    value={val.value}
                    onChange={(e) => handleUpdate(idx, key, e.target.value)}
                  />
                </label>
              </div>
            ))}
          </div>
        ))}
      </div>
    );
  }
  