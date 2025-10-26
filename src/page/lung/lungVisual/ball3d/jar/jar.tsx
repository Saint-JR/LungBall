import { CuboidCollider, RigidBody } from "@react-three/rapier";
import { memo, useMemo } from "react";
import * as THREE from "three";

interface JarProps {
  radius?: number; // 宽度的一半
  height?: number;
  wallThickness?: number;
  position?: [number, number, number]; // 罐子中心坐标
  color?: THREE.ColorRepresentation;
}

type Triplet = [number, number, number]; // 三元组

const Jar = memo((props: JarProps) => {
  const {
    radius = 3,
    height = 8,
    wallThickness = 0.2,
    position = [0, 0, 0] as Triplet,
    color = "#ffffff",
  } = props;

  /* 可见的透明玻璃盒（不参与物理） */
  const boxGeo = useMemo(
    () => new THREE.BoxGeometry(radius * 2, height, radius * 2),
    [radius, height]
  );

  /* ========= 2. 物理碰撞体 ========= */
  const halfWall = useMemo(() => wallThickness / 2, [wallThickness]);
  const halfH = useMemo(() => height / 2, [height]);
  const meshPosition = useMemo(
    () => [position[0], position[1] + halfH, position[2]] as Triplet,
    [position, halfH]
  );

  return (
    <>
      {/* visible glass */}
      <mesh geometry={boxGeo} position={meshPosition} renderOrder={1}>
        <meshStandardMaterial
          color={color}
          transparent
          opacity={0.2}
          side={THREE.DoubleSide}
          depthWrite={false}
        />
      </mesh>
      {/* RigidBody + explicit colliders */}
      <RigidBody type="fixed" position={meshPosition} colliders={false}>
        {/* Bottom */}
        <CuboidCollider
          args={[radius, halfWall, radius]} // halfExtents
          position={[0, -halfH - halfWall, 0]}
        />
        {/* +X wall */}
        <CuboidCollider
          args={[halfWall, halfH, radius]}
          position={[radius - halfWall, 0, 0]}
        />
        {/* -X wall */}
        <CuboidCollider
          args={[halfWall, halfH, radius]}
          position={[-radius + halfWall, 0, 0]}
        />
        {/* +Z wall */}
        <CuboidCollider
          args={[halfWall, halfH, radius]}
          position={[0, 0, radius - halfWall]}
          rotation={[0, Math.PI / 2, 0]}
        />
        {/* -Z wall */}
        <CuboidCollider
          args={[halfWall, halfH, radius]}
          position={[0, 0, -radius + halfWall]}
          rotation={[0, Math.PI / 2, 0]}
        />
      </RigidBody>
    </>
  );
});

export default Jar;
