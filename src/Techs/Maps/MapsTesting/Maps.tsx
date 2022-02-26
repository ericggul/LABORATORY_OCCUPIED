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

  const standardOrigin = { lat: 51.50737611675993, lng: -0.12759300000001186 };
  const latLngRatio = useMemo(() => getLatLngRatio(standardOrigin), []);
  console.log(latLngRatio);
  const [routeRequests, setRouteRequests] = useState<any[]>([]);

  useEffect(() => {
    const CIRCUMFERENCE = [4, 4, 4, 4, 8, 8, 8, 8, 16, 16];
    const RADIUS = [
      0.005, 0.01, 0.02, 0.025, 0.0375, 0.05, 0.075, 0.1, 0.125, 0.15,
    ];

    function batchUpload(
      delay: number,
      i: number,
      radius: number,
      circumference: number
    ) {
      return new Promise((resolve) => {
        setTimeout(() => {
          const directionsService = new google.maps.DirectionsService();
          console.log(i);
          let temp = {
            lat:
              standardOrigin.lat +
              radius * Math.cos((i / circumference) * Math.PI * 2),
            lng:
              standardOrigin.lng +
              radius *
                Math.sin((i / circumference) * Math.PI * 2) *
                latLngRatio,
          };

          directionsService
            .route({
              origin: standardOrigin,
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
          // setRouteRequests([
          //   {
          //     origin: standardOrigin,
          //     destination: temp,
          //   },
          // ]);

          resolve("");
          console.log("resolve");
        }, delay);
      });
    }

    async function execute() {
      for (let r = 0; r < RADIUS.length; r++) {
        for (let i = 0; i < CIRCUMFERENCE[r]; i++) {
          await batchUpload(1000, i, RADIUS[r], CIRCUMFERENCE[r]);
        }
      }
    }

    execute();
  }, []);

  const [routeResponses, setRouteResponses] = useState<any[]>([]);

  // console.log(routeResponses.length);
  const renderMap = () => {
    const onLoad = (mapInstance: any) => {
      console.log("loaded!");
    };

    const routeCallback = (res: any) => {
      if (res !== null) {
        if (res.status === "OK") {
          setRouteResponses((array) => [...array, res]);
        } else {
          console.log(res);
        }
      }
    };

    return (
      <GoogleMap
        onLoad={onLoad}
        mapContainerStyle={containerStyle}
        center={standardOrigin}
        zoom={10}
      >
        {routeRequests.map((req, i) => (
          <DirectionsService
            key={i}
            options={{
              origin: req.origin,
              destination: req.destination,
              travelMode: google.maps.TravelMode.DRIVING,
            }}
            callback={routeCallback}
          />
        ))}
        {routeResponses.map((res, i) => (
          <DirectionsRenderer options={{ directions: res }} key={i} />
        ))}
      </GoogleMap>
    );
  };

  return isLoaded ? renderMap() : <S.Loading>Loading</S.Loading>;
};

export default Maps;
