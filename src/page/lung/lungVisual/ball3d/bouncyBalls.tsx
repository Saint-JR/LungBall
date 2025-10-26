import { Canvas } from "@react-three/fiber";
import { Physics } from "@react-three/rapier";
import { memo } from "react";
import Balls from "./balls/balls";
import Ground from "./ground/ground";
import Lung from "./lung/lung";
import { OrbitControls } from "@react-three/drei";

interface Props {
  ballCount?: number;
  ballRadius?: number;
  gravity?: number;
  cameraPos?: [number, number, number];
  cameraRotation?: [number, number, number];
}

type Triplet = [number, number, number];

// const leftJarPosition = [-6, 0, 0] as Triplet;
// const leftJarSize = {
//   radius: 4,
//   height: 12,
//   wallThickness: 0.2,
// };
const leftBallsSpawnBox = {
  center: [-3, 25, -6] as Triplet,
  size: [1, 0, 3] as Triplet,
};

// const rightJarPosition = [6, 0, 0] as Triplet;
// const rightJarSize = {
//   radius: 4,
//   height: 12,
//   wallThickness: 0.2,
// };
const rightBallsSpawnBox = {
  center: [3, 25, -6] as Triplet,
  size: [1, 0, 3] as Triplet,
};

const BouncyBalls = memo((props: Props) => {
  const {
    ballCount = 400,
    ballRadius = 0.5,
    gravity = -9.81,
    cameraPos = [0, 12, 23],
    cameraRotation = [-0.15, 0, 0],
  } = props;

  return (
    <Canvas camera={{ position: cameraPos, fov: 60, rotation: cameraRotation }}>
      {/* 背景与灯光 */}
      <color attach="background" args={["#eff6ff"]} />
      <ambientLight intensity={0.6} />
      <directionalLight position={[10, 15, 5]} intensity={0.6} />

      <OrbitControls />

      {/* 物理世界 & 场景物体 */}
      <Physics gravity={[0, gravity, 0]}>
        <Ground size={50} color="#eff6ff" />
        <Lung />
        {/* 左罐 */}
        {/* <Jar
          position={leftJarPosition}
          radius={leftJarSize.radius}
          height={leftJarSize.height}
          wallThickness={leftJarSize.wallThickness}
          color="#ffc9c9"
        /> */}
        <Balls
          count={ballCount}
          radius={ballRadius}
          spawnBox={leftBallsSpawnBox}
          color="#10b981"
        />
        {/* 右罐 */}
        {/* <Jar
          position={rightJarPosition}
          radius={rightJarSize.radius}
          height={rightJarSize.height}
          wallThickness={rightJarSize.wallThickness}
          color="#ffc9c9"
        /> */}
        <Balls
          count={ballCount}
          radius={ballRadius}
          spawnBox={rightBallsSpawnBox}
          color="#3b82f6"
        />
      </Physics>
    </Canvas>
  );
});

export default BouncyBalls;
