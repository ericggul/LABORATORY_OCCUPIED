import ParticlesTesting from "../Labs/Particles/Particles2D/ParticlesTesting/Particles";

//Series 0
import Particles1 from "../Labs/Particles/Particles2D/Particles1/Particles";
import Particles2 from "../Labs/Particles/Particles2D/Particles2/Particles";
import Particles3 from "../Labs/Particles/Particles2D/Particles3/Particles";
import Particles4 from "../Labs/Particles/Particles2D/Particles4/Particles";
import Particles5 from "../Labs/Particles/Particles2D/Particles5/Particles";
import Particles6 from "../Labs/Particles/Particles2D/Particles6/Particles";

//Series 1
import Particles11 from "../Labs/Particles/Particles2D/Particles11/Particles";
import Particles12 from "../Labs/Particles/Particles2D/Particles12/Particles";
import Particles13 from "../Labs/Particles/Particles2D/Particles13/Particles";

import Particles21 from "../Labs/Particles/Particles2D/Particles21/Particles";
import Particles22 from "../Labs/Particles/Particles2D/Particles22/Particles";
import Particles23 from "../Labs/Particles/Particles2D/Particles23/Particles";

import Particles31 from "../Labs/Particles/Particles2D/Particles31/Particles";
import Particles32 from "../Labs/Particles/Particles2D/Particles32/Particles";
import Particles33 from "../Labs/Particles/Particles2D/Particles33/Particles";
import Particles34 from "../Labs/Particles/Particles2D/Particles34/Particles";
import Particles35 from "../Labs/Particles/Particles2D/Particles35/Particles";
import Particles36 from "../Labs/Particles/Particles2D/Particles36/Particles";

import ParticlesPhysicsTesting from "../Labs/Particles/Particles3D/ParticlesPhysicsTesting";
import ParticlesLocationTesting from "../Labs/Particles/Particles3D/ParticlesLocationTesting";
const ParticlesRoutes = [
  { path: "/particlestesting", component: ParticlesTesting },
  { path: "/particles1", component: Particles1 },
  { path: "/particles2", component: Particles2 },
  { path: "/particles3", component: Particles3 },
  { path: "/particles4", component: Particles4 },
  { path: "/particles5", component: Particles5 },
  { path: "/particles6", component: Particles6 },

  { path: "/particles11", component: Particles11 },
  { path: "/particles12", component: Particles12 },
  { path: "/particles13", component: Particles13 },

  { path: "/particles21", component: Particles21 },
  { path: "/particles22", component: Particles22 },
  { path: "/particles23", component: Particles23 },

  { path: "/particles31", component: Particles31 },
  { path: "/particles32", component: Particles32 },
  { path: "/particles33", component: Particles33 },
  { path: "/particles34", component: Particles34 },
  { path: "/particles35", component: Particles35 },
  { path: "/particles36", component: Particles36 },
];

const Particles3DRoutes = [
  { path: "/particlesphysicstesting", component: ParticlesPhysicsTesting },
  { path: "/particleslocationtesting", component: ParticlesLocationTesting },
];

export default [...ParticlesRoutes, ...Particles3DRoutes];
