import React, { Suspense } from "react";
import "./App.css";

import {
  Route,
  Routes,
  Navigate,
  BrowserRouter as Router,
} from "react-router-dom";

import { ChakraProvider } from "@chakra-ui/react";

import MainPage from "./Pages/MainPage/MainPage";
import ArchivedPage from "./Pages/ArchivedPage/ArchivedPage";

import Area1 from "./Labs/Area/Area1/Area1";
import Area2 from "./Labs/Area/Area2/Area2";
import Area3 from "./Labs/Area/Area3/Area3";
import Area4 from "./Labs/Area/Area4/Area4";
import Area5 from "./Labs/Area/Area5/Area5";
import Area6 from "./Labs/Area/Area6/Area6";
import AreaTesting from "./Labs/Area/AreaTesting/AreaTesting";

import RadialGradientTesting from "./Labs/RadialGradient/RadialGradientTesting/RadialGradientTesting";

//Taang
import Taang from "./Labs/Letters/Taang";
import Question from "./Labs/Letters/Question";

import Square from "./Labs/Square/Square1/Square";
import Square2 from "./Labs/Square/Square2/Square2";
import Square3 from "./Labs/Square/Square3/Square3";
import Square4 from "./Labs/Square/Square4/Square4";
import Square5 from "./Labs/Square/Square5/Square5";
import Square6 from "./Labs/Square/Square6/Square6";
import Square7 from "./Labs/Square/Square7/Square7";
import Square8 from "./Labs/Square/Square8/Square8";
import Square9 from "./Labs/Square/Square9/Square9";
import Square10 from "./Labs/Square/Square10/Square10";
import Square11 from "./Labs/Square/Square11/Square11";
import Square12 from "./Labs/Square/Square12/Square12";
import Square13 from "./Labs/Square/Square13/Square13";
import Square14 from "./Labs/Square/Square14/Square14";
import Persian from "./Labs/Square/Persian/Persian";
import Persian2 from "./Labs/Square/Persian2/Persian2";

import Texture1 from "./Labs/Texture/Texture1/Texture";
import Texture2 from "./Labs/Texture/Texture2/Texture";
import Texture3 from "./Labs/Texture/Texture3/Texture";
import Texture4 from "./Labs/Texture/Texture4/Texture";
import Texture5 from "./Labs/Texture/Texture5/Texture";
import TextureTesting from "./Labs/Texture/TextureTesting/Texture";

import LargeTexture1 from "./Labs/Texture/LargeTexture/LargeTexture1/LargeTexture";
import LargeTexture2 from "./Labs/Texture/LargeTexture/LargeTexture2/LargeTexture";
import LargeTextureTesting from "./Labs/Texture/LargeTexture/LargeTextureTesting/LargeTexture";

import TFT from "./Labs/Numbers/TFT/TFT";
import TFO from "./Labs/Numbers/TFO/TFO";
import TwoFourtyTwo from "./Labs/Numbers/TwoFourtyTwo/TwoFourtyTwo";
import NineNintyOne from "./Labs/Numbers/NineNintyOne/NineNintyOne";
import SevenSeventyThree from "./Labs/Numbers/SevenSeventyThree/SevenSeventyThree";

import NeonTesting from "./Labs/Neon/NeonTesting/NeonTesting";
import Neon from "./Labs/Neon/Neon1/Neon";
import Neon2 from "./Labs/Neon/Neon2/Neon2";
import Neon3 from "./Labs/Neon/Neon3/Neon3";
import Neon4 from "./Labs/Neon/Neon4/Neon4";
import Neon5 from "./Labs/Neon/Neon5/Neon5";

import Zizzic from "./Labs/Zizzic/Zizzic";
import Monet from "./Labs/Monet/Monet";
import Circus from "./Labs/Circus/Circus";

import SasekTesting from "./Labs/Sasek/SasekTesting/Sasek";

