import { createContext, useContext } from "react";

interface LungContextType {
  lungBallCount: number;
  setLungBallCount: (lungBallCount: number) => void;
}

export const lungCtx = createContext<LungContextType>({
  lungBallCount: 0,
  setLungBallCount: () => {},
});

export const useLungContext = () => {
  const ctx = useContext(lungCtx);
  return ctx;
};
