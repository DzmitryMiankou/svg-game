import React from "react";
import { StateSizeCanvasType } from "../../App";
import styled from "styled-components";

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

const heroProp = { size: 50, step: 10 };

const Canvas: React.FC<{ get: StateSizeCanvasType }> = ({ get }) => {
  const [key, setKey] = React.useState<string>();
  const [koordX, setCoordX] = React.useState<number>(0);
  const [koordY, setCoordY] = React.useState<number>(0);

  const { height, width } = get;

  const labProp = React.useMemo(() => {
    return [
      { x: width / 2, y: 50, width: 50, height: height - 100, fill: "#a6b522" },
      {
        x: width / 2 - 120,
        y: 0,
        width: 50,
        height: height - 50,
        fill: "#a6b522",
      },
    ];
  }, [height, width]);

  const switchKeys = React.useCallback((key: string) => {
    switch (key) {
      case KeyType.ArrowRight:
        setKey(KeyType.ArrowRight);
        setCoordX((coord) => coord + heroProp.step);
        break;
      case KeyType.ArrowLeft:
        setKey(KeyType.ArrowLeft);
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
  }, []);

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

    function colisObj(hero: number, x: number, y: number, height: number) {
      if (
        koordX < x + hero &&
        koordX + hero > x &&
        koordY < y + height &&
        koordY + hero > y
      ) {
        if (key === KeyType.ArrowRight) setCoordX(x - hero);
        if (key === KeyType.ArrowLeft) setCoordX(x + hero);
        if (key === KeyType.ArrowDown) setCoordY(hero - y);
        if (key === KeyType.ArrowUp) setCoordY(height + hero);
        return;
      }
    }
    labProp.forEach(({ x, y, height }) => {
      return colisObj(heroProp.size, x, y, height);
    });
  }, [koordX, height, width, koordY, key, labProp]);

  return (
    <SVG
      x="0px"
      y="0px"
      viewBox={`0 0 ${width} ${height}`}
      enableBackground={`new 0 0 ${width} ${height}`}
    >
      <rect
        x={koordX}
        y={koordY}
        fill="#22B573"
        width={heroProp.size}
        height={heroProp.size}
      />
      <g>
        {labProp.map((prop, i) => (
          <rect key={i} {...prop} />
        ))}
      </g>
    </SVG>
  );
};

export default Canvas;
