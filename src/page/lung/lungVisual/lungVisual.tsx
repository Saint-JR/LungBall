import { memo, useMemo } from "react";
import { useLungContext } from "../../../store/context";
import BouncyBalls from "./ball3d/bouncyBalls";

const calculateBallCount = (lungBallCount: number) => {
  if (lungBallCount < 25) {
    return 30;
  }
  if (lungBallCount < 50) {
    return 200;
  }
  if (lungBallCount < 75) {
    return 600;
  }
  return 1200;
};

const LungVisual = memo(() => {
  const { lungBallCount } = useLungContext();

  const ballCount = useMemo(
    () => calculateBallCount(lungBallCount),
    [lungBallCount]
  );

  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-8 bg-blue-50 p-8">
      <div className="text-2xl font-bold text-gray-600">肺部肺泡可视化</div>

      <div className="flex w-full flex-1 items-stretch justify-center gap-5">
        {/* <div className="flex-1 overflow-hidden rounded-[20px] border-2 border-solid border-blue-400 bg-white">
          <Wave area={area} />
        </div>
        <div className="flex-1 overflow-hidden rounded-[20px] border-2 border-solid border-blue-400 bg-white">
          <Wave area={area} />
        </div> */}
        <BouncyBalls ballCount={ballCount} ballRadius={0.5} />
      </div>
    </div>
  );
});

export default LungVisual;
