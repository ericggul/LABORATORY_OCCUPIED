import IconsTesting from "../../PreOccupied/Icons/IconsTesting";
import IconsCanvasTesting from "../../PreOccupied/Icons/IconsCanvasTesting";

import IconsCanvasAnimateTesting from "../../PreOccupied/Icons/IconsCanvasAnimate/Testing";
import A from "../../PreOccupied/Icons/IconsCanvasAnimate/Preliminary/A";
import B from "../../PreOccupied/Icons/IconsCanvasAnimate/Preliminary/B";
import C from "../../PreOccupied/Icons/IconsCanvasAnimate/Preliminary/C";

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

const IconCanvasAnimate = [
  { path: "/iconscanvasanimatetesting", component: IconsCanvasAnimateTesting },
  { path: "/a", component: A },
  { path: "/b", component: B },
  { path: "/c", component: C },
];

const IconCanvasStatic = [
  { path: "/iconscanvasstatictesting", component: IconsCanvasStaticTesting },
  { path: "/autumn", component: Autumn },
  { path: "/blossoms", component: Blossoms },
  { path: "/falls", component: Falls },
  { path: "/firstsnow", component: FirstSnow },
  { path: "/ocean", component: Ocean },
];

const ArtNoveauWholeRoutes = [
  ...IconsRoutes,
  ...IconCanvasAnimate,
  ...IconCanvasStatic,
];
export default ArtNoveauWholeRoutes;
