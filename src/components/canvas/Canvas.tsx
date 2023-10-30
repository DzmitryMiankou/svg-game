import React from "react";
import { StateSizeCanvasType } from "../../App";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../redux/store";
import { setKoordActionX, setKoordActionY } from "../../redux/koordReducer";
import styled from "styled-components";
import img from "../../img/pixel-art-santa-claus-with-a-bag-of-gifts-isolated-on-white-background-8-bit-christmas-character-winter-holiday-clipart-old-school-vintage-retro-80s-90s-slot-machinevideo-game-graphics-700-224060105.png";
import img2 from "../../img/2.png";
import NoactiveElemnt from "./ladder/NoactiveElemnt";
import audio from "../../audio/SpaceHarrierTheme.mp3";
import ActiveElement from "./active/ActiveElement";

const enum ColourEnum {
  WallColour = "#3c2415",
  BGColour = "#e7af49",
}

const enum KeyEnum {
  ArrowRight = "ArrowRight",
  ArrowLeft = "ArrowLeft",
  ArrowUp = "ArrowUp",
  ArrowDown = "ArrowDown",
}

const SVG = styled.svg`
  width: 100%;
`;

const Canvas: React.FC<{ get: StateSizeCanvasType }> = ({ get }) => {
  const [revers, setRevers] = React.useState<boolean>(false);
  const store = useSelector((state: RootState) => state.koord);
  const dispatch: AppDispatch = useDispatch();
  const [key, setKey] = React.useState<string>();

  const music = React.useMemo(() => {
    return new Audio(audio);
  }, []);

  const handlePlay = React.useCallback(() => {
    music.loop = true;
    music.play();
  }, [music]);

  const { height, width } = get;

  const CharacterProp = { size: width / 30, step: Math.floor(width / 300) };

  const CharacterRect = {
    x: store.x,
    y: store.y,
    width: CharacterProp.size,
    height: CharacterProp.size,
  };

  const labyrinthProp = React.useMemo(() => {
    return [
      {
        key: 1,
        x: width / 2,
        y: width / 30,
        width: width / 35,
        height: height,
        fill: ColourEnum.WallColour,
      },
      {
        key: 2,
        x: width / 2.3,
        y: 0,
        width: width / 35,
        height: height / 1.08,
        fill: ColourEnum.WallColour,
      },
      {
        key: 3,
        x: 0,
        y: width / 30,
        width: width / 6,
        height: width / 35,
        fill: ColourEnum.WallColour,
      },
      {
        key: 4,
        x: width / 4.8,
        y: width / 30,
        width: width / 4.2,
        height: width / 35,
        fill: ColourEnum.WallColour,
      },
      {
        key: 5,
        x: 0,
        y: width / 10.2,
        width: width / 2.6,
        height: width / 15,
        fill: ColourEnum.WallColour,
      },
      {
        key: 6,
        x: width / 25,
        y: width / 4.9,
        width: width / 2.4,
        height: width / 11,
        fill: ColourEnum.WallColour,
      },
    ];
  }, [height, width]);

  const switchKays = React.useCallback(
    (key: string) => {
      switch (key) {
        case KeyEnum.ArrowRight:
          setRevers(false);
          setKey(KeyEnum.ArrowRight);
          dispatch(setKoordActionX(CharacterProp.step));
          break;
        case KeyEnum.ArrowLeft:
          setRevers(true);
          setKey(KeyEnum.ArrowLeft);
          dispatch(setKoordActionX(-CharacterProp.step));
          break;
        case KeyEnum.ArrowUp:
          setKey(KeyEnum.ArrowUp);
          dispatch(setKoordActionY(-CharacterProp.step));
          break;
        case KeyEnum.ArrowDown:
          setKey(KeyEnum.ArrowDown);
          dispatch(setKoordActionY(CharacterProp.step));
          break;
        default:
          break;
      }
    },
    [dispatch, CharacterProp.step]
  );

  React.useEffect(() => {
    const keyDownHandler = (event: KeyboardEvent) => {
      const key = event.key;
      return switchKays(key);
    };

    window.addEventListener("keydown", keyDownHandler);
    return window.removeEventListener("keyup", keyDownHandler);
  }, [switchKays]);

  React.useEffect(() => {
    if (store.x < 0) dispatch(setKoordActionX(CharacterProp.step));
    if (store.x > width - CharacterProp.size)
      dispatch(setKoordActionX(-CharacterProp.step));
    if (store.y > height - CharacterProp.size)
      dispatch(setKoordActionY(-CharacterProp.step));
    if (store.y < 0) dispatch(setKoordActionY(CharacterProp.step));

    const colisObj = (
      hero: number,
      x: number,
      y: number,
      height: number,
      width: number
    ) => {
      if (
        store.x < x + width &&
        store.x + hero > x &&
        store.y < y + height &&
        store.y + hero > y
      ) {
        if (key === KeyEnum.ArrowRight)
          dispatch(setKoordActionX(-CharacterProp.step));
        if (key === KeyEnum.ArrowLeft)
          dispatch(setKoordActionX(CharacterProp.step));
        if (key === KeyEnum.ArrowDown)
          dispatch(setKoordActionY(-CharacterProp.step));
        if (key === KeyEnum.ArrowUp)
          dispatch(setKoordActionY(CharacterProp.step));
      }
    };

    labyrinthProp.forEach(({ x, y, height, width }) => {
      return colisObj(CharacterProp.size, x, y, height, width);
    });
  }, [
    dispatch,
    height,
    CharacterProp.size,
    CharacterProp.step,
    key,
    labyrinthProp,
    store.x,
    store.y,
    width,
  ]);

  return (
    <>
      <SVG
        x="0px"
        y="0px"
        viewBox={`0 0 ${width} ${height}`}
        enableBackground={`new 0 0 ${width} ${height}`}
      >
        <rect
          fill={ColourEnum.BGColour}
          width={width}
          height={height}
          stroke={ColourEnum.WallColour}
          strokeWidth="1%"
        />
        <NoactiveElemnt width={width} height={height} />
        <g>
          {labyrinthProp.map((prop) => (
            <rect {...prop} />
          ))}
        </g>
        <ActiveElement
          width={width}
          height={height}
          storeX={store.x}
          storeY={store.y}
          sizeCh={CharacterProp.size}
        />

        <g>
          <image
            overflow="visible"
            onClick={handlePlay}
            {...CharacterRect}
            xlinkHref={revers ? img2 : img}
          ></image>
        </g>
      </SVG>
    </>
  );
};

export default Canvas;