import FunctionsTesting from "./Labs/Functions/FunctionsTesting/FunctionsTesting";
import Pow3 from "./Labs/Functions/Pow3/Pow3";
import Tan from "./Labs/Functions/Tan/Tan";
import TanH from "./Labs/Functions/TanH/TanH";

import RoseSelavy from "./Labs/words/RoseSelavy/RoseSelavy";
import Words1 from "./Labs/words/Words1/Words";
import Words2 from "./Labs/words/Words2/Words";
import Orchestra from "./Labs/words/Orchestra/Words";
import PipeOrgan from "./Labs/words/PipeOrgan/Words";
import TextSpread from "./Labs/words/TextSpread/Words";
import WordsTesting from "./Labs/words/WordsTesting/Words";

import ElevatorWaitingTesting from "./Labs/ElevatorWaiting/ElevatorWaitingTesting";

import Monochrome1 from "./Labs/Monochrome/Monochrome1";
import Monochrome2 from "./Labs/Monochrome/Monochrome2";
import Monochrome3 from "./Labs/Monochrome/Monochrome3";
import Monochrome4 from "./Labs/Monochrome/Monochrome4";
import MonochromeTesting from "./Labs/Monochrome/MonochromeTesting";

import Division from "./Labs/Division/Division";
import Depth from "./Labs/Depth/Depth1/Depth";
import Depth2 from "./Labs/Depth/Depth2/Depth2";
import Depth3 from "./Labs/Depth/Depth3/Depth3";
import Depth4 from "./Labs/Depth/Depth4/Depth4";

import Rainbow from "./Labs/Rainbow/Rainbow";
import WaatTesting from "./Labs/Waat/WaatTesting";

import Facade1 from "./Labs/Facade/Facade1/Facade1";
import Facade2 from "./Labs/Facade/Facade2/Facade2";
import Pompidou from "./Labs/Facade/Pompidou/Pompidou";

import VerticalTesting from "./Labs/Verticals/VerticalTesting/VerticalTesting";
import Vertical1 from "./Labs/Verticals/Vertical1/Vertical1";
import Vertical2 from "./Labs/Verticals/Vertical2/Vertical2";
import Vertical3 from "./Labs/Verticals/Vertical3/Vertical3";

import Building from "./Labs/Building/Building";
import Instagrammable from "./Labs/words/InstagrammableTest/Instagrammable";

import Color1 from "./Labs/Beta/Color1/Color1";

import LevelTesting from "./Labs/Levels/LevelTesting/Level";

import Elevator from "./Labs/Elevator/Elevator1/Elevator";
import ElevatorRectangular from "./Labs/Elevator/ElevatorRectangular/Elevator";
import ElevatorCircular from "./Labs/Elevator/ElevatorCircular/Elevator";
import ParkingLot from "./Labs/Elevator/ParkingLot/Parking";
import TowardsDivergenceTesting from "./Labs/TowardsDivergence/TowardsDivergenceTesting/TowardsDivergence";

import Chandelier1 from "./Labs/Circles/Chandelier/Chandelier1/Chandelier1";
import Chandelier2 from "./Labs/Circles/Chandelier/Chandelier2/Chandelier2";
import Chandelier3 from "./Labs/Circles/Chandelier/Chandelier3/Chandelier3";

import HopeTesting from "./Labs/Hope/HopeTesting";

import DataCirclesTesting from "./Labs/Circles/DataCircles/DataCirclesTesting/DataCircles";

import NineOne1 from "./Labs/Circles/NineOne1/NineOne1";

import BounceMusic from "./Labs/Tone/BounceMusic/BounceMusic";
import ToneTesting from "./Labs/Tone/ToneTesting/Tone";

import TextBlinkTesting from "./Labs/Blink/TextBlink/TextBlinkTesting";
import Spike from "./Labs/Spike/SpikeTesting/Spike";
import Writings from "./Labs/VeryLogical/Writings/Writings";

import Calculator from "./Labs/VeryLogical/Calculator/Calculator";
import Clock from "./Labs/VeryLogical/Clock/Clock";
import Clock2 from "./Labs/VeryLogical/Clock2/Clock2";
import Dollar from "./Labs/VeryLogical/Dollar/Dollar";

