import CircleTesting from "../Labs/Circles/CircleTesting/CircleTesting";
import Circle1 from "../Labs/Circles/Circle1/Circle1";
import Circle2 from "../Labs/Circles/Circle2/Circle2";
import Circle3 from "../Labs/Circles/Circle3/Circle3";
import Circle4 from "../Labs/Circles/Circle4/Circle4";
import Circle5 from "../Labs/Circles/Circle5/Circle5";
import Circle6 from "../Labs/Circles/Circle6/Circle6";
import Circle7 from "../Labs/Circles/Circle7/Circle7";
import Circle8 from "../Labs/Circles/Circle8/Circle8";
import Circle9 from "../Labs/Circles/Circle9/Circle9";
import Circle10 from "../Labs/Circles/Circle10/Circle10";
import Circle11 from "../Labs/Circles/Circle11/Circle11";

import CircleColorTesting from "../Labs/Circles/CircleColor/CircleColorTesting/CircleColor";
import CircleColor2 from "../Labs/Circles/CircleColor/CircleColor2/CircleColor2";
import CircleColor3 from "../Labs/Circles/CircleColor/CircleColor3/CircleColor3";
import CircleColor4 from "../Labs/Circles/CircleColor/CircleColor4/CircleColor4";
import CircleRotate from "../Labs/Circles/CircleRotate/CircleRotate";

import CircleGrid1 from "../Labs/Circles/CircleGrid1/CircleGrid1";
import CircleGrid2 from "../Labs/Circles/CircleGrid2/CircleGrid2";
import CircleGrid3 from "../Labs/Circles/CircleGrid3/CircleGrid3";
import CircleGrid4 from "../Labs/Circles/CircleGrid4/CircleGrid4";

import NestedCirclesTesting from "../Labs/Circles/NestedCircles/NestedCirclesTesting/NestedCircles";
import NestedCircles1 from "../Labs/Circles/NestedCircles/NestedCircles1/NestedCircles";
import NestedCircles2 from "../Labs/Circles/NestedCircles/NestedCircles2/NestedCircles";
import NestedCircles3 from "../Labs/Circles/NestedCircles/NestedCircles3/NestedCircles";
import NestedCircles4 from "../Labs/Circles/NestedCircles/NestedCircles4/NestedCircles";
import NestedCircles5 from "../Labs/Circles/NestedCircles/NestedCircles5/NestedCircles";
import NestedCircles6 from "../Labs/Circles/NestedCircles/NestedCircles6/NestedCircles";
import NestedCircles7 from "../Labs/Circles/NestedCircles/NestedCircles7/NestedCircles";
import NestedCircles8 from "../Labs/Circles/NestedCircles/NestedCircles8/NestedCircles";
import NestedCircles9 from "../Labs/Circles/NestedCircles/NestedCircles9/NestedCircles";
import NestedCircles10 from "../Labs/Circles/NestedCircles/NestedCircles10/NestedCircles";
import NestedCircles11 from "../Labs/Circles/NestedCircles/NestedCircles11/NestedCircles";
import NestedCircles12 from "../Labs/Circles/NestedCircles/NestedCircles12/NestedCircles";
import NestedCircles13 from "../Labs/Circles/NestedCircles/NestedCircles13/NestedCircles";

import SemiCirclesTesting from "../Labs/Circles/SemiCircles/SemiCirclesTesting/SemiCircles";
import SemiCircles1 from "../Labs/Circles/SemiCircles/SemiCircles1/SemiCircles";
import SemiCircles2 from "../Labs/Circles/SemiCircles/SemiCircles2/SemiCircles";
import SemiCircles3 from "../Labs/Circles/SemiCircles/SemiCircles3/SemiCircles";

import StrokeCirclesTesting from "../Labs/Circles/StrokeCircles/StrokeCirclesTesting/StrokeCircles";

const OriginalCircleRoutes = [
  { path: "/circletesting", component: CircleTesting },
  { path: "/circle1", component: Circle1 },
  { path: "/circle2", component: Circle2 },
  { path: "/circle3", component: Circle3 },
  { path: "/circle4", component: Circle4 },
  { path: "/circle5", component: Circle5 },
  { path: "/circle6", component: Circle6 },
  { path: "/circle7", component: Circle7 },
  { path: "/circle8", component: Circle8 },
  { path: "/circle9", component: Circle9 },
  { path: "/circle10", component: Circle10 },
  { path: "/circle11", component: Circle11 },
];

const CircleColorRoutes = [
  { path: "/circlecolortesting", component: CircleColorTesting },
  { path: "/circlecolor2", component: CircleColor2 },
  { path: "/circlecolor3", component: CircleColor3 },
  { path: "/circlecolor4", component: CircleColor4 },
  { path: "/circlerotate", component: CircleRotate },
];

const CircleGridRoutes = [
  { path: "/circlegrid1", component: CircleGrid1 },
  { path: "/circlegrid2", component: CircleGrid2 },
  { path: "/circlegrid3", component: CircleGrid3 },
  { path: "/circlegrid4", component: CircleGrid4 },
];

const NestedCirclesRoutes = [
  { path: "/nestedcirclestesting", component: NestedCirclesTesting },
  { path: "/nestedcircles1", component: NestedCircles1 },
  { path: "/nestedcircles2", component: NestedCircles2 },
  { path: "/nestedcircles3", component: NestedCircles3 },
  { path: "/nestedcircles4", component: NestedCircles4 },
  { path: "/nestedcircles5", component: NestedCircles5 },
  { path: "/nestedcircles6", component: NestedCircles6 },
  { path: "/nestedcircles7", component: NestedCircles7 },
  { path: "/nestedcircles8", component: NestedCircles8 },
  { path: "/nestedcircles9", component: NestedCircles9 },
  { path: "/nestedcircles10", component: NestedCircles10 },
  { path: "/nestedcircles11", component: NestedCircles11 },
  { path: "/nestedcircles12", component: NestedCircles12 },
  { path: "/nestedcircles13", component: NestedCircles13 },
];

const SemiCirclesRoutes = [
  { path: "/semicirclestesting", component: SemiCirclesTesting },
  { path: "/semicircles1", component: SemiCircles1 },
  { path: "/semicircles2", component: SemiCircles2 },
  { path: "/semicircles3", component: SemiCircles3 },
];

const StrokeCirclesRoutes = [
  { path: "/strokecirclestesting", component: StrokeCirclesTesting },
];

const CircleVariantsRoutes = [
  ...OriginalCircleRoutes,
  ...CircleColorRoutes,
  ...CircleGridRoutes,
  ...NestedCirclesRoutes,
  ...SemiCirclesRoutes,
  ...StrokeCirclesRoutes,
];
export default CircleVariantsRoutes;
