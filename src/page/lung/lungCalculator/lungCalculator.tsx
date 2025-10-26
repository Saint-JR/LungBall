import { Slider, type SliderSingleProps } from "antd";
import { memo, useMemo } from "react";
import { useLungContext } from "../../../store/context";

const marks: SliderSingleProps["marks"] = {
  0: "0",
  25: "75,000,000",
  50: "150,000,000",
  75: "225,000,000",
  100: {
    style: {
      wordBreak: "initial",
      whiteSpace: "nowrap",
    },
    label: "300,000,000",
  },
};

const LungCalculator = memo(() => {
  const { lungBallCount, setLungBallCount } = useLungContext();

  const handleChange = (value: number) => {
    setLungBallCount(value); // 更新 context 中的 area
  };

  const lungArea = useMemo(() => {
    return (
      lungBallCount *
      3000000 *
      4 *
      3.1416 *
      0.172 *
      0.172 *
      0.01
    ).toFixed(0);
  }, [lungBallCount]);

  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-8 bg-white p-8">
      <div className="text-2xl font-bold text-gray-600">肺泡数量计算器</div>

      <div className="flex w-full flex-1 flex-col items-stretch justify-center gap-8">
        <div className="flex w-full flex-col items-stretch gap-2">
          <div className="flex items-center justify-between">
            <div className="text-md font-bold text-gray-600">肺泡数量</div>
            <div className="text-md mr-8 font-bold text-gray-600">
              {lungBallCount * 3000000} 个
            </div>
          </div>

          <div className="pr-8">
            <Slider
              marks={marks}
              step={5}
              tooltip={{ open: false }}
              defaultValue={lungBallCount}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="flex w-full flex-col items-center justify-center gap-4 rounded-[20px] bg-gray-200 p-10">
          <div className="text-md font-bold text-gray-600">
            肺部表面积（平方厘米）
          </div>
          <div className="text-2xl font-bold text-gray-600">{lungArea}</div>
        </div>

        <div className="flex flex-1 flex-col items-stretch justify-center rounded-[20px] bg-gray-50 p-5 text-gray-600">
          <div className="mb-4 text-lg font-bold">参考标准</div>
          <div className="flex flex-1 flex-col justify-center">
            <div className="mb-4">
              人体肺脏含有约3亿个肺泡，肺泡壁极薄并紧密相连，使总内表面积扩展至约100–150平方米。肺泡数量越多，可展开的膜面积就越大，从而提高氧气与二氧化碳交换的效率。也就是说，肺泡数目是决定肺表面积大小的关键因素，两者成正相关。
            </div>
            <div className="mb-4">肺泡平均半径为0.1毫米。</div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default LungCalculator;