import Email from "./Labs/VeryLogical/Email/Email";

import LinesTesting from "./Labs/Lines/LinesTesting";

import SixteenTesting from "./Labs/VeryLogical/Sixteen/SixteenTesting/SixteenTesting";

import QuadriptychTesting from "./Labs/Quadriptych/QuadriptychTesting/QuadriptychTesting";

import QuadriSquare12 from "./Labs/Quadriptych/QuadriSquare12/QuadriSquare12";
import Cities from "./Labs/Quadriptych/Cities/Cities";

import WhiteMonumentsTest from "./Labs/WhiteMonuments/WhiteMonumentsTest/WhiteMonumentsTest";
import WhiteMonuments1 from "./Labs/WhiteMonuments/WhiteMonuments1/WhiteMonuments1";
import WhiteMonuments2 from "./Labs/WhiteMonuments/WhiteMonuments2/WhiteMonuments2";
import WhiteMonuments3 from "./Labs/WhiteMonuments/WhiteMonuments3/WhiteMonuments3";
import WhiteMonuments4 from "./Labs/WhiteMonuments/WhiteMonuments4/WhiteMonuments4";
import WhiteMonuments5 from "./Labs/WhiteMonuments/WhiteMonuments5/WhiteMonuments5";
import WhiteMonuments6 from "./Labs/WhiteMonuments/WhiteMonuments6/WhiteMonuments6";
import WhiteMonuments7 from "./Labs/WhiteMonuments/WhiteMonuments7/WhiteMonuments7";
import WhiteMonuments8 from "./Labs/WhiteMonuments/WhiteMonuments8/WhiteMonuments8";
import WhiteMonuments9 from "./Labs/WhiteMonuments/WhiteMonuments9/WhiteMonuments9";
import WhiteMonuments10 from "./Labs/WhiteMonuments/WhiteMonuments10/WhiteMonuments10";
import WhiteMonuments11 from "./Labs/WhiteMonuments/WhiteMonuments11/WhiteMonuments11";
import WhiteMonuments12 from "./Labs/WhiteMonuments/WhiteMonuments12/WhiteMonuments12";
import WhiteMonuments13 from "./Labs/WhiteMonuments/WhiteMonuments13/WhiteMonuments13";

import Smudge from "./Techs/Smudge/Smudge";
import Quotes from "./Techs/Quotes/Quotes";

import DeviceMotionTesting from "./Techs/DeviceMotion/DeviceMotionTesting";
import DeviceMotionPanel from "./Techs/DeviceMotion/DeviceMotionPanel";

import UTurn from "./Labs/U/UTurn/UTurn";
import UR1 from "./Labs/U/UR1/UR1";
import URScreen from "./Labs/U/URScreen/URScreen";
import UGrid from "./Labs/U/UGrid/UGrid";

import Lsd from "./Techs/Animations/Lsd/Lsd";
import Nightsky from "./Techs/Animations/Nightsky/Nightsky";
import Verticals from "./Techs/Animations/Verticals/Verticals";
import Emergence from "./Techs/Animations/Emergence/Emergence";

import AudioTesting from "./Techs/Audio/MapboxAudio/AudioTesting/AudioTesting";
import AudioDefault from "./Techs/Audio/AudioDefault/AudioDefault";
import RageTheNight from "./Techs/Audio/RageTheNight/RageTheNight";
import RageTheNight2 from "./Techs/Audio/RageTheNight2/RageTheNight2";
import BlueDanube1 from "./Techs/Audio/BlueDanube1/BlueDanube1";
import BlueDanube2 from "./Techs/Audio/BlueDanube2/BlueDanube2";
import BlueDanube3 from "./Techs/Audio/BlueDanube3/BlueDanube3";

import MouseBallMove from "./Techs/Animations/MouseBallMove/MouseBallMove";

import Snowfall from "./Techs/Clone/Snowfall/Snowfall";

import Meteo from "./Techs/Animations/Meteo/Meteo1/Meteo1";
import MeteoCircle from "./Techs/Animations/Meteo/MeteoCircle/MeteoCircle";

import BallsGradient from "./Techs/Animations/Balls/BallsGradient/BallsGradient";
import BallsBounce1 from "./Techs/Animations/Balls/BallsBounce1/BallsBounce1";
import BallsBounce2 from "./Techs/Animations/Balls/BallsBounce2/BallsBounce2";
import BallsBounce3 from "./Techs/Animations/Balls/BallsBounce3/BallsBounce3";
import BallsConverge from "./Techs/Animations/Balls/BallsConverge/BallsConverge";

import MapBoxTesting from "./Techs/MapBox/MapBoxTesting";

import MapsSunflower from "./Techs/Maps/MapsSunflower/Maps";
import MapsTesting from "./Techs/Maps/MapsTesting/Maps";

import Diamond from "./Techs/Patterns/Diamond/Diamond";
import Diamond2 from "./Techs/Patterns/Diamond2/Diamond2";
import Vapor from "./Techs/Patterns/Vapor/Vapor";
import Vapor2 from "./Techs/Patterns/Vapor2/Vapor2";
import Movement from "./Techs/Patterns/Movement/Movement";
import Movement2 from "./Techs/Patterns/Movement2/Movement2";
import TestingCentre from "./Techs/Patterns/TestingCentre/TestingCentre";

import SingaSong from "./Techs/TTS/SingaSong";

import BLT from "./Labs/Black/BLT";
import BOB from "./Labs/Black/BOB";
import WHT from "./Labs/Black/WHT";
import WOB from "./Labs/Black/WOB";

import ArtNoveauRoutes from "./Routes/ArtNoveau";
import FourPillarsRoutes from "./Routes/FourPillars";
import CircleVariantsRoutes from "./Routes/CircleVariants";
import ClementAugustinRoutes from "./Routes/ClementAugustin";
import GridVariantsRoutes from "./Routes/GridVariants";
import ThreeRoutes from "./Routes/Three";
import ShitgaRoutes from "./Routes/Shitga";
import ParticlesRoutes from "./Routes/Particles";
import StraightRoutes from "./Routes/Straight";
import DomestikaTutorialsRoutes from "./Routes/DomestikaTutorials";

import IconsRoutes from "./Routes/PreOccupied/Icons";
import XismRoutes from "./Routes/PreOccupied/Xism";
import ScoringRoutes from "./Routes/PreOccupied/Scoring";
import ButtonsRoutes from "./Routes/PreOccupied/UIStudy";

import LoadingPage from "./Pages/LoadingPage/LoadingPage";

import EliceFace from "./Techs/Face/Elice";

