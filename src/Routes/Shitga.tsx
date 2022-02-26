import ShitgaTesting from "../Labs/Shitga/ShitgaTesting/Shitga";
import ShitgaSystem from "../Labs/Shitga/System/System";
import Shitga1 from "../Labs/Shitga/Shitga1/Shitga";
import Shitga2 from "../Labs/Shitga/Shitga2/Shitga";
import Shitga3 from "../Labs/Shitga/Shitga3/Shitga";
import Shitga4 from "../Labs/Shitga/Shitga4/Shitga";

import Shitga106 from "../Labs/Shitga/Shitga106/Shitga";
import Shitga108 from "../Labs/Shitga/Shitga108/Shitga";
import Shitga114 from "../Labs/Shitga/Shitga114/Shitga";
import Shitga115 from "../Labs/Shitga/Shitga115/Shitga";

const ShitgaRoutes = [
  { path: "/the-system-one-and-only", component: ShitgaSystem },
  { path: "/shitgatesting", component: ShitgaTesting },
  { path: "/shitga1", component: Shitga1 },
  { path: "/shitga2", component: Shitga2 },
  { path: "/shitga3", component: Shitga3 },
  { path: "/shitga4", component: Shitga4 },
];

export default ShitgaRoutes;
