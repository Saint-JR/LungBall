import { RigidBody } from "@react-three/rapier";
import { memo } from "react";

interface Props {
  size: number;
  color: string;
}

const Ground = memo((props: Props) => {
  const { size = 100, color = "#444" } = props;

  return (
    <RigidBody type="fixed" restitution={0.2}>
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[size, size]} />
        <meshBasicMaterial color={color} />
      </mesh>
    </RigidBody>
  );
});

export default Ground;
