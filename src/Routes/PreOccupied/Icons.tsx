import IconsTesting from "../../PreOccupied/Icons/IconsTesting";
import IconsCanvasTesting from "../../PreOccupied/Icons/Likes/IconsCanvasTesting";

import IconsCanvasAnimateTesting from "../../PreOccupied/Icons/Likes/IconsCanvasAnimate/Testing";
import A from "../../PreOccupied/Icons/Likes/IconsCanvasAnimate/Preliminary/A";
import B from "../../PreOccupied/Icons/Likes/IconsCanvasAnimate/Preliminary/B";
import C from "../../PreOccupied/Icons/Likes/IconsCanvasAnimate/Preliminary/C";

import TornadoA from "../../PreOccupied/Icons/Likes/IconsCanvasAnimate/Tornado/A";
import TornadoB from "../../PreOccupied/Icons/Likes/IconsCanvasAnimate/Tornado/B";

import IconsCanvasStaticTesting from "../../PreOccupied/Icons/Likes/IconsCanvasStatic/Testing";
import Autumn from "../../PreOccupied/Icons/Likes/IconsCanvasStatic/MonoTone/Autumn";
import Blossoms from "../../PreOccupied/Icons/Likes/IconsCanvasStatic/MonoTone/Blossoms";
import Falls from "../../PreOccupied/Icons/Likes/IconsCanvasStatic/MonoTone/Falls";
import FirstSnow from "../../PreOccupied/Icons/Likes/IconsCanvasStatic/MonoTone/FirstSnow";
import Ocean from "../../PreOccupied/Icons/Likes/IconsCanvasStatic/MonoTone/Ocean";

import HumansTesting from "../../PreOccupied/Icons/Humans/HumansTesting";
import Humans1 from "../../PreOccupied/Icons/Humans/Circles/Humans1";
import Humans2 from "../../PreOccupied/Icons/Humans/Circles/Humans2";
import Humans3 from "../../PreOccupied/Icons/Humans/Circles/Humans3";
import Humans4 from "../../PreOccupied/Icons/Humans/Circles/Humans4";
import Humans5 from "../../PreOccupied/Icons/Humans/Circles/Humans5";

import HumanRandomRotate1 from "../../PreOccupied/Icons/Humans/Random/RandomRotate1";
import HumanRandomRotate2 from "../../PreOccupied/Icons/Humans/Random/RandomRotate2";
import HumanRandomRotate3 from "../../PreOccupied/Icons/Humans/Random/RandomRotate3";
import HumanRandomSimple from "../../PreOccupied/Icons/Humans/Random/RandomSimple";

//SNS
import SNSTesting from "PreOccupied/Icons/SNS/SNSTesting";
import SNS1 from "PreOccupied/Icons/SNS/SNS1";

const IconsRoutes = [
  { path: "/iconstesting", component: IconsTesting },
  { path: "/iconscanvastesting", component: IconsCanvasTesting },
];

const IconCanvasAnimate = [
  { path: "/iconscanvasanimatetesting", component: IconsCanvasAnimateTesting },
  { path: "/a", component: A },
  { path: "/b", component: B },
  { path: "/c", component: C },
  { path: "/tornadoA", component: TornadoA },
  { path: "/tornadoB", component: TornadoB },
];

const IconCanvasStatic = [
  { path: "/iconscanvasstatictesting", component: IconsCanvasStaticTesting },
  { path: "/autumn", component: Autumn },
  { path: "/blossoms", component: Blossoms },
  { path: "/falls", component: Falls },
  { path: "/firstsnow", component: FirstSnow },
  { path: "/ocean", component: Ocean },
];

const HumansRoutes = [
  { path: "/humanstesting", component: HumansTesting },

  { path: "/humans1", component: Humans1 },
  { path: "/humans2", component: Humans2 },
  { path: "/humans3", component: Humans3 },
  { path: "/humans4", component: Humans4 },
  { path: "/humans5", component: Humans5 },

  { path: "/humanrandomrotate1", component: HumanRandomRotate1 },
  { path: "/humanrandomrotate2", component: HumanRandomRotate2 },
  { path: "/humanrandomrotate3", component: HumanRandomRotate3 },
  { path: "/humanrandomsimple", component: HumanRandomSimple },
];

const SNSRoutes = [
  { path: "/snstesting", component: SNSTesting },
  { path: "/sns1", component: SNS1 },
];

const ArtNoveauWholeRoutes = [
  ...IconsRoutes,
  ...IconCanvasAnimate,
  ...IconCanvasStatic,
  ...HumansRoutes,
  ...SNSRoutes,
];
export default ArtNoveauWholeRoutes;
