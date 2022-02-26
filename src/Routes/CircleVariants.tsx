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

import SemiCirclesTesting from "../Labs/Circles/SemiCircles/SemiCirclesTesting/SemiCircles";
import SemiCircles1 from "../Labs/Circles/SemiCircles/SemiCircles1/SemiCircles";
import SemiCircles2 from "../Labs/Circles/SemiCircles/SemiCircles2/SemiCircles";
import SemiCircles3 from "../Labs/Circles/SemiCircles/SemiCircles3/SemiCircles";

import StrokeCirclesTesting from "../Labs/Circles/StrokeCircles/StrokeCirclesTesting/StrokeCircles";

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
  ...NestedCirclesRoutes,
  ...SemiCirclesRoutes,
  ...StrokeCirclesRoutes,
];
export default CircleVariantsRoutes;
