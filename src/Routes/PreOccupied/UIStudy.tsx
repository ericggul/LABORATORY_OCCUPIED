import Buttons1 from "../../PreOccupied/UIStudy/Buttons/Buttons1";
import Buttons2 from "../../PreOccupied/UIStudy/Buttons/Buttons2";
import ButtonsTesting from "../../PreOccupied/UIStudy/Buttons/ButtonsTesting";

import CookiesTesting from "../../PreOccupied/UIStudy/Cookies/CookiesTesting";

import ChakraUITesting from "../../PreOccupied/UIStudy/ChakraUI/ChakraUITesting";
import StatsTesting from "../../PreOccupied/UIStudy/ChakraUI/Stats/StatsTesting";

const ButtonsRoutes = [
  { path: "/buttons1", component: Buttons1 },
  { path: "/buttons2", component: Buttons2 },
  { path: "/buttonstesting", component: ButtonsTesting },
];

const CookiesRoutes = [{ path: "/cookiestesting", component: CookiesTesting }];

const ChakraUIRoutes = [
  { path: "/chakrauitesting", component: ChakraUITesting },
  { path: "/statstesting", component: StatsTesting },
];

const AllRoutes = [...ButtonsRoutes, ...CookiesRoutes, ...ChakraUIRoutes];
export default AllRoutes;
