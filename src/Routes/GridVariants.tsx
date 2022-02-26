import AnimatedGridTesting from "../Labs/Grid/AnimatedGrid/AnimatedGridTesting/AnimatedGrid";
import AnimatedGrid1 from "../Labs/Grid/AnimatedGrid/AnimatedGrid1/AnimatedGrid";
import AnimatedGrid2 from "../Labs/Grid/AnimatedGrid/AnimatedGrid2/AnimatedGrid";
import AnimatedGrid3 from "../Labs/Grid/AnimatedGrid/AnimatedGrid3/AnimatedGrid";
import AnimatedGrid4 from "../Labs/Grid/AnimatedGrid/AnimatedGrid4/AnimatedGrid";
import AnimatedGrid5 from "../Labs/Grid/AnimatedGrid/AnimatedGrid5/AnimatedGrid";

import TiltedGridTesting from "../Labs/Grid/TiltedGrid/TiltedGridTesting/TiltedGrid";
import TiltedGrid1 from "../Labs/Grid/TiltedGrid/TiltedGrid1/TiltedGrid";
import TiltedGrid2 from "../Labs/Grid/TiltedGrid/TiltedGrid2/TiltedGrid";
import TiltedGrid3 from "../Labs/Grid/TiltedGrid/TiltedGrid3/TiltedGrid";
import TiltedGrid4 from "../Labs/Grid/TiltedGrid/TiltedGrid4/TiltedGrid";

import OnOffGridTesting from "../Labs/Grid/OnOffGrid/OnOffGridTesting/OnOffGrid";

import GridColor1 from "../Labs/Grid/GridColor/GridColor1/GridColor1";
import GridColor2 from "../Labs/Grid/GridColor/GridColor2/GridColor2";
import GridColor3 from "../Labs/Grid/GridColor/GridColor3/GridColor3";
import GridColor4 from "../Labs/Grid/GridColor/GridColor4/GridColor4";
import GridColor5 from "../Labs/Grid/GridColor/GridColor5/GridColor5";

const AnimatedGridRoutes = [
  { path: "/animatedgridtesting", component: AnimatedGridTesting },
  { path: "/animatedgrid1", component: AnimatedGrid1 },
  { path: "/animatedgrid2", component: AnimatedGrid2 },
  { path: "/animatedgrid3", component: AnimatedGrid3 },
  { path: "/animatedgrid4", component: AnimatedGrid4 },
  { path: "/animatedgrid5", component: AnimatedGrid5 },
];

const TiltedGridRoutes = [
  { path: "/tiltedgridtesting", component: TiltedGridTesting },
  { path: "/tiltedgrid1", component: TiltedGrid1 },
  { path: "/tiltedgrid2", component: TiltedGrid2 },
  { path: "/tiltedgrid3", component: TiltedGrid3 },
  { path: "/tiltedgrid4", component: TiltedGrid4 },
];

const OnOffGridRoutes = [
  { path: "/onoffgridtesting", component: OnOffGridTesting },
];

const GridColorRoutes = [
  { path: "/gridcolor1", component: GridColor1 },
  { path: "/gridcolor2", component: GridColor2 },
  { path: "/gridcolor3", component: GridColor3 },
  { path: "/gridcolor4", component: GridColor4 },
  { path: "/gridcolor5", component: GridColor5 },
];
const GridVariantsRoutes = [
  ...AnimatedGridRoutes,
  ...TiltedGridRoutes,
  ...OnOffGridRoutes,
  ...GridColorRoutes,
];

export default GridVariantsRoutes;
