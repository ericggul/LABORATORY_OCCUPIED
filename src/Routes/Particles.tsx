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

import Particles22 from "../Labs/Particles/Particles2D/Particles22/Particles";

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

  { path: "/particles22", component: Particles22 },
];

const Particles3DRoutes = [
  { path: "/particlesphysicstesting", component: ParticlesPhysicsTesting },
  { path: "/particleslocationtesting", component: ParticlesLocationTesting },
];

export default [...ParticlesRoutes, ...Particles3DRoutes];
