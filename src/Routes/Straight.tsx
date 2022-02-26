import StraightTesting from "../Labs/Straight/StraightTesting/StraightTest";
import Straight1 from "../Labs/Straight/Straight1/Straight1";
import Straight2 from "../Labs/Straight/Straight2/Straight2";
import Straight3 from "../Labs/Straight/Straight3/Straight3";
import Straight4 from "../Labs/Straight/Straight4/Straight4";

import StraightBlue from "../Labs/Straight/StraightBlue/StraightBlue";
import StraightIvory from "../Labs/Straight/StraightIvory/StraightIvory";
import StraightPurple from "../Labs/Straight/StraightPurple/StraightPurple";

import StraightCanvasTesting from "../Labs/Straight/StraightCanvasTesting/Straight";

const StraightRoutes = [
  { path: "/straighttesting", component: StraightTesting },
  { path: "/straight1", component: Straight1 },
  { path: "/straight2", component: Straight2 },
  { path: "/straight3", component: Straight3 },
  { path: "/straight4", component: Straight4 },

  { path: "/straightblue", component: StraightBlue },
  { path: "/straightivory", component: StraightIvory },
  { path: "/straightpurple", component: StraightPurple },

  { path: "/straightcanvastesting", component: StraightCanvasTesting },
];

export default StraightRoutes;
