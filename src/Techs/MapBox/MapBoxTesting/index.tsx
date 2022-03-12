import * as S from "./styles";
import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import SunCalc from "suncalc";
import BlueDanubeAudio from "../../../assets/BlueDanube.mp3";
import "mapbox-gl/dist/mapbox-gl.css";
import { map } from "@firebase/util";

export default function MapBoxTesting() {
  mapboxgl.accessToken =
    "pk.eyJ1IjoiZXJpY2dndWwiLCJhIjoiY2wwMmkyYTRkMTRhczNobHNsMnBxb3BkMyJ9.DLFELyGRBinEC75rdCGBBQ";
  const mapRef = useRef<any>(!null);
  const mapContainerRef = useRef<any>(!null);

  const [clicked, setClicked] = useState(false);
  const [displayMap, setDisplayMap] = useState(false);
  const [pos, setPos] = useState({ lat: 37.45843, lng: 126.95597 });
  const [zoom, setZoom] = useState(12);

  useEffect(() => {
    if (clicked) {
      setDisplayMap(true);
      const audio: HTMLAudioElement = new Audio(BlueDanubeAudio);
      audio.play();
    }
  }, [clicked]);

  useEffect(() => {
    if (clicked && mapContainerRef && mapContainerRef.current) {
      mapRef.current = new mapboxgl.Map({
        container: mapContainerRef.current,
        center: [pos.lng, pos.lat],
        zoom: zoom,
        pitch: 85,
        bearing: 180,
        style: "mapbox://styles/ericggul/cl0nx2gmt000a14sdee853joe",
      });
      mapRef.current.addControl(new mapboxgl.GeolocateControl());
    }
  }, [clicked, mapContainerRef]);

  useEffect(() => {
    if (mapRef.current && typeof mapRef.current == "object") {
      mapRef.current.on("load", () => {
        //Building
        const layers = mapRef.current.getStyle().layers;
        const labelLayerId = layers.find(
          (layer: any) => layer.type === "symbol" && layer.layout["text-field"]
        ).id;

        mapRef.current.addLayer(
          {
            id: "add-3d-buildings",
            source: "composite",
            "source-layer": "building",
            filter: ["==", "extrude", "true"],
            type: "fill-extrusion",
            minzoom: 15,
            paint: {
              "fill-extrusion-color": "#aaa",
              "fill-extrusion-height": [
                "interpolate",
                ["linear"],
                ["zoom"],
                15,
                0,
                15.05,
                ["get", "height"],
              ],
              "fill-extrusion-base": [
                "interpolate",
                ["linear"],
                ["zoom"],
                15,
                0,
                15.05,
                ["get", "min_height"],
              ],
              "fill-extrusion-opacity": 0.6,
            },
          },
          labelLayerId
        );

        //Get Terrain Data
        mapRef.current.addSource("mapbox-dem", {
          type: "raster-dem",
          url: "mapbox://mapbox.mapbox-terrain-dem-v1",
          tileSize: 512,
          maxzoom: 22,
        });

        mapRef.current.addSource("mapbox-dem2", {
          type: "raster-dem",
          url: "mapbox://mapbox.mapbox-terrain-dem-v1",
          tileSize: 512,
          maxzoom: 22,
        });

        mapRef.current.addLayer({
          id: "hillshading",
          source: "mapbox-dem",
          type: "hillshade",
        });

        //Terrain
        mapRef.current.setTerrain({ source: "mapbox-dem2", exaggeration: 2 });

        //Fog
        mapRef.current.setFog({
          range: [-1, 1.5],
          color: getFog(),
          "horizon-blend": 0.1,
        });

        //Sky
        mapRef.current.addLayer({
          id: "sky",
          type: "sky",
          paint: {
            "sky-opacity": [
              "interpolate",
              ["linear"],
              ["zoom"],
              0,
              0,
              5,
              0.3,
              8,
              1,
            ],
            "sky-type": "atmosphere",
            "sky-atmosphere-halo-color": "rgba(255, 255, 255, 0.5)",
            "sky-atmosphere-sun-intensity": 5,
            "sky-atmosphere-sun": getSunPosition(),
          },
        });
      });

      //Error Handling
      mapRef.current.on("error", (e: any) => {
        if (e && e.error !== "Error: Not Found") {
          console.log(e);
        }
      });

      //React Binding
      mapRef.current.on("move", () => {
        setPos({
          lat: mapRef.current.getCenter().lng.toFixed(5),
          lng: mapRef.current.getCenter().lng.toFixed(5),
        });
        setZoom(mapRef.current.getZoom().toFixed(2));
      });
    }
    mapZoom();
  }, [mapRef, clicked]);

  async function mapZoom() {
    if (mapRef.current && typeof mapRef.current == "object") {
      await mapRef.current.once("idle");
      setDisplayMap(true);
      console.log(pos.lat, pos.lng);
      mapRef.current.flyTo({
        center: [pos.lng, pos.lat],
        zoom: 18,
        bearing: 120,
        speed: 0.7,
        curve: 1,
        easing: (t: any) => t,

        // this animation is considered essential with respect to prefers-reduced-motion
        essential: true,
      });
    }
  }

  const getSunPosition = () => {
    const center = mapRef.current.getCenter();
    const sunPos = SunCalc.getPosition(new Date(), center.lat, center.lng);
    const sunAzimuth = 180 + (sunPos.azimuth * 180) / Math.PI;
    const sunAltitude = 90 - (sunPos.altitude * 180) / Math.PI;
    return [sunAzimuth, sunAltitude];
  };

  const getFog = () => {
    const time = SunCalc.getTimes(new Date(), pos.lat, pos.lng);
    if (new Date() < time.sunrise || new Date() > time.sunset) {
      return "rgb(0, 0, 20)";
    }
    return "white";
  };
  getFog();

  return (
    <S.Container>
      <S.MapContainer ref={mapContainerRef} displayMap={displayMap} />

      {!displayMap && (
        <S.Loading onClick={() => setClicked(true)}>
          {!clicked ? "Click" : "Loading..."}
        </S.Loading>
      )}
    </S.Container>
  );
}
