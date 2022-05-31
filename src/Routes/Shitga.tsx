//system
import ShitgaSystem from "../Labs/Shitga/System/containers/Main";
import DataSector from "../Labs/Shitga/System/containers/DataSector";
import PriceSector from "../Labs/Shitga/System/containers/PriceSector";
import TimeSeriesSector from "../Labs/Shitga/System/containers/TimeSeriesSector";
import TelevisionSector from "../Labs/Shitga/System/containers/TelevisionSector";

import Shitga113 from "../Labs/Shitga/Artworks/Shitga113/Shitga";

//user
import Main from "../Labs/Shitga/Main";
import Portfolio from "../Labs/Shitga/Main/Portfolio";

import AudioMain from "../Labs/Shitga/Audio/AudioMain";
import AudioGuide from "../Labs/Shitga/Audio/AudioGuide";

//Televisions
import TelevisionDisplayFinished from "../Labs/Shitga/Television/containers/display/DisplayFinished";
import TelevisionDisplay from "../Labs/Shitga/Television/containers/display/DisplayWrapper";
import TelevisionComplete from "../Labs/Shitga/Television/containers/users/Complete";
import TelevisionUpload from "../Labs/Shitga/Television/containers/users/Upload";
import TelevisionMain from "../Labs/Shitga/Television/containers/users/Main";

import ShitgaTesting from "../Labs/Shitga/Artworks/ShitgaTesting/Shitga";

const ShitgaRoutes = [
  //should not be on user side
  { path: "/shitga-system", component: ShitgaSystem },
  { path: "/television-display", component: TelevisionDisplay },
  { path: "/shitga113", component: Shitga113 },

  { path: "/price-sector", component: PriceSector },

  { path: "/time-sector", component: TimeSeriesSector },

  { path: "/television-sector", component: TelevisionSector },

  //user interfaces
  { path: "/shitga", component: Main },
  { path: "/portfolio", component: Portfolio },

  { path: "/audio-guide/:idx", component: AudioGuide },
  { path: "/audio", component: AudioMain },

  {
    path: "/television-display-finished",
    component: TelevisionDisplayFinished,
  },

  { path: "/television-complete", component: TelevisionComplete },
  { path: "/television-upload", component: TelevisionUpload },
  { path: "/television", component: TelevisionMain },

  { path: "/shitga-current-price", component: DataSector },

  { path: "/shitga-testing", component: ShitgaTesting },
];

export default ShitgaRoutes;
