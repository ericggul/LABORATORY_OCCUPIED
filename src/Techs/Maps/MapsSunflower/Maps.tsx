import * as S from "./styles";

import React, {
  useRef,
  useMemo,
  useCallback,
  Suspense,
  useState,
  useEffect,
} from "react";
import {
  GoogleMap,
  useJsApiLoader,
  DirectionsService,
  DirectionsRenderer,
} from "@react-google-maps/api";
import { GOOGLE_KEY } from "../../../config";

const getLatLngRatio = (origin: any) => {
  return 110.574 / (111.32 * Math.cos((origin.lat * Math.PI) / 180));
};

const Maps = () => {
  const containerStyle = {
    width: "100vw",
    height: "100vh",
  };

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: GOOGLE_KEY,
  });

  const ORIGIN = { lat: 51.40616, lng: 0.01318 };
  const DESTINATION = { lat: 51.50737611675993, lng: -0.12759300000001186 };
  const RATIO = useMemo(() => getLatLngRatio(DESTINATION), []);
  const DISTANCE = useMemo(
    () =>
      Math.sqrt(
        (DESTINATION.lat - ORIGIN.lat) ** 2 +
          ((DESTINATION.lng - ORIGIN.lng) / RATIO) ** 2
      ),
    [RATIO]
  );
  const ANGLE = useMemo(
    () =>
      Math.atan2(
        (DESTINATION.lng - ORIGIN.lng) / RATIO,
        DESTINATION.lat - ORIGIN.lat
      ),
    [RATIO]
  );

  useEffect(() => {
    const CIRCUMFERENCE = [4, 4, 8, 8, 16, 16];
    const RADIUS = [
      DISTANCE * 0.1,
      DISTANCE * 0.2,
      DISTANCE * 0.4,
      DISTANCE * 0.6,
      DISTANCE * 0.8,
      DISTANCE * 1.0,
    ];

    function singleRouting(origin: any, destination: any) {
      return new Promise((resolve) => {
        setTimeout(() => {
          const directionsService = new google.maps.DirectionsService();

          directionsService
            .route({
              origin: origin,
              destination: destination,
              travelMode: google.maps.TravelMode.DRIVING,
            })
            .then((response: any) => {
              if (response.status === "OK") {
                setRouteResponses((array) => [...array, response]);
              } else {
                console.log(response.status);
              }
            });

          resolve("");
        }, 1000);
      });
    }

    function batchRouting(
      delay: number,
      i: number,
      angle: number,
      radius: number,
      circumference: number
    ) {
      return new Promise((resolve) => {
        setTimeout(() => {
          const directionsService = new google.maps.DirectionsService();
          let temp = {
            lat:
              DESTINATION.lat +
              (radius * Math.cos(angle + (i / circumference) * Math.PI * 2)) /
                (1 + RATIO),
            lng:
              DESTINATION.lng +
              radius *
                Math.sin(angle + (i / circumference) * Math.PI * 2) *
                (RATIO / (1 + RATIO)),
          };

          directionsService
            .route({
              origin: DESTINATION,
              destination: temp,
              travelMode: google.maps.TravelMode.DRIVING,
            })
            .then((response: any) => {
              if (response.status === "OK") {
                setRouteResponses((array) => [...array, response]);
              } else {
                console.log(response.status);
              }
            });

          resolve("");
        }, delay);
      });
    }

    singleRouting(ORIGIN, DESTINATION);
    async function execute() {
      for (let r = 0; r < RADIUS.length; r++) {
        for (let i = 0; i < CIRCUMFERENCE[r]; i++) {
          await batchRouting(1000, i, ANGLE, RADIUS[r], CIRCUMFERENCE[r]);
        }
      }
    }

    execute();
  }, []);

  const [routeResponses, setRouteResponses] = useState<any[]>([]);

  const renderMap = () => {
    const onLoad = (mapInstance: any) => {
      console.log("loaded");
      mapInstance.setHeading(ANGLE);
    };

    return (
      <GoogleMap
        onLoad={onLoad}
        mapContainerStyle={containerStyle}
        center={DESTINATION}
        zoom={10}
      >
        {routeResponses.map((res, i) => (
          <DirectionsRenderer options={{ directions: res }} key={i} />
        ))}
      </GoogleMap>
    );
  };

  return isLoaded ? renderMap() : <S.Loading>Loading</S.Loading>;
};

export default Maps;
