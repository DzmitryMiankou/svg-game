import React from "react";
import { StateSizeCanvasType } from "../../App";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../redux/store";
import { setKoordActionX, setKoordActionY } from "../../redux/koordReducer";
import styled from "styled-components";
import NoactiveElemnt from "./ladder/NoactiveElemnt";
import ActiveElement from "./active/ActiveElement";
import Bricks from "./bricks/Bricks";

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

  const { height, width } = get;

  const CharacterProp = { size: width / 34, step: Math.floor(width / 300) };

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
        y: width / 10.6,
        width: width / 2.6,
        height: width / 15,
        fill: ColourEnum.WallColour,
      },
      {
        key: 6,
        x: width / 25,
        y: width / 5.1,
        width: width / 2.4,
        height: width / 11,
        fill: ColourEnum.WallColour,
      },
    ];
  }, [height, width]);

  const switchKays = React.useCallback(
    (key: string) => {
      setKey(key);
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
        <Bricks width={width} />
        <ActiveElement
          revers={revers}
          width={width}
          height={height}
          storeX={store.x}
          storeY={store.y}
          sizeCh={CharacterProp.size}
          keyd={key}
          CharacterProp={CharacterProp}
        />
      </SVG>
    </>
  );
};

export default Canvas;
