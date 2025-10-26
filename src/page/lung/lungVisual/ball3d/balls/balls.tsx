import {
  InstancedRigidBodies,
  type InstancedRigidBodyProps,
} from "@react-three/rapier";
import { nanoid } from "nanoid";
import { memo, useMemo } from "react";
import * as THREE from "three";

type Triplet = [number, number, number];

interface BallsProps {
  count?: number;
  radius?: number;
  spawnBox: { center: Triplet; size: Triplet }; // 生成区域(盒)
  color?: THREE.ColorRepresentation;
}

const Balls = memo((props: BallsProps) => {
  const { count = 200, radius = 0.3, spawnBox, color = "#06b6d4" } = props;

  /* 生成实例数据 - 从底部开始向上堆叠 */
  const instances: InstancedRigidBodyProps[] = useMemo(() => {
    const arr: InstancedRigidBodyProps[] = [];
    const [cx, cy, cz] = spawnBox.center;
    const [sx, , sz] = spawnBox.size; // 忽略 sy，高度不限制

    // 计算每个维度可以放多少个球（考虑球的半径）
    const spacing = radius * 2.5; // 球之间的间距
    const nx = Math.ceil(sx / spacing);
    const nz = Math.ceil(sz / spacing);

    // 从底部开始，逐层向上堆叠
    let idx = 0;
    let layer = 0;

    while (idx < count) {
      for (let ix = 0; ix < nx && idx < count; ix++) {
        for (let iz = 0; iz < nz && idx < count; iz++) {
          arr.push({
            key: nanoid(5),
            position: [
              cx -
                sx / 2 +
                spacing / 2 +
                ix * spacing +
                (Math.random() - 0.5) * spacing * 0.2,
              cy + layer * spacing + (Math.random() - 0.5) * spacing * 0.2,
              cz -
                sz / 2 +
                spacing / 2 +
                iz * spacing +
                (Math.random() - 0.5) * spacing * 0.2,
            ] as Triplet,
            rotation: [0, 0, 0] as Triplet,
            scale: 1,
          });
          idx++;
        }
      }
      layer++;
    }

    return arr;
  }, [count, spawnBox, radius]);

  return (
    <InstancedRigidBodies
      instances={instances}
      colliders="ball"
      restitution={0.15}
      friction={0.2}
    >
      <instancedMesh args={[undefined, undefined, count]}>
        <sphereGeometry args={[radius, 16, 16]} />
        <meshStandardMaterial color={color} roughness={0.3} metalness={0.1} />
      </instancedMesh>
    </InstancedRigidBodies>
  );
});

export default Balls;
