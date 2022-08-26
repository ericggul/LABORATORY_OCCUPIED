import * as S from "./styles";
import { useEffect, useRef, useState } from "react";
// @ts-ignore
import mapboxgl from "!mapbox-gl"; /* eslint import/no-webpack-loader-syntax: off */

import "mapbox-gl/dist/mapbox-gl.css";
import { map } from "@firebase/util";

import useResize from "../../../hooks/useResize";

//css
import "mapbox-gl/dist/mapbox-gl.css";
import "./mapbox.css";

const POS = { lat: 37.5663, lng: 126.9779 };

const getRandom = (a: number, b: number) => Math.random() * (b - a) + a;

export default function MapBoxTesting() {
  // mapboxgl.workerClass = require('worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker').default;
  mapboxgl.accessToken =
    "pk.eyJ1IjoiZXJpY2dndWwiLCJhIjoiY2wwMmkyYTRkMTRhczNobHNsMnBxb3BkMyJ9.DLFELyGRBinEC75rdCGBBQ";
  const mapRef = useRef<any>(!null);
  const mapContainerRef = useRef<any>(!null);

  const [displayMap, setDisplayMap] = useState(false);
  const [pos, setPos] = useState(POS);
  const [zoom, setZoom] = useState(15);

  useEffect(() => {
    if (mapContainerRef && mapContainerRef.current) {
      mapRef.current = new mapboxgl.Map({
        container: mapContainerRef.current,
        center: [pos.lng, pos.lat],
        zoom: zoom,
        style: "mapbox://styles/ericggul/cl52dy7cu002215qxv7s1joiv",
      });
      setDisplayMap(true);
      return () => {
        mapRef.current.remove();
      };
    }
  }, [mapContainerRef]);

  const [windowWidth, windowHeight] = useResize();
  //Resize Map
  useEffect(() => {
    if (mapRef && mapRef.current) {
      mapRef.current.resize();
    }
  }, [mapRef, windowWidth, windowHeight]);

  useEffect(() => {
    if (mapRef.current && typeof mapRef.current == "object") {
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
  }, [mapRef]);

  //onclick
  useEffect(() => {
    if (mapRef) {
      mapRef.current.on("click", (e: any) => {
        handleClick(e.lngLat);
      });
    }
  }, [mapRef]);

  const handleClick = (pos: any) => {
    //add div element on e mouseclick pos

    const div = document.createElement("div");
    div.className = "marker";
    div.style.width = "100px";
    div.style.height = "100px";
    div.style.borderRadius = "50%";

    let filterString = "";
    // filterString += `brightness(${getRandom(200, 600)}%)`;
    // filterString += ` invert(100%)`;
    // filterString += ` hue-rotate(${getRandom(60, 300)}deg)`;

    //@ts-ignore
    div.style.backdropFilter = filterString;

    new mapboxgl.Marker(div).setLngLat(pos).addTo(mapRef.current);
  };

  return (
    <S.Container>
      <S.MapContainer ref={mapContainerRef} displayMap={displayMap} />

      {!displayMap && <S.Loading>{"Loading..."}</S.Loading>}
    </S.Container>
  );
}
