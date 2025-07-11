
// MaterialLookup.tsx
import { Link } from "react-router-dom";

import { XMLManager } from "../logic/XMLManager";
export default function MainWindow({ manager }: { manager: XMLManager }) {

  return (
    <div>
      <h1>Material Lookup</h1>
      <Link to="/main">Back to Main</Link>
      {/* Material lookup content */}
    </div>
  );
}