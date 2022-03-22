import React from "react";
import "./App.css";
import style from "./App.module.scss";
import {
  Route,
  Switch,
  Redirect,
  BrowserRouter as Router,
} from "react-router-dom";

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

import ComponentsTesting from "./Labs/Components/ComponentsTesting/Components";

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
import Color2 from "./Labs/Beta/Color2/Color2";

import LevelTesting from "./Labs/Levels/LevelTesting/Level";

import Elevator from "./Labs/Elevator/Elevator1/Elevator";
import ElevatorRectangular from "./Labs/Elevator/ElevatorRectangular/Elevator";
import ElevatorCircular from "./Labs/Elevator/ElevatorCircular/Elevator";
import ParkingLot from "./Labs/Elevator/ParkingLot/Parking";
import TowardsDivergenceTesting from "./Labs/TowardsDivergence/TowardsDivergenceTesting/TowardsDivergence";

import CircleColorTesting from "./Labs/Circles/CircleColor/CircleColorTesting/CircleColor";
import CircleColor2 from "./Labs/Circles/CircleColor/CircleColor2/CircleColor2";
import CircleColor3 from "./Labs/Circles/CircleColor/CircleColor3/CircleColor3";
import CircleColor4 from "./Labs/Circles/CircleColor/CircleColor4/CircleColor4";
import CircleRotate from "./Labs/Circles/CircleRotate/CircleRotate";

import CircleGrid1 from "./Labs/Circles/CircleGrid1/CircleGrid1";
import CircleGrid2 from "./Labs/Circles/CircleGrid2/CircleGrid2";
import CircleGrid3 from "./Labs/Circles/CircleGrid3/CircleGrid3";
import CircleGrid4 from "./Labs/Circles/CircleGrid4/CircleGrid4";

import Chandelier1 from "./Labs/Circles/Chandelier/Chandelier1/Chandelier1";
import Chandelier2 from "./Labs/Circles/Chandelier/Chandelier2/Chandelier2";
import Chandelier3 from "./Labs/Circles/Chandelier/Chandelier3/Chandelier3";

import CircleTesting from "./Labs/Circles/CircleTesting/CircleTesting";
import Circle1 from "./Labs/Circles/Circle1/Circle1";
import Circle2 from "./Labs/Circles/Circle2/Circle2";
import Circle3 from "./Labs/Circles/Circle3/Circle3";
import Circle4 from "./Labs/Circles/Circle4/Circle4";
import Circle5 from "./Labs/Circles/Circle5/Circle5";
import Circle6 from "./Labs/Circles/Circle6/Circle6";
import Circle7 from "./Labs/Circles/Circle7/Circle7";
import Circle8 from "./Labs/Circles/Circle8/Circle8";
import Circle9 from "./Labs/Circles/Circle9/Circle9";
import Circle10 from "./Labs/Circles/Circle10/Circle10";
import Circle11 from "./Labs/Circles/Circle11/Circle11";

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
import FaceRec from "./Techs/Face/FaceRec/FaceRec";

import DeviceMotionTesting from "./Techs/DeviceMotion/DeviceMotionTesting";

import UTurn from "./Labs/U/UTurn/UTurn";
import UR1 from "./Labs/U/UR1/UR1";
import URScreen from "./Labs/U/URScreen/URScreen";
import UGrid from "./Labs/U/UGrid/UGrid";

import Lsd from "./Techs/Animations/Lsd/Lsd";
import Nightsky from "./Techs/Animations/Nightsky/Nightsky";
import Verticals from "./Techs/Animations/Verticals/Verticals";
import Emergence from "./Techs/Animations/Emergence/Emergence";

import AudioTesting from "./Techs/Audio/AudioTesting/AudioTesting";
import AudioDefault from "./Techs/Audio/AudioDefault/AudioDefault";
import RageTheNight from "./Techs/Audio/RageTheNight/RageTheNight";
import RageTheNight2 from "./Techs/Audio/RageTheNight2/RageTheNight2";
import BlueDanube1 from "./Techs/Audio/BlueDanube1/BlueDanube1";
import BlueDanube2 from "./Techs/Audio/BlueDanube2/BlueDanube2";
import BlueDanube3 from "./Techs/Audio/BlueDanube3/BlueDanube3";

import WaveTesting from "./Techs/Animations/Wave/WaveTesting/WaveTesting";

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
import ShadersTutorial from "./Techs/Shaders/ShadersTutorial";

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

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/lobby" component={MainPage} />
        <Route exact path="/archived" component={ArchivedPage} />

        <Route exact path="/area1" component={Area1} />
        <Route exact path="/area2" component={Area2} />
        <Route exact path="/area3" component={Area3} />
        <Route exact path="/area4" component={Area4} />
        <Route exact path="/area5" component={Area5} />
        <Route exact path="/area6" component={Area6} />
        <Route exact path="/areatesting" component={AreaTesting} />

        <Route
          exact
          path="/radialgradienttesting"
          component={RadialGradientTesting}
        />

        <Route exact path="/uturn" component={UTurn} />
        <Route exact path="/ur1" component={UR1} />
        <Route exact path="/urscreen" component={URScreen} />
        <Route exact path="/ugrid" component={UGrid} />

        <Route exact path="/tonetesting" component={ToneTesting} />

        <Route exact path="/bounce-music" component={BounceMusic} />

        <Route exact path="/text-blink-testing" component={TextBlinkTesting} />
        <Route exact path="/spike" component={Spike} />
        <Route exact path="/writings" component={Writings} />

        <Route exact path="/calculator" component={Calculator} />
        <Route exact path="/clock" component={Clock} />
        <Route exact path="/clock2" component={Clock2} />
        <Route exact path="/dollar" component={Dollar} />

        <Route exact path="/email" component={Email} />

        <Route exact path="/sixteentesting" component={SixteenTesting} />

        <Route exact path="/square" component={Square} />
        <Route exact path="/square2" component={Square2} />
        <Route exact path="/square3" component={Square3} />
        <Route exact path="/square4" component={Square4} />
        <Route exact path="/square5" component={Square5} />
        <Route exact path="/square6" component={Square6} />
        <Route exact path="/square7" component={Square7} />
        <Route exact path="/square8" component={Square8} />
        <Route exact path="/square9" component={Square9} />
        <Route exact path="/square10" component={Square10} />
        <Route exact path="/square11" component={Square11} />
        <Route exact path="/square12" component={Square12} />
        <Route exact path="/square13" component={Square13} />
        <Route exact path="/square14" component={Square14} />

        <Route exact path="/persian" component={Persian} />
        <Route exact path="/persian2" component={Persian2} />

        <Route exact path="/depth" component={Depth} />
        <Route exact path="/depth2" component={Depth2} />
        <Route exact path="/depth3" component={Depth3} />
        <Route exact path="/depth4" component={Depth4} />

        <Route exact path="/componentsTesting" component={ComponentsTesting} />

        <Route exact path="/facade1" component={Facade1} />
        <Route exact path="/facade2" component={Facade2} />
        <Route exact path="/pompidou" component={Pompidou} />

        <Route exact path="/smudge" component={Smudge} />

        <Route exact path="/243" component={TFT} />
        <Route exact path="/242" component={TwoFourtyTwo} />
        <Route exact path="/241" component={TFO} />
        <Route exact path="/991" component={NineNintyOne} />
        <Route exact path="/773" component={SevenSeventyThree} />

        <Route exact path="/neontesting" component={NeonTesting} />
        <Route exact path="/neon" component={Neon} />
        <Route exact path="/neon2" component={Neon2} />
        <Route exact path="/neon3" component={Neon3} />
        <Route exact path="/neon4" component={Neon4} />
        <Route exact path="/neon5" component={Neon5} />
        <Route exact path="/zizzic" component={Zizzic} />
        <Route exact path="/monet" component={Monet} />
        <Route exact path="/quotes" component={Quotes} />
        <Route exact path="/rotate-permanent" component={Circus} />

        <Route exact path="/rose-selavy" component={RoseSelavy} />
        <Route exact path="/words1" component={Words1} />
        <Route exact path="/words2" component={Words2} />
        <Route exact path="/orchestra" component={Orchestra} />
        <Route exact path="/pipeorgan" component={PipeOrgan} />
        <Route exact path="/textspread" component={TextSpread} />
        <Route exact path="/wordstesting" component={WordsTesting} />

        <Route exact path="/linestesting" component={LinesTesting} />

        <Route exact path="/monochrome1" component={Monochrome1} />
        <Route exact path="/monochrome2" component={Monochrome2} />
        <Route exact path="/monochrome3" component={Monochrome3} />
        <Route exact path="/monochrome4" component={Monochrome4} />
        <Route exact path="/monochrometesting" component={MonochromeTesting} />

        <Route exact path="/facerec" component={FaceRec} />

        <Route
          exact
          path="/device-motion-testing"
          component={DeviceMotionTesting}
        />

        <Route exact path="/building" component={Building} />

        <Route exact path="/instagrammable" component={Instagrammable} />

        <Route exact path="/division" component={Division} />

        <Route exact path="/sasektesting" component={SasekTesting} />
        <Route exact path="/functionstesting" component={FunctionsTesting} />
        <Route exact path="/pow3" component={Pow3} />
        <Route exact path="/tan" component={Tan} />
        <Route exact path="/tanh" component={TanH} />

        <Route exact path="/rainbow" component={Rainbow} />

        <Route exact path="/leveltesting" component={LevelTesting} />

        <Route exact path="/lsd" component={Lsd} />
        <Route exact path="/nightsky" component={Nightsky} />
        <Route exact path="/verticals" component={Verticals} />
        <Route exact path="/emergence" component={Emergence} />

        <Route exact path="/audiotesting" component={AudioTesting} />
        <Route exact path="/audiodefault" component={AudioDefault} />
        <Route exact path="/ragethenight" component={RageTheNight} />
        <Route exact path="/ragethenight2" component={RageTheNight2} />
        <Route exact path="/bluedanube1" component={BlueDanube1} />
        <Route exact path="/bluedanube2" component={BlueDanube2} />
        <Route exact path="/bluedanube3" component={BlueDanube3} />

        <Route exact path="/wavetesting" component={WaveTesting} />
        <Route exact path="/mouseballmove" component={MouseBallMove} />
        <Route exact path="/meteo" component={Meteo} />
        <Route exact path="/meteocircle" component={MeteoCircle} />

        <Route exact path="/ballsgradient" component={BallsGradient} />
        <Route exact path="/ballsbounce1" component={BallsBounce1} />
        <Route exact path="/ballsbounce2" component={BallsBounce2} />
        <Route exact path="/ballsbounce3" component={BallsBounce3} />
        <Route exact path="/ballsconverge" component={BallsConverge} />

        <Route exact path="/color1" component={Color1} />
        <Route exact path="/color2" component={Color2} />

        <Route exact path="/texture1" component={Texture1} />
        <Route exact path="/texture2" component={Texture2} />
        <Route exact path="/texture3" component={Texture3} />
        <Route exact path="/texture4" component={Texture4} />
        <Route exact path="/texture5" component={Texture5} />
        <Route exact path="/texturetesting" component={TextureTesting} />

        <Route exact path="/largeTexture1" component={LargeTexture1} />

        <Route exact path="/largeTexture2" component={LargeTexture2} />
        <Route
          exact
          path="/largetexturetesting"
          component={LargeTextureTesting}
        />

        <Route exact path="/elevator" component={Elevator} />
        <Route exact path="/elevatorcircular" component={ElevatorCircular} />
        <Route
          exact
          path="/elevatorrectangular"
          component={ElevatorRectangular}
        />
        <Route exact path="/parkinglot" component={ParkingLot} />

        <Route
          exact
          path="/towardsdivergencetesting"
          component={TowardsDivergenceTesting}
        />

        <Route exact path="/circlecolortest" component={CircleColorTesting} />
        <Route exact path="/circlecolor2" component={CircleColor2} />
        <Route exact path="/circlecolor3" component={CircleColor3} />
        <Route exact path="/circlecolor4" component={CircleColor4} />
        <Route exact path="/circlerotate" component={CircleRotate} />

        <Route exact path="/circlegrid1" component={CircleGrid1} />
        <Route exact path="/circlegrid2" component={CircleGrid2} />
        <Route exact path="/circlegrid3" component={CircleGrid3} />
        <Route exact path="/circlegrid4" component={CircleGrid4} />

        <Route exact path="/chandelier1" component={Chandelier1} />
        <Route exact path="/chandelier2" component={Chandelier2} />
        <Route exact path="/chandelier3" component={Chandelier3} />

        <Route
          exact
          path="/datacirclestesting"
          component={DataCirclesTesting}
        />

        <Route exact path="/circletesting" component={CircleTesting} />
        <Route exact path="/circle1" component={Circle1} />
        <Route exact path="/circle2" component={Circle2} />
        <Route exact path="/circle3" component={Circle3} />
        <Route exact path="/circle4" component={Circle4} />
        <Route exact path="/circle5" component={Circle5} />
        <Route exact path="/circle6" component={Circle6} />
        <Route exact path="/circle7" component={Circle7} />
        <Route exact path="/circle8" component={Circle8} />
        <Route exact path="/circle9" component={Circle9} />
        <Route exact path="/circle10" component={Circle10} />
        <Route exact path="/circle11" component={Circle11} />

        <Route exact path="/nineone1" component={NineOne1} />

        <Route exact path="/verticaltesting" component={VerticalTesting} />
        <Route exact path="/vertical1" component={Vertical1} />
        <Route exact path="/vertical2" component={Vertical2} />
        <Route exact path="/vertical3" component={Vertical3} />

        <Route
          exact
          path="/quadriptychtesting"
          component={QuadriptychTesting}
        />

        <Route exact path="/cities" component={Cities} />
        <Route exact path="/quadrisquare12" component={QuadriSquare12} />

        <Route
          exact
          path="/whitemonumentstest"
          component={WhiteMonumentsTest}
        />
        <Route exact path="/whitemonuments1" component={WhiteMonuments1} />
        <Route exact path="/whitemonuments2" component={WhiteMonuments2} />
        <Route exact path="/whitemonuments3" component={WhiteMonuments3} />
        <Route exact path="/whitemonuments4" component={WhiteMonuments4} />
        <Route exact path="/whitemonuments5" component={WhiteMonuments5} />
        <Route exact path="/whitemonuments6" component={WhiteMonuments6} />
        <Route exact path="/whitemonuments7" component={WhiteMonuments7} />
        <Route exact path="/whitemonuments8" component={WhiteMonuments8} />
        <Route exact path="/whitemonuments9" component={WhiteMonuments9} />
        <Route exact path="/whitemonuments10" component={WhiteMonuments10} />
        <Route exact path="/whitemonuments11" component={WhiteMonuments11} />
        <Route exact path="/whitemonuments12" component={WhiteMonuments12} />
        <Route exact path="/whitemonuments13" component={WhiteMonuments13} />

        <Route exact path="/mapboxtesting" component={MapBoxTesting} />
        <Route exact path="/mapssunflower" component={MapsSunflower} />
        <Route exact path="/mapstesting" component={MapsTesting} />

        <Route exact path="/diamond" component={Diamond} />
        <Route exact path="/diamond2" component={Diamond2} />
        <Route exact path="/vapor" component={Vapor} />
        <Route exact path="/vapor2" component={Vapor2} />
        <Route exact path="/movement" component={Movement} />
        <Route exact path="/movement2" component={Movement2} />
        <Route exact path="/patternstestingcentre" component={TestingCentre} />

        <Route exact path="/singasong" component={SingaSong} />
        <Route exact path="/shaderstutorial" component={ShadersTutorial} />

        <Route exact path="/snowfall" component={Snowfall} />

        {FourPillarsRoutes.map((route: any, i: any) => (
          <Route exact key={i} path={route.path} component={route.component} />
        ))}
        {CircleVariantsRoutes.map((route: any, i: any) => (
          <Route exact key={i} path={route.path} component={route.component} />
        ))}
        {ClementAugustinRoutes.map((route: any, i: any) => (
          <Route exact key={i} path={route.path} component={route.component} />
        ))}
        {GridVariantsRoutes.map((route: any, i: any) => (
          <Route exact key={i} path={route.path} component={route.component} />
        ))}
        {ThreeRoutes.map((route: any, i: any) => (
          <Route
            exact
            key={i}
            path={`/three${route.path}`}
            component={route.component}
          />
        ))}
        {ArtNoveauRoutes.map((route: any, i: any) => (
          <Route exact key={i} path={route.path} component={route.component} />
        ))}
        {ShitgaRoutes.map((route: any, i: any) => (
          <Route exact key={i} path={route.path} component={route.component} />
        ))}
        {ParticlesRoutes.map((route: any, i: any) => (
          <Route exact key={i} path={route.path} component={route.component} />
        ))}
        {StraightRoutes.map((route: any, i: any) => (
          <Route exact key={i} path={route.path} component={route.component} />
        ))}
        {DomestikaTutorialsRoutes.map((route: any, i: any) => (
          <Route
            exact
            key={i}
            path={`/domestika${route.path}`}
            component={route.component}
          />
        ))}
        <Redirect exact to="/lobby" />
      </Switch>
    </Router>
  );
}

export default App;
