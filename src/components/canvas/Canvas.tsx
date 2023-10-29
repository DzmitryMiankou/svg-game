import React from "react";
import { StateSizeCanvasType } from "../../App";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../redux/store";
import { setKoordActionX, setKoordActionY } from "../../redux/koordReducer";
import styled from "styled-components";
import img from "../../img/pixel-art-santa-claus-with-a-bag-of-gifts-isolated-on-white-background-8-bit-christmas-character-winter-holiday-clipart-old-school-vintage-retro-80s-90s-slot-machinevideo-game-graphics-700-224060105.png";
import img2 from "../../img/2.png";

const SVG = styled.svg`
  width: 100%;
  background-color: #f2f8ab;
`;

const enum KeyType {
  ArrowRight = "ArrowRight",
  ArrowLeft = "ArrowLeft",
  ArrowUp = "ArrowUp",
  ArrowDown = "ArrowDown",
}

const Canvas: React.FC<{ get: StateSizeCanvasType }> = ({ get }) => {
  const [revers, setRevers] = React.useState<boolean>(false);
  const store = useSelector((state: RootState) => state.koord);
  const dispatch: AppDispatch = useDispatch();
  const [key, setKey] = React.useState<string>();

  const { height, width } = get;

  const heroProp = { size: width / 30, step: 5 };

  const heroRect = {
    x: store.x,
    y: store.y,
    width: heroProp.size,
    height: heroProp.size,
  };

  const labyrinthProp = React.useMemo(() => {
    return [
      {
        key: 1,
        x: width / 2,
        y: width / 30,
        width: width / 35,
        height: height,
        fill: "#a6b522",
      },
      {
        key: 2,
        x: width / 2.3,
        y: 0,
        width: width / 35,
        height: height / 1.08,
        fill: "#a6b522",
      },
      {
        key: 3,
        x: width / 25,
        y: width / 30,
        width: width / 2.5,
        height: width / 35,
        fill: "#a6b522",
      },
    ];
  }, [height, width]);

  const switchKays = React.useCallback(
    (key: string) => {
      switch (key) {
        case KeyType.ArrowRight:
          setRevers(false);
          setKey(KeyType.ArrowRight);
          dispatch(setKoordActionX(heroProp.step));
          break;
        case KeyType.ArrowLeft:
          setRevers(true);
          setKey(KeyType.ArrowLeft);
          dispatch(setKoordActionX(-heroProp.step));
          break;
        case KeyType.ArrowUp:
          setKey(KeyType.ArrowUp);
          dispatch(setKoordActionY(-heroProp.step));
          break;
        case KeyType.ArrowDown:
          setKey(KeyType.ArrowDown);
          dispatch(setKoordActionY(heroProp.step));
          break;
        default:
          break;
      }
    },
    [dispatch, heroProp.step]
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
    if (store.x < 0) dispatch(setKoordActionX(heroProp.step));
    if (store.x > width - heroProp.size)
      dispatch(setKoordActionX(-heroProp.step));
    if (store.y > height - heroProp.size)
      dispatch(setKoordActionY(-heroProp.step));
    if (store.y < 0) dispatch(setKoordActionY(heroProp.step));
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
        if (key === KeyType.ArrowRight)
          dispatch(setKoordActionX(-heroProp.step));
        if (key === KeyType.ArrowLeft) dispatch(setKoordActionX(heroProp.step));
        if (key === KeyType.ArrowDown)
          dispatch(setKoordActionY(-heroProp.step));
        if (key === KeyType.ArrowUp) dispatch(setKoordActionY(heroProp.step));
      }
    };

    labyrinthProp.forEach(({ x, y, height, width }) => {
      return colisObj(heroProp.size, x, y, height, width);
    });
  }, [
    dispatch,
    height,
    heroProp.size,
    heroProp.step,
    key,
    labyrinthProp,
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
      <rect x="0" y="0" fill="#ffd071" width={width} height={height} />
      <g>
        <image
          overflow="visible"
          {...heroRect}
          xlinkHref={revers ? img2 : img}
        ></image>
      </g>
      <g>
        {labyrinthProp.map((prop) => (
          <rect {...prop} />
        ))}
      </g>
    </SVG>
  );
};

export default Canvas;
