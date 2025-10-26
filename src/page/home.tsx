import { memo } from "react";
import LungBall from "./lung/lungBall";
import LungCtxProvider from "../store/provider";

const Home = memo(() => {
  return (
    <LungCtxProvider>
      <div className="h-[100vh] w-[100vw]">
        <LungBall />
      </div>
    </LungCtxProvider>
  );
});

export default Home;
