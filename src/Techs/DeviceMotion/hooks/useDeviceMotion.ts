import { useEffect, useState } from "react";

export default function useDeviceMotion({ handlePermissionState }: any) {
  const [permission, setPermission] = useState(false);
  const [acc, setAcc] = useState({
    x: 0,
    y: 0,
    rotation: 0,
    frontToBack: 0,
    leftToRight: 0,
  });

  function motionDetector(e: any) {
    setAcc({
      x: e.acceleration.x,
      y: e.acceleration.y,
      rotation: e.rotationRate.alpha,
      frontToBack: e.rotationRate.beta,
      leftToRight: e.rotationRate.gamma,
    });
  }

  useEffect(() => {
    if (handlePermissionState) {
      permissionGrant();
    }
  }, [handlePermissionState]);

  function permissionGrant() {
    (DeviceMotionEvent as any)
      .requestPermission()
      .then((res: any) => {
        alert(res);
        if (res === "granted") {
          setPermission(true);
          alert("true");
        }
      })
      .catch((err: any) => console.log(err));
  }

  useEffect(() => {
    if (permission) {
      window.addEventListener("devicemotion", motionDetector);
      return () => {
        window.removeEventListener("devicemotion", motionDetector);
      };
    }
  }, [permission]);

  return { permission, acc };
}
