import { memo } from "react";
import LungVisual from "./lungVisual/lungVisual";
import LungCalculator from "./lungCalculator/lungCalculator";

const LungBall = memo(() => {
  return (
    <div className="flex h-full w-full items-center justify-center bg-[rgb(226,232,241)]">
      <div className="flex h-3/4 w-3/4 items-stretch overflow-hidden rounded-[20px] shadow-md">
        <LungVisual />
        <LungCalculator />
      </div>
    </div>
  );
});

export default LungBall;
