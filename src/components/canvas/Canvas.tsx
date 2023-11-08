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

  const CharacterProp = { size: width / 34, step: Math.floor(width / 300) };

  const labyrinthProp = React.useMemo(() => {
    return [
      {
        key: 1,
        x: width / 2.2,
        y: 0,
        width: width / 1.8,
        height: width / 15,
      },
      {
        key: 2,
        x: width / 2.3,
        y: 0,
        width: width / 35,
        height: width / 3.4983,
      },
      {
        key: 3,
        x: 0,
        y: width / 30,
        width: width / 6,
        height: width / 35,
      },
      {
        key: 4,
        x: width / 4.8,
        y: width / 30,
        width: width / 4.2,
        height: width / 35,
      },
      {
        key: 5,
        x: 0,
        y: width / 10.6,
        width: width / 2.55,
        height: width / 15,
      },
      {
        key: 6,
        x: width / 25,
        y: width / 5.13,
        width: width / 2.4,
        height: width / 11,
      },
      {
        key: 7,
        x: width / 6,
        y: width / 3.13,
        width: width / 3,
        height: width / 25,
      },
      {
        key: 8,
        x: 0,
        y: width / 3.13,
        width: width / 8,
        height: width / 25,
      },
      {
        key: 9,
        x: 0,
        y: width / 2.55,
        width: width / 2,
        height: width / 9,
      },
      {
        key: 10,
        x: width / 2,
        y: width / 10,
        width: width / 35,
        height: width / 2,
      },
      {
        key: 11,
        x: width / 2,
        y: width / 10,
        width: width / 8,
        height: width / 35,
      },
      {
        key: 12,
        x: width / 1.5,
        y: width / 10,
        width: width / 3,
        height: width / 35,
      },
      {
        key: 13,
        x: width / 2,
        y: width / 6.3,
        width: width / 3.5,
        height: width / 35,
      },
      {
        key: 14,
        x: width / 1.2,
        y: width / 6.3,
        width: width / 6,
        height: width / 35,
      },
    ];
  }, [width]);

  const switchKeys = React.useCallback(
    (key: string): void => {
      setKey(key);
      switch (key) {
        case `˃`:
        case KeyEnum.ArrowRight:
          setRevers(false);
          setKey(key);
          dispatch(setKoordActionX(CharacterProp.step));
          break;
        case `˂`:
        case KeyEnum.ArrowLeft:
          setRevers(true);
          setKey(key);
          dispatch(setKoordActionX(-CharacterProp.step));
          break;
        case `˄`:
        case KeyEnum.ArrowUp:
          setKey(key);
          dispatch(setKoordActionY(-CharacterProp.step));
          break;
        case `˅`:
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
        if (key === KeyEnum.ArrowRight || key === `˃`)
          dispatch(setKoordActionX(-CharacterProp.step));
        if (key === KeyEnum.ArrowLeft || key === `˂`)
          dispatch(setKoordActionX(CharacterProp.step));
        if (key === KeyEnum.ArrowDown || key === `˅`)
          dispatch(setKoordActionY(-CharacterProp.step));
        if (key === KeyEnum.ArrowUp || key === `˄`)
          dispatch(setKoordActionY(CharacterProp.step));
      }
    };

    labyrinthProp.forEach(({ x, y, height, width }) =>
      colisObj(CharacterProp.size, x, y, height, width)
    );
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
            <rect fill={ColourEnum.WallColour} {...prop} />
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
    </>
  );
};

export default React.memo(Canvas);
