import IconsTesting from "../../PreOccupied/Icons/IconsTesting";
import IconsCanvasTesting from "../../PreOccupied/Icons/IconsCanvasTesting";

import IconsCanvasStaticTesting from "../../PreOccupied/Icons/IconsCanvasStatic/Testing";
import Autumn from "../../PreOccupied/Icons/IconsCanvasStatic/MonoTone/#Autumn";
import Blossoms from "../../PreOccupied/Icons/IconsCanvasStatic/MonoTone/#Blossoms";
import Falls from "../../PreOccupied/Icons/IconsCanvasStatic/MonoTone/#Falls";
import FirstSnow from "../../PreOccupied/Icons/IconsCanvasStatic/MonoTone/#FirstSnow";
import Ocean from "../../PreOccupied/Icons/IconsCanvasStatic/MonoTone/#Ocean";

const IconsRoutes = [
  { path: "/iconstesting", component: IconsTesting },
  { path: "/iconscanvastesting", component: IconsCanvasTesting },
];

const IconCanvasStatic = [
  { path: "/iconscanvasstatictesting", component: IconsCanvasStaticTesting },
  { path: "/autumn", component: Autumn },
  { path: "/blossoms", component: Blossoms },
  { path: "/falls", component: Falls },
  { path: "/firstsnow", component: FirstSnow },
  { path: "/ocean", component: Ocean },
];

const ArtNoveauWholeRoutes = [...IconsRoutes, ...IconCanvasStatic];
export default ArtNoveauWholeRoutes;
