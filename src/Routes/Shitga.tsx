import ShitgaSystem from "../Labs/Shitga/System/containers/DataSector";

//testing
import DataSector from "../Labs/Shitga/System/containers/DataSector";
import PriceSector from "../Labs/Shitga/System/containers/PriceSector";
import TimeSeriesSector from "../Labs/Shitga/System/containers/TimeSeriesSector";

import TelevisionDisplay from "../Labs/Shitga/Television/containers/Display";
import TelevisionMain from "../Labs/Shitga/Television/containers/users/Main";

import AudioMain from "../Labs/Shitga/Audio/AudioMain";
import AudioGuide from "../Labs/Shitga/Audio/AudioGuide";

import ShitgaTesting from "../Labs/Shitga/Artworks/ShitgaTesting/Shitga";

const ShitgaRoutes = [
  { path: "/shitga-current-price", component: DataSector },
  { path: "/data-sector", component: DataSector },
  { path: "/price-sector", component: PriceSector },
  { path: "/time-series-sector", component: TimeSeriesSector },

  { path: "/television-display", component: TelevisionDisplay },
  { path: "/television", component: TelevisionMain },

  { path: "/audio-guide/:idx", component: AudioGuide },
  { path: "/audio", component: AudioMain },

  { path: "/time-seris-sector", component: TimeSeriesSector },
  { path: "/shitga-testing", component: ShitgaTesting },
];

export default ShitgaRoutes;
