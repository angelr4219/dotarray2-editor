// XMLManager.ts
import { XMLParser, XMLBuilder } from "fast-xml-parser";

const parserOptions = {
  ignoreAttributes: false,
  attributeNamePrefix: "",
};

export class XMLManager {
  xmlData: any;
  filePath: string = "";

  loadFile(xml: string, filePath?: string) {
    const parser = new XMLParser(parserOptions);
    this.xmlData = parser.parse(xml);
    if (filePath) this.filePath = filePath;
  }

  saveFile(): string {
    const builder = new XMLBuilder(parserOptions);
    return builder.build(this.xmlData);
  }

  dumpPretty(): string {
    const builder = new XMLBuilder(parserOptions);
    return builder.build(this.xmlData);
  }

  getLayers() {
    return (
      this.xmlData?.DotArray2_Parameters?.LayeredStructure?.Layer || []
    );
  }

  getMaterials() {
    return this.xmlData?.DotArray2_Parameters?.MaterialList?.Material || [];
  }

  updateLayer(index: number, key: string, value: string) {
    const layers = this.getLayers();
    if (!Array.isArray(layers) || index < 0 || index >= layers.length) {
      console.warn(`[x] Layer index ${index} out of range.`);
      return;
    }
    if (!layers[index][key]) {
      console.warn(`[x] Layer ${index} missing key <${key}>.`);
      return;
    }

    layers[index][key]["@_value"] = value;
  }

  updateFromString(xmlString: string) {
    const parser = new XMLParser(parserOptions);
    try {
      this.xmlData = parser.parse(xmlString);
    } catch (e) {
      console.error("Invalid XML string:", e);
    }
  }
}
