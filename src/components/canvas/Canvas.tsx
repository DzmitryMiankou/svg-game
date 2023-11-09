import React from "react";
import { StateSizeCanvasType } from "../../App";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../redux/store";
import { setKoordActionX, setKoordActionY } from "../../redux/koordReducer";
import styled from "styled-components";
import ActiveElement from "./active/ActiveElement";
import { labyrinthProp, BrikcsProp, noActiveElemntProp } from "./ElementProps";

const enum ColourEnum {
  WallColour = "#3c2415",
  BGColour = "#e7af49",
}

const enum KeyEnum {
  ArrowRight = "ArrowRight",
  ArrowLeft = "ArrowLeft",
  ArrowUp = "ArrowUp",
  ArrowDown = "ArrowDown",
  w = "w",
  s = "s",
  d = "d",
  a = "a",
  R = "˃",
  L = "˂",
  U = "˄",
  D = "˅",
}

const SVG = styled.svg`
  width: 100%;
`;

const ButBox = styled.div`
  display: flex;
  flex-direction: column;
  width: min-content;
`;

const Button = styled.button`
  padding: 10px;
  font-size: 14px;
  opacity: 40%;
  margin: 2px;
`;

const Canvas: React.FC<{ get: StateSizeCanvasType }> = ({ get }) => {
  const [revers, setRevers] = React.useState<boolean>(false);
  const store = useSelector((state: RootState) => state.koord);
  const dispatch: AppDispatch = useDispatch();
  const [key, setKey] = React.useState<string>();

  const { height, width } = get;

  const CharacterProp = {
    size: Math.floor(width / 34),
    step: Math.floor(width / 300),
  };

  const switchKeys = React.useCallback(
    (key: string): void => {
      setKey(key);
      switch (key) {
        case KeyEnum.R:
        case KeyEnum.d:
        case KeyEnum.ArrowRight:
          setRevers(false);
          setKey(key);
          dispatch(setKoordActionX(CharacterProp.step));
          break;
        case KeyEnum.L:
        case KeyEnum.a:
        case KeyEnum.ArrowLeft:
          setRevers(true);
          setKey(key);
          dispatch(setKoordActionX(-CharacterProp.step));
          break;
        case KeyEnum.U:
        case KeyEnum.w:
        case KeyEnum.ArrowUp:
          setKey(key);
          dispatch(setKoordActionY(-CharacterProp.step));
          break;
        case KeyEnum.D:
        case KeyEnum.s:
        case KeyEnum.ArrowDown:
          setKey(key);
          dispatch(setKoordActionY(CharacterProp.step));
          break;
        default:
          break;
      }
    },
    [dispatch, CharacterProp.step]
  );

  React.useEffect(() => {
    const keyDownHandler = (event: KeyboardEvent): void =>
      switchKeys(event.key);

    window.addEventListener("keydown", keyDownHandler);
    return window.removeEventListener("keyup", keyDownHandler);
  }, [switchKeys]);

  React.useEffect((): void => {
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
    ): void => {
      if (
        store.x < x + width &&
        store.x + hero > x &&
        store.y < y + height &&
        store.y + hero > y
      ) {
        if (
          key === KeyEnum.ArrowRight ||
          key === KeyEnum.R ||
          key === KeyEnum.d
        )
          dispatch(setKoordActionX(-CharacterProp.step));
        if (key === KeyEnum.ArrowLeft || key === KeyEnum.L || key === KeyEnum.a)
          dispatch(setKoordActionX(CharacterProp.step));
        if (key === KeyEnum.ArrowDown || key === KeyEnum.D || key === KeyEnum.s)
          dispatch(setKoordActionY(-CharacterProp.step));
        if (key === KeyEnum.ArrowUp || key === KeyEnum.U || key === KeyEnum.w)
          dispatch(setKoordActionY(CharacterProp.step));
      }
    };

    labyrinthProp(width).forEach(({ x, y, height, width }) =>
      colisObj(CharacterProp.size, x, y, height, width)
    );
  }, [
    dispatch,
    height,
    CharacterProp.size,
    CharacterProp.step,
    key,
    store.x,
    store.y,
    width,
  ]);

  return (
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
      <>
        {noActiveElemntProp(width).map((prop) => (
          <image overflow="visible" {...prop} />
        ))}
      </>
      <>
        {labyrinthProp(width).map((prop) => (
          <rect fill={ColourEnum.WallColour} {...prop} />
        ))}
      </>
      <>
        {BrikcsProp(width).map((props) => (
          <image {...props} />
        ))}
      </>
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
      <foreignObject x={width - 90} y={height / 1.4} width={80} height={42}>
        {["˂", "˃"].map((dats) => (
          <Button key={dats} onMouseDown={() => switchKeys(dats)}>
            {dats}
          </Button>
        ))}
      </foreignObject>
      <foreignObject x={width / 50} y={height / 1.5} width={40} height={90}>
        <ButBox>
          {["˄", "˅"].map((dats) => (
            <Button key={dats} onMouseDown={() => switchKeys(dats)}>
              {dats}
            </Button>
          ))}
        </ButBox>
      </foreignObject>
    </SVG>
  );
};

export default Canvas;
