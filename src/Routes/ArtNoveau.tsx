import ArtNoveauTesting from "../Labs/ArtNoveau/ArtNoveauTesting/ArtNoveau";

import ArtNoveau1 from "../Labs/ArtNoveau/ArtNoveau1/ArtNoveau";
import ArtNoveau2 from "../Labs/ArtNoveau/ArtNoveau2/ArtNoveau";
import ArtNoveau3 from "../Labs/ArtNoveau/ArtNoveau3/ArtNoveau";
import ArtNoveau4 from "../Labs/ArtNoveau/ArtNoveau4/ArtNoveau";
import ArtNoveau5 from "../Labs/ArtNoveau/ArtNoveau5/ArtNoveau";

import ArtNoveauText1 from "../Labs/ArtNoveau/ArtNoveauText1/ArtNoveau";
import ArtNoveauText2 from "../Labs/ArtNoveau/ArtNoveauText2/ArtNoveau";
import ArtNoveauText3 from "../Labs/ArtNoveau/ArtNoveauText3/ArtNoveau";
import ArtNoveauText4 from "../Labs/ArtNoveau/ArtNoveauText4/ArtNoveau";

const ArtNoveauRoutes = [
  { path: "/artnoveautesting", component: ArtNoveauTesting },
  { path: "/artnoveau1", component: ArtNoveau1 },
  { path: "/artnoveau2", component: ArtNoveau2 },
  { path: "/artnoveau3", component: ArtNoveau3 },
  { path: "/artnoveau4", component: ArtNoveau4 },
  { path: "/artnoveau5", component: ArtNoveau5 },
];

const ArtNoveauTextRoutes = [
  { path: "/artnoveautext1", component: ArtNoveauText1 },
  { path: "/artnoveautext2", component: ArtNoveauText2 },
  { path: "/artnoveautext3", component: ArtNoveauText3 },
  { path: "/artnoveautext4", component: ArtNoveauText4 },
];

const ArtNoveauWholeRoutes = [...ArtNoveauRoutes, ...ArtNoveauTextRoutes];
export default ArtNoveauWholeRoutes;
