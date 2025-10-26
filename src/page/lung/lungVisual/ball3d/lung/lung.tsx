import { CuboidCollider, RigidBody } from "@react-three/rapier";
import { useGLTF } from "@react-three/drei";
import { memo, useMemo } from "react";
import * as THREE from "three";
import lungModel from "@/assets/lungs.glb?url";

type Triplet = [number, number, number]; // 三元组

const scale = 80;
const position = [scale * 0.9, -scale * 1.28, scale * 0] as Triplet;
const collidersPosition = [0, 0, 0] as Triplet;

const Lung = memo(() => {
  // 加载 GLB 模型
  const { scene } = useGLTF(lungModel);

  // 自定义材质
  const customMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#e57373", // 肺部粉红色
        transparent: true,
        opacity: 0.3,
        roughness: 0.6,
        metalness: 0.2,
        side: THREE.DoubleSide,
      }),
    []
  );

  // 应用自定义材质到模型
  const processedScene = useMemo(() => {
    const clonedScene = scene.clone(true);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    clonedScene.traverse((child: any) => {
      if (child.isMesh) {
        child.material = customMaterial;
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
    return clonedScene;
  }, [scene, customMaterial]);

  return (
    <>
      {/* 3D 肺部模型 */}

      <primitive
        object={processedScene}
        position={position}
        scale={scale}
        rotation={[0, 0, 0]}
      />

      {/* visible glass */}
      {/* <mesh geometry={boxGeo} position={meshPosition} renderOrder={1}>
        <meshStandardMaterial
          color={color}
          transparent
          opacity={0.2}
          side={THREE.DoubleSide}
          depthWrite={false}
        />
      </mesh> */}
      {/* RigidBody + explicit colliders */}
      <RigidBody type="fixed" position={collidersPosition} colliders={false}>
        <CuboidCollider
          args={[6, 0.25, 7]}
          position={[-6, 3, -1]}
          rotation={[0, 0, Math.PI / 8]}
        />
        <CuboidCollider args={[0.25, 7, 7]} position={[-1, 12, -1]} />
        <CuboidCollider args={[6, 9, 0.25]} position={[-6, 9, -8]} />
        <CuboidCollider
          args={[6, 12.5, 0.25]}
          position={[-6, 12, 3]}
          rotation={[-Math.PI / 8, 0, 0]}
        />
        <CuboidCollider args={[0.25, 5, 7]} position={[-12, 5, -1]} />
        <CuboidCollider
          args={[0.25, 7, 7]}
          position={[-8, 15, -1]}
          rotation={[0, 0, -Math.PI / 5]}
        />
        <CuboidCollider
          args={[6, 18, 0.5]}
          position={[-10, 9, 1]}
          rotation={[-Math.PI / 12, -Math.PI / 5, -Math.PI / 18]}
        />
        <CuboidCollider
          args={[3.5, 9, 0.25]}
          position={[-10, 9, -5]}
          rotation={[0, Math.PI / 3, 0]}
        />

        {/* ========= Y轴镜像对称（右侧） ========= */}
        <CuboidCollider
          args={[6, 0.25, 7]}
          position={[6, 3, -1]}
          rotation={[0, 0, -Math.PI / 8]}
        />
        <CuboidCollider args={[0.25, 7, 7]} position={[1, 12, -1]} />
        <CuboidCollider args={[6, 9, 0.25]} position={[6, 9, -8]} />
        <CuboidCollider
          args={[6, 12.5, 0.25]}
          position={[6, 12, 3]}
          rotation={[-Math.PI / 8, 0, 0]}
        />
        <CuboidCollider args={[0.25, 5, 7]} position={[12, 5, -1]} />
        <CuboidCollider
          args={[0.25, 7, 7]}
          position={[8, 15, -1]}
          rotation={[0, 0, Math.PI / 5]}
        />
        <CuboidCollider
          args={[6, 18, 0.5]}
          position={[10, 9, 1]}
          rotation={[-Math.PI / 12, Math.PI / 5, Math.PI / 18]}
        />
        <CuboidCollider
          args={[3.5, 9, 0.25]}
          position={[10, 9, -5]}
          rotation={[0, -Math.PI / 3, 0]}
        />

        {/* <mesh position={[-6, 3, -1]} rotation={[0, 0, Math.PI / 8]}>
          <boxGeometry args={[12, 0.5, 14]} />
          <meshBasicMaterial color="#00ff00" transparent opacity={0.3} />
        </mesh>
        <mesh position={[-1, 12, -1]}>
          <boxGeometry args={[0.5, 14, 14]} />
          <meshBasicMaterial color="#ff0000" transparent opacity={0.3} />
        </mesh>
        <mesh position={[-6, 9, -8]}>
          <boxGeometry args={[12, 18, 0.5]} />
          <meshBasicMaterial color="#ffff00" transparent opacity={0.3} />
        </mesh>
        <mesh position={[-6, 12, 3]} rotation={[-Math.PI / 8, 0, 0]}>
          <boxGeometry args={[12, 25, 0.5]} />
          <meshBasicMaterial color="#00ffff" transparent opacity={0.3} />
        </mesh>
        <mesh position={[-12, 5, -1]}>
          <boxGeometry args={[0.5, 10, 14]} />
          <meshBasicMaterial color="#ff00ff" transparent opacity={0.3} />
        </mesh>

        <mesh position={[-8, 15, -1]} rotation={[0, 0, -Math.PI / 5]}>
          <boxGeometry args={[0.5, 14, 14]} />
          <meshBasicMaterial color="#0000ff" transparent opacity={0.3} />
        </mesh>

        <mesh
          position={[-10, 9, 1]}
          rotation={[-Math.PI / 12, -Math.PI / 5, -Math.PI / 18]}
        >
          <boxGeometry args={[6, 18, 0.5]} />
          <meshBasicMaterial color="#aaa" transparent opacity={0.3} />
        </mesh>

        <mesh position={[-10, 9, -5]} rotation={[0, Math.PI / 3, 0]}>
          <boxGeometry args={[7, 18, 0.5]} />
          <meshBasicMaterial color="#a0a" transparent opacity={0.3} />
        </mesh> */}
      </RigidBody>
    </>
  );
});

// 预加载模型，提升性能
useGLTF.preload(lungModel);

export default Lung;
