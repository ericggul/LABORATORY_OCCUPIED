import ManetTesting from "../ClementAugustin/Manet/ManetTesting/Manet";
import Manet1 from "../ClementAugustin/Manet/Manet1/Manet";
import Manet2 from "../ClementAugustin/Manet/Manet2/Manet";
import Manet3 from "../ClementAugustin/Manet/Manet3/Manet";
import Manet4 from "../ClementAugustin/Manet/Manet4/Manet";
import Manet5 from "../ClementAugustin/Manet/Manet5/Manet";
import Manet6 from "../ClementAugustin/Manet/Manet6/Manet";
import Manet7 from "../ClementAugustin/Manet/Manet7/Manet";
import Manet8 from "../ClementAugustin/Manet/Manet8/Manet";
import Manet9 from "../ClementAugustin/Manet/Manet9/Manet";
import Manet10 from "../ClementAugustin/Manet/Manet10/Manet";
import Manet11 from "../ClementAugustin/Manet/Manet11/Manet";
import Manet12 from "../ClementAugustin/Manet/Manet12/Manet";
import Manet13 from "../ClementAugustin/Manet/Manet13/Manet";
import Manet14 from "../ClementAugustin/Manet/Manet14/Manet";
import Manet15 from "../ClementAugustin/Manet/Manet15/Manet";
import Manet16 from "../ClementAugustin/Manet/Manet16/Manet";

import MonetTesting from "../ClementAugustin/Monet/MonetTesting/Monet";
import Monet1 from "../ClementAugustin/Monet/Monet1/Monet";
import Monet2 from "../ClementAugustin/Monet/Monet2/Monet";
import Monet3 from "../ClementAugustin/Monet/Monet3/Monet";
import Monet4 from "../ClementAugustin/Monet/Monet4/Monet";
import Monet5 from "../ClementAugustin/Monet/Monet5/Monet";
import Monet6 from "../ClementAugustin/Monet/Monet6/Monet";
import Monet7 from "../ClementAugustin/Monet/Monet7/Monet";
import Monet8 from "../ClementAugustin/Monet/Monet8/Monet";
import Monet9 from "../ClementAugustin/Monet/Monet9/Monet";
import Monet10 from "../ClementAugustin/Monet/Monet10/Monet";

const ManetRoutes = [
  { path: "/manettesting", component: ManetTesting },
  { path: "/manet1", component: Manet1 },
  { path: "/manet2", component: Manet2 },
  { path: "/manet3", component: Manet3 },
  { path: "/manet4", component: Manet4 },
  { path: "/manet5", component: Manet5 },
  { path: "/manet6", component: Manet6 },
  { path: "/manet7", component: Manet7 },
  { path: "/manet8", component: Manet8 },
  { path: "/manet9", component: Manet9 },
  { path: "/manet10", component: Manet10 },
  { path: "/manet11", component: Manet11 },
  { path: "/manet12", component: Manet12 },
  { path: "/manet13", component: Manet13 },
  { path: "/manet14", component: Manet14 },
  { path: "/manet15", component: Manet15 },
  { path: "/manet16", component: Manet16 },
];

const MonetRoutes = [
  { path: "/monettesting", component: MonetTesting },

  { path: "/monet1", component: Monet1 },
  { path: "/monet2", component: Monet2 },
  { path: "/monet3", component: Monet3 },
  { path: "/monet4", component: Monet4 },

  { path: "/monet5", component: Monet5 },
  { path: "/monet6", component: Monet6 },
  { path: "/monet7", component: Monet7 },
  { path: "/monet8", component: Monet8 },

  { path: "/monet9", component: Monet9 },
  { path: "/monet10", component: Monet10 },
];

const ClementAugustinRoutes = [...MonetRoutes, ...ManetRoutes];

export default ClementAugustinRoutes;
