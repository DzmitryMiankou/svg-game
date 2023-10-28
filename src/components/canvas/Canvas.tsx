import React from "react";
import { StateSizeCanvasType } from "../../App";
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
  const { height, width } = get;
  const [key, setKey] = React.useState<string>();
  const [koordX, setCoordX] = React.useState<number>(0);
  const [koordY, setCoordY] = React.useState<number>(0);
  const [revers, setRevers] = React.useState<boolean>(false);

  const heroProp = { size: width / 33, step: Math.floor(width / 120) };

  const heroRect = {
    x: koordX,
    y: koordY,
    width: heroProp.size,
    height: heroProp.size,
  };

  const labyrinthProp = React.useMemo(() => {
    return [
      {
        key: 1,
        x: width / 2,
        y: height / 13,
        width: width / 35,
        height: height,
        fill: "#a6b522",
      },
      {
        key: 2,
        x: width / 2.3,
        y: 0,
        width: width / 35,
        height: height / 1.07,
        fill: "#a6b522",
      },
      {
        key: 3,
        x: width / 8,
        y: height / 13,
        width: width / 3,
        height: width / 35,
        fill: "#a6b522",
      },
    ];
  }, [height, width]);

  const switchKeys = React.useCallback(
    (key: string) => {
      switch (key) {
        case KeyType.ArrowRight:
          setKey(KeyType.ArrowRight);
          setRevers(false);
          setCoordX((coord) => coord + heroProp.step);
          break;
        case KeyType.ArrowLeft:
          setKey(KeyType.ArrowLeft);
          setRevers(true);
          setCoordX((coord) => coord - heroProp.step);
          break;
        case KeyType.ArrowUp:
          setKey(KeyType.ArrowUp);
          setCoordY((coord) => coord - heroProp.step);
          break;
        case KeyType.ArrowDown:
          setKey(KeyType.ArrowDown);
          setCoordY((coord) => coord + heroProp.step);
          break;
        default:
          break;
      }
    },
    [heroProp.step]
  );

  React.useEffect(() => {
    const keyDownHandler = (event: KeyboardEvent) => {
      const key = event.key;
      return switchKeys(key);
    };
    window.addEventListener("keydown", keyDownHandler);
    return window.removeEventListener("keyup", keyDownHandler);
  }, [switchKeys]);

  React.useEffect(() => {
    if (koordX < 0) setCoordX(0);
    if (koordY < 0) setCoordY(0);
    if (koordX > width - heroProp.size) setCoordX(width - heroProp.size);
    if (koordY > height - heroProp.size) setCoordY(height - heroProp.size);

    const colisObj = (
      hero: number,
      x: number,
      y: number,
      height: number,
      width: number
    ) => {
      if (
        koordX < x + width &&
        koordX + hero > x &&
        koordY < y + height &&
        koordY + hero > y
      ) {
        if (key === KeyType.ArrowRight) setCoordX(x - hero);
        if (key === KeyType.ArrowLeft) setCoordX(x + width);
        if (key === KeyType.ArrowDown) setCoordY(y - hero);
        if (key === KeyType.ArrowUp) setCoordY(height + y);
      }
    };

    labyrinthProp.forEach(({ x, y, height, width }) => {
      return colisObj(heroProp.size, x, y, height, width);
    });
  }, [koordX, height, width, koordY, key, labyrinthProp, heroProp.size]);

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
