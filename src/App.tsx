import React from "react";
import Canvas from "./components/canvas/Canvas";

export interface StateSizeCanvasType {
  width: number;
  height: number;
}

const App: React.FC = () => {
  const [get, set] = React.useState<StateSizeCanvasType>({
    width: 0,
    height: 0,
  });

  React.useEffect(() => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    set({ width: width, height: height });
  }, []);

  return <Canvas get={get} />;
};

export default App;
