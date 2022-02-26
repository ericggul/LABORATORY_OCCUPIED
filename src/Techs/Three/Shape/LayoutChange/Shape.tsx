import * as S from "./styles";
import * as THREE from "three";
import * as Tone from "tone";
import {
  useRef,
  useMemo,
  Suspense,
  useState,
  useCallback,
  useEffect,
} from "react";
import { Canvas, useThree, useFrame } from "@react-three/fiber";
import {
  Instances,
  Instance,
  Environment,
  ContactShadows,
  OrbitControls,
  Sky,
  Stars,
  Cloud,
} from "@react-three/drei";
import ThreePointVis from "./ThreePointVis";
import { useSpring, animated, config } from "@react-spring/three";
import { Controls, useControl } from "react-three-gui";

const data = new Array(100000).fill(0).map((d, id) => ({ id }));

export default function Shape() {
  const [layout, setLayout] = useState("grid");
  const [selectedPoint, setSelectedPoint] = useState<any>(null);

  return (
    <S.App>
      <S.VisContainer>
        <ThreePointVis
          data={data}
          layout={layout}
          selectedPoint={selectedPoint}
          onPointSelect={setSelectedPoint}
        />
      </S.VisContainer>
      <S.Controls>
        <S.Row>
          <S.Button
            selected={layout === "grid"}
            onClick={() => setLayout("grid")}
          >
            Grid
          </S.Button>
          <S.Button
            selected={layout === "spiral"}
            onClick={() => setLayout("spiral")}
          >
            Spiral
          </S.Button>
        </S.Row>
        <S.Row>
          {selectedPoint && (
            <S.PointText>
              <strong>{`${selectedPoint.id}th `}</strong>
              {` point selected`}
            </S.PointText>
          )}
        </S.Row>
      </S.Controls>
    </S.App>
  );
}
