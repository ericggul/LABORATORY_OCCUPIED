import ThreeAudioAnalyzer from "../Techs/Three/Tutorials/AudioAnalyzer/Tutorial";

import HiltonTesting from "../Techs/Three/Cannon/HiltonTesting/Hilton";
import Hilton2 from "../Techs/Three/Cannon/Hilton2/Hilton";

import ThreeCannonTutorial from "../Techs/Three/Cannon/Tutorial1/Tutorial";

import ThreeTutorial from "../Techs/Three/Tutorials/Tutorial1/Tutorial";
import ThreeTutorial0ca0a from "../Techs/Three/Tutorials/Tutorial0ca0a/Tutorial";

import ThreeSphere from "../Techs/Three/Sphere/Sphere";
import ThreeBounceBalls from "../Techs/Three/BounceBalls/BounceBalls";
import ThreeSphereLoading from "../Techs/Three/SphereLoading/SphereLoading";

import LayoutChange from "../Techs/Three/Shape/LayoutChange/Shape";
import ShapeTutorial from "../Techs/Three/Shape/ShapeTutorial/Shape";
import ShapeTesting from "../Techs/Three/Shape/ShapeTesting/Shape";
import PlaneTraversal from "../Techs/Three/Shape/PlaneTraversal/Plane";
import ParticlesTutorial from "../Techs/Three/Shape/ParticlesTutorial/Shape";

import ArtifactsTesting from "../Techs/Three/Artifacts/ArtifactsTesting/Artifacts";
import CylindersTesting from "../Techs/Three/Cylinders/CylindersTesting/Cylinders";

const NestedCirclesRoutes = [
  { path: "/audioanalyzer", component: ThreeAudioAnalyzer },

  { path: "/hiltontesting", component: HiltonTesting },
  { path: "/hilton2", component: Hilton2 },

  { path: "/cannontutorial", component: ThreeCannonTutorial },

  { path: "/tutorial", component: ThreeTutorial },
  { path: "/tutorialbanana", component: ThreeTutorial0ca0a },

  { path: "/sphere", component: ThreeSphere },
  { path: "/bounceballs", component: ThreeBounceBalls },
  { path: "/sphereloading", component: ThreeSphereLoading },

  { path: "/layoutchange", component: LayoutChange },
  { path: "/shapetutorial", component: ShapeTutorial },
  { path: "/shapetesting", component: ShapeTesting },
  { path: "/planetraversal", component: PlaneTraversal },
  { path: "/particlestutorial", component: ParticlesTutorial },

  { path: "/artifactstesting", component: ArtifactsTesting },
  { path: "/cylinderstesting", component: CylindersTesting },
];

export default NestedCirclesRoutes;
