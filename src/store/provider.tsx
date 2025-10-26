import { useState, type JSX } from "react";
import { lungCtx } from "./context";

const LungCtxProvider = (props: { children: JSX.Element }) => {
  const { children } = props;

  const [lungBallCount, setLungBallCount] = useState(25);

  return (
    <lungCtx.Provider value={{ lungBallCount, setLungBallCount }}>
      {children}
    </lungCtx.Provider>
  );
};

export default LungCtxProvider;
