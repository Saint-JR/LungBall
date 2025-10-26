import { memo, useEffect, useRef } from "react";

interface Props {
  area: number;
}

const waves = [
  {
    A: 40,
    lambda: 600,
    speed: 40,
    color: "rgba(59, 130, 246, 0.2)", // 蓝色
    yOffset: 0,
  },
  {
    A: 30,
    lambda: 400,
    speed: 60,
    color: "rgba(96, 165, 250, 0.25)", // 浅蓝色
    yOffset: 10,
  },
  {
    A: 20,
    lambda: 300,
    speed: 100,
    color: "rgba(147, 197, 253, 0.3)", // 更浅的蓝色
    yOffset: 20,
  },
];

const getBaseOffset = (area: number) => {
  switch (area) {
    case 0:
      return 0.9;
    case 25:
      return 0.75;
    case 50:
      return 0.5;
    case 75:
      return 0.25;
    case 100:
      return 0.1;
    default:
      return 0.9;
  }
};

const Wave = memo((props: Props) => {
  const { area } = props;
  const canvas = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // 设置 canvas 尺寸
    const setCanvasSize = () => {
      canvas.current!.width = canvas.current!.offsetWidth;
      canvas.current!.height = canvas.current!.offsetHeight;
    };
    setCanvasSize();
  }, []);

  useEffect(() => {
    if (!canvas.current) {
      return;
    }

    const ctx = canvas.current.getContext("2d");
    if (!ctx) {
      return;
    }

    const baseY = canvas.current!.height * getBaseOffset(area); // 波浪基线位置（70% 处）
    let lastTime = performance.now();
    let phase = 0;
    let animationFrameId: number;

    function draw(now: number) {
      // 计算距离上一帧的时间差，保证"时间驱动"而非"帧驱动"
      const dt = (now - lastTime) / 1000;
      lastTime = now;
      phase += dt;

      ctx!.clearRect(0, 0, canvas.current!.width, canvas.current!.height);

      waves.forEach(({ A, lambda, speed, color, yOffset }) => {
        const k = (2 * Math.PI) / lambda; // 波数
        const ω = speed * k; // 角频率：speed ≈ 波的相速
        const φ = ω * phase; // 相位：随时间推进
        ctx!.beginPath();
        ctx!.moveTo(0, canvas.current!.height);
        for (let x = 0; x <= canvas.current!.width; x += 2) {
          // 每 2px 采样一次
          const y = A * Math.sin(k * x - φ) + baseY + yOffset;
          ctx!.lineTo(x, y);
        }
        ctx!.lineTo(canvas.current!.width, canvas.current!.height);
        ctx!.closePath();
        ctx!.fillStyle = color;
        ctx!.fill();
      });

      animationFrameId = requestAnimationFrame(draw);
    }

    animationFrameId = requestAnimationFrame(draw);

    // 清理函数：组件卸载时取消动画
    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [area]);

  return <canvas ref={canvas} className="h-full w-full"></canvas>;
});

export default Wave;
