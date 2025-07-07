import { XMLParser , XMLBuilder} from "fast-xml-parser";


const parserOptions = {
    ignoreAttributes: false,
    attributeNamePrefix: "",
  };
  
  export function parseXML(xml: string) {
    const parser = new XMLParser(parserOptions);
    return parser.parse(xml);
  }
  
  export function buildXML(json: any): string {
    const builder = new XMLBuilder(parserOptions);
    return builder.build(json);
  }
  