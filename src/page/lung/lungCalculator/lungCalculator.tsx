import { Slider, type SliderSingleProps } from "antd";
import { memo, useMemo } from "react";
import { useLungContext } from "../../../store/context";
import { calculateLungBallCount } from "@/utils/utils";

const marks: SliderSingleProps["marks"] = {
  0: "0",
  25: "",
  50: "",
  75: "",
  100: "",
};

const LungCalculator = memo(() => {
  const { lungBallCount, setLungBallCount } = useLungContext();

  const handleChange = (value: number) => {
    setLungBallCount(value); // 更新 context 中的 area
  };

  const trueBallCount = useMemo(() => {
    return calculateLungBallCount(lungBallCount);
  }, [lungBallCount]);

  const lungArea = useMemo(() => {
    return (trueBallCount * 4 * 3.1416 * 0.172 * 0.172 * 0.01).toFixed(0);
  }, [trueBallCount]);

  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-8 bg-white p-8">
      <div className="text-2xl font-bold text-gray-600">肺泡数量计算器</div>

      <div className="flex w-full flex-1 flex-col items-stretch justify-center gap-8">
        <div className="flex w-full flex-col items-stretch gap-2">
          <div className="flex items-center justify-between">
            <div className="text-md font-bold text-gray-600">肺泡数量</div>
            <div className="text-md mr-8 font-bold text-gray-600">
              {trueBallCount} 个
            </div>
          </div>

          <div className="pr-8">
            <Slider
              marks={marks}
              step={1}
              tooltip={{ open: false }}
              defaultValue={lungBallCount}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="flex w-full flex-1 flex-col items-center justify-center gap-4 rounded-[20px] bg-gray-200 p-10">
          <div className="text-md font-bold text-gray-600">
            肺部表面积（平方厘米）
          </div>
          <div className="text-2xl font-bold text-gray-600">{lungArea}</div>
        </div>

        <div className="flex flex-col items-stretch justify-center rounded-[20px] bg-gray-50 p-5 text-gray-600">
          <div className="mb-4 text-lg font-bold">参考标准</div>
          <div className="flex flex-1 flex-col justify-center">
            <div className="mb-4 text-[17px]">肺泡平均半径为0.1毫米。</div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default LungCalculator;
