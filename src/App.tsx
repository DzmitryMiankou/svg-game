import React from "react";
import Canvas from "./components/canvas/Canvas";
import audio from "./audio/SpaceHarrierTheme.mp3";
import StartWindow from "./components/startWindow/StartWindow";

export interface StateSizeCanvasType {
  width: number;
  height: number;
}

const App: React.FC = () => {
  const [openPage, setOpenPage] = React.useState<boolean>(false);
  const [get, set] = React.useState<StateSizeCanvasType>({
    width: 0,
    height: 0,
  });

  const music: HTMLAudioElement = React.useMemo(() => {
    return new Audio(audio);
  }, []);

  const handlePlay = React.useCallback((): void => {
    music.loop = true;
    music.play();
  }, [music]);

  React.useEffect((): void => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    set({ width: width, height: height });
  }, []);

  return (
    <>
      {openPage ? (
        <Canvas get={get} />
      ) : (
        <StartWindow setOpenPage={setOpenPage} handlePlay={handlePlay} />
      )}
    </>
  );
};

export default App;
