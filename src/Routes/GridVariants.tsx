import GridTestingCentre from "../Labs/Grid/GridTestingCentre/GridTestingCentre";
import Grid1 from "../Labs/Grid/Grid1/Grid";
import Grid2 from "../Labs/Grid/Grid2/Grid2";
import Grid3 from "../Labs/Grid/Grid3/Grid3";
import Grid4 from "../Labs/Grid/Grid4/Grid4";
import Grid5 from "../Labs/Grid/Grid5/Grid5";
import Grid6 from "../Labs/Grid/Grid6/Grid6";
import Grid7 from "../Labs/Grid/Grid7/Grid7";
import Grid8 from "../Labs/Grid/Grid8/Grid8";
import Grid9 from "../Labs/Grid/Grid9/Grid9";
import Grid10 from "../Labs/Grid/Grid10/Grid10";
import Grid11 from "../Labs/Grid/Grid11/Grid11";
import Grid12 from "../Labs/Grid/Grid12/Grid12";
import Grid13 from "../Labs/Grid/Grid13/Grid13";
import GridRose from "../Labs/Grid/GridRose/GridRose";

import NewGrid1 from "../Labs/NewGrid/NewGrid1/NewGrid1";
import NewGrid2 from "../Labs/NewGrid/NewGrid2/NewGrid2";
import NewGridTest from "../Labs/NewGrid/NewGridTest/NewGrid";

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

const OriginalGridRoutes = [
  { path: "/gridtesting", component: GridTestingCentre },
  { path: "/grid1", component: Grid1 },
  { path: "/grid2", component: Grid2 },
  { path: "/grid3", component: Grid3 },
  { path: "/grid4", component: Grid4 },
  { path: "/grid5", component: Grid5 },
  { path: "/grid6", component: Grid6 },
  { path: "/grid7", component: Grid7 },
  { path: "/grid8", component: Grid8 },
  { path: "/grid9", component: Grid9 },
  { path: "/grid10", component: Grid10 },
  { path: "/grid11", component: Grid11 },
  { path: "/grid12", component: Grid12 },
  { path: "/grid13", component: Grid13 },
  { path: "/gridrose", component: GridRose },
];

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
  ...OriginalGridRoutes,
  ...AnimatedGridRoutes,
  ...TiltedGridRoutes,
  ...OnOffGridRoutes,
  ...GridColorRoutes,
];

export default GridVariantsRoutes;