function App() {
  return (
    <ChakraProvider>
      <Router>
        <Suspense fallback={<LoadingPage />}>
          <Routes>
            <Route path="/lobby" element={<MainPage />} />
            <Route path="/archived" element={<ArchivedPage />} />

            <Route path="/area1" element={<Area1 />} />
            <Route path="/area2" element={<Area2 />} />
            <Route path="/area3" element={<Area3 />} />
            <Route path="/area4" element={<Area4 />} />
            <Route path="/area5" element={<Area5 />} />
            <Route path="/area6" element={<Area6 />} />
            <Route path="/areatesting" element={<AreaTesting />} />

            <Route
              path="/radialgradienttesting"
              element={<RadialGradientTesting />}
            />

            <Route path="/uturn" element={<UTurn />} />
            <Route path="/ur1" element={<UR1 />} />
            <Route path="/urscreen" element={<URScreen />} />
            <Route path="/ugrid" element={<UGrid />} />

            <Route path="/tonetesting" element={<ToneTesting />} />

            <Route path="/bounce-music" element={<BounceMusic />} />
            <Route path="/taang" element={<Taang />} />
            <Route path="/question" element={<Question />} />

            <Route path="/text-blink-testing" element={<TextBlinkTesting />} />
            <Route path="/spike" element={<Spike />} />
            <Route path="/writings" element={<Writings />} />

            <Route path="/calculator" element={<Calculator />} />
            <Route path="/clock" element={<Clock />} />
            <Route path="/clock2" element={<Clock2 />} />
            <Route path="/dollar" element={<Dollar />} />

            <Route path="/email" element={<Email />} />

            <Route path="/sixteentesting" element={<SixteenTesting />} />

            <Route path="/square" element={<Square />} />
            <Route path="/square2" element={<Square2 />} />
            <Route path="/square3" element={<Square3 />} />
            <Route path="/square4" element={<Square4 />} />
            <Route path="/square5" element={<Square5 />} />
            <Route path="/square6" element={<Square6 />} />
            <Route path="/square7" element={<Square7 />} />
            <Route path="/square8" element={<Square8 />} />
            <Route path="/square9" element={<Square9 />} />
            <Route path="/square10" element={<Square10 />} />
            <Route path="/square11" element={<Square11 />} />
            <Route path="/square12" element={<Square12 />} />
            <Route path="/square13" element={<Square13 />} />
            <Route path="/square14" element={<Square14 />} />

            <Route path="/persian" element={<Persian />} />
            <Route path="/persian2" element={<Persian2 />} />

            <Route path="/depth" element={<Depth />} />
            <Route path="/depth2" element={<Depth2 />} />
            <Route path="/depth3" element={<Depth3 />} />
            <Route path="/depth4" element={<Depth4 />} />

            <Route path="/facade1" element={<Facade1 />} />
            <Route path="/facade2" element={<Facade2 />} />
            <Route path="/pompidou" element={<Pompidou />} />

            <Route path="/smudge" element={<Smudge />} />

            <Route path="/243" element={<TFT />} />
            <Route path="/242" element={<TwoFourtyTwo />} />
            <Route path="/241" element={<TFO />} />
            <Route path="/991" element={<NineNintyOne />} />
            <Route path="/773" element={<SevenSeventyThree />} />

            <Route path="/neontesting" element={<NeonTesting />} />
            <Route path="/neon" element={<Neon />} />
            <Route path="/neon2" element={<Neon2 />} />
            <Route path="/neon3" element={<Neon3 />} />
            <Route path="/neon4" element={<Neon4 />} />
            <Route path="/neon5" element={<Neon5 />} />
            <Route path="/zizzic" element={<Zizzic />} />
            <Route path="/monet" element={<Monet />} />
            <Route path="/quotes" element={<Quotes />} />
            <Route path="/rotate-permanent" element={<Circus />} />

            <Route path="/rose-selavy" element={<RoseSelavy />} />
            <Route path="/words1" element={<Words1 />} />
            <Route path="/words2" element={<Words2 />} />
            <Route path="/orchestra" element={<Orchestra />} />
            <Route path="/pipeorgan" element={<PipeOrgan />} />
            <Route path="/textspread" element={<TextSpread />} />
            <Route path="/wordstesting" element={<WordsTesting />} />

            <Route path="/linestesting" element={<LinesTesting />} />

            <Route
              path="/elevatorwaitingtesting"
              element={<ElevatorWaitingTesting />}
            />
            <Route path="/hopetesting" element={<HopeTesting />} />

            <Route path="/monochrome1" element={<Monochrome1 />} />
            <Route path="/monochrome2" element={<Monochrome2 />} />
            <Route path="/monochrome3" element={<Monochrome3 />} />
            <Route path="/monochrome4" element={<Monochrome4 />} />
            <Route path="/monochrometesting" element={<MonochromeTesting />} />

            <Route path="/waattesting" element={<WaatTesting />} />

            <Route
              path="/device-motion-testing"
              element={<DeviceMotionTesting />}
            />
            <Route
              path="/device-motion-panel"
              element={<DeviceMotionPanel />}
            />

            <Route path="/building" element={<Building />} />

            <Route path="/instagrammable" element={<Instagrammable />} />

            <Route path="/division" element={<Division />} />

            <Route path="/sasektesting" element={<SasekTesting />} />
            <Route path="/functionstesting" element={<FunctionsTesting />} />
            <Route path="/pow3" element={<Pow3 />} />
            <Route path="/tan" element={<Tan />} />
            <Route path="/tanh" element={<TanH />} />

            <Route path="/rainbow" element={<Rainbow />} />

            <Route path="/leveltesting" element={<LevelTesting />} />

            <Route path="/lsd" element={<Lsd />} />
            <Route path="/nightsky" element={<Nightsky />} />
            <Route path="/verticals" element={<Verticals />} />
            <Route path="/emergence" element={<Emergence />} />

            <Route path="/audiotesting" element={<AudioTesting />} />
            <Route path="/audiodefault" element={<AudioDefault />} />
            <Route path="/ragethenight" element={<RageTheNight />} />
            <Route path="/ragethenight2" element={<RageTheNight2 />} />
            <Route path="/bluedanube1" element={<BlueDanube1 />} />
            <Route path="/bluedanube2" element={<BlueDanube2 />} />
            <Route path="/bluedanube3" element={<BlueDanube3 />} />

            <Route path="/mouseballmove" element={<MouseBallMove />} />
            <Route path="/meteo" element={<Meteo />} />
            <Route path="/meteocircle" element={<MeteoCircle />} />

            <Route path="/ballsgradient" element={<BallsGradient />} />
            <Route path="/ballsbounce1" element={<BallsBounce1 />} />
            <Route path="/ballsbounce2" element={<BallsBounce2 />} />
            <Route path="/ballsbounce3" element={<BallsBounce3 />} />
            <Route path="/ballsconverge" element={<BallsConverge />} />

            <Route path="/color1" element={<Color1 />} />

            <Route path="/texture1" element={<Texture1 />} />
            <Route path="/texture2" element={<Texture2 />} />
            <Route path="/texture3" element={<Texture3 />} />
            <Route path="/texture4" element={<Texture4 />} />
            <Route path="/texture5" element={<Texture5 />} />
            <Route path="/texturetesting" element={<TextureTesting />} />

            <Route path="/largeTexture1" element={<LargeTexture1 />} />

            <Route path="/largeTexture2" element={<LargeTexture2 />} />
            <Route
              path="/largetexturetesting"
              element={<LargeTextureTesting />}
            />

            <Route path="/elevator" element={<Elevator />} />
            <Route path="/elevatorcircular" element={<ElevatorCircular />} />
            <Route
              path="/elevatorrectangular"
              element={<ElevatorRectangular />}
            />
            <Route path="/parkinglot" element={<ParkingLot />} />

            <Route
              path="/towardsdivergencetesting"
              element={<TowardsDivergenceTesting />}
            />

            <Route path="/chandelier1" element={<Chandelier1 />} />
            <Route path="/chandelier2" element={<Chandelier2 />} />
            <Route path="/chandelier3" element={<Chandelier3 />} />

            <Route
              path="/datacirclestesting"
              element={<DataCirclesTesting />}
            />

            <Route path="/nineone1" element={<NineOne1 />} />

            <Route path="/verticaltesting" element={<VerticalTesting />} />
            <Route path="/vertical1" element={<Vertical1 />} />
            <Route path="/vertical2" element={<Vertical2 />} />
            <Route path="/vertical3" element={<Vertical3 />} />

            <Route
              path="/quadriptychtesting"
              element={<QuadriptychTesting />}
            />

            <Route path="/cities" element={<Cities />} />
            <Route path="/quadrisquare12" element={<QuadriSquare12 />} />

            <Route
              path="/whitemonumentstest"
              element={<WhiteMonumentsTest />}
            />
            <Route path="/whitemonuments1" element={<WhiteMonuments1 />} />
            <Route path="/whitemonuments2" element={<WhiteMonuments2 />} />
            <Route path="/whitemonuments3" element={<WhiteMonuments3 />} />
            <Route path="/whitemonuments4" element={<WhiteMonuments4 />} />
            <Route path="/whitemonuments5" element={<WhiteMonuments5 />} />
            <Route path="/whitemonuments6" element={<WhiteMonuments6 />} />
            <Route path="/whitemonuments7" element={<WhiteMonuments7 />} />
            <Route path="/whitemonuments8" element={<WhiteMonuments8 />} />
            <Route path="/whitemonuments9" element={<WhiteMonuments9 />} />
            <Route path="/whitemonuments10" element={<WhiteMonuments10 />} />
            <Route path="/whitemonuments11" element={<WhiteMonuments11 />} />
            <Route path="/whitemonuments12" element={<WhiteMonuments12 />} />
            <Route path="/whitemonuments13" element={<WhiteMonuments13 />} />

            <Route path="/mapboxtesting" element={<MapBoxTesting />} />
            <Route path="/mapssunflower" element={<MapsSunflower />} />
            <Route path="/mapstesting" element={<MapsTesting />} />

            <Route path="/diamond" element={<Diamond />} />
            <Route path="/diamond2" element={<Diamond2 />} />
            <Route path="/vapor" element={<Vapor />} />
            <Route path="/vapor2" element={<Vapor2 />} />
            <Route path="/movement" element={<Movement />} />
            <Route path="/movement2" element={<Movement2 />} />
            <Route path="/patternstestingcentre" element={<TestingCentre />} />

            <Route path="/singasong" element={<SingaSong />} />
            <Route path="/snowfall" element={<Snowfall />} />

            <Route path="/blt" element={<BLT />} />
            <Route path="/bob" element={<BOB />} />
            <Route path="/wht" element={<WHT />} />
            <Route path="/wob" element={<WOB />} />

            <Route path="/elice-face" element={<EliceFace />} />

            {FourPillarsRoutes.map((route: any, i: any) => (
              <Route key={i} path={route.path} element={<route.component />} />
            ))}
            {CircleVariantsRoutes.map((route: any, i: any) => (
              <Route key={i} path={route.path} element={<route.component />} />
            ))}
            {ClementAugustinRoutes.map((route: any, i: any) => (
              <Route key={i} path={route.path} element={<route.component />} />
            ))}
            {GridVariantsRoutes.map((route: any, i: any) => (
              <Route key={i} path={route.path} element={<route.component />} />
            ))}
            {ThreeRoutes.map((route: any, i: any) => (
              <Route
                key={i}
                path={`/three${route.path}`}
                element={<route.component />}
              />
            ))}
            {ArtNoveauRoutes.map((route: any, i: any) => (
              <Route key={i} path={route.path} element={<route.component />} />
            ))}
            {ShitgaRoutes.map((route: any, i: any) => (
              <Route key={i} path={route.path} element={<route.component />} />
            ))}
            {ParticlesRoutes.map((route: any, i: any) => (
              <Route key={i} path={route.path} element={<route.component />} />
            ))}
            {StraightRoutes.map((route: any, i: any) => (
              <Route key={i} path={route.path} element={<route.component />} />
            ))}
            {DomestikaTutorialsRoutes.map((route: any, i: any) => (
              <Route
                key={i}
                path={`/domestika${route.path}`}
                element={<route.component />}
              />
            ))}

            {IconsRoutes.map((route: any, i: any) => (
              <Route
                key={i}
                path={`${route.path}`}
                element={<route.component />}
              />
            ))}

            {XismRoutes.map((route: any, i: any) => (
              <Route
                key={i}
                path={`${route.path}`}
                element={<route.component />}
              />
            ))}
            {ScoringRoutes.map((route: any, i: any) => (
              <Route
                key={i}
                path={`${route.path}`}
                element={<route.component />}
              />
            ))}
            {ButtonsRoutes.map((route: any, i: any) => (
              <Route
                key={i}
                path={`${route.path}`}
                element={<route.component />}
              />
            ))}
            <Route path="*" element={<Navigate to="/shitga" replace />} />
          </Routes>
        </Suspense>
      </Router>
    </ChakraProvider>
  );
}

export default App;
