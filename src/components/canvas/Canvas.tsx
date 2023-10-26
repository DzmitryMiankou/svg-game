import React from "react";
import { StateSizeCanvasType } from "../../App";

const enum KeyType {
  ArrowRight = "ArrowRight",
  ArrowLeft = "ArrowLeft",
  ArrowUp = "ArrowUp",
  ArrowDown = "ArrowDown",
}

const heroProp = { size: 50, step: 5 };

const Canvas: React.FC<{ get: StateSizeCanvasType }> = ({ get }) => {
  const [key, setKey] = React.useState<string>();
  const [koordX, setCoordX] = React.useState<number>(0);
  const [koordY, setCoordY] = React.useState<number>(0);
  const ref = React.useRef<HTMLCanvasElement>(null);

  const { height, width } = get;

  const switchKays = React.useCallback((key: string) => {
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
      return switchKays(key);
    };
    window.addEventListener("keydown", keyDownHandler);
    return window.removeEventListener("keyup", keyDownHandler);
  }, [switchKays]);

  React.useEffect(() => {
    if (ref.current) {
      const canvas = ref.current;
      const context = canvas.getContext("2d");
      if (context) startDrow(context);
    }

    function startDrow(context: CanvasRenderingContext2D) {
      if (koordX < 0) return setCoordX(0);
      if (koordY < 0) return setCoordY(0);
      if (koordX > width - 50) return setCoordX(width - 50);
      if (koordY > height - 50) return setCoordY(height - 50);
      if (
        koordX < 500 + 50 &&
        koordX + 50 > 500 &&
        koordY < 50 + height - 100 &&
        koordY + 50 > 50
      ) {
        if (key === KeyType.ArrowRight) return setCoordX(500 - 50);
        if (key === KeyType.ArrowLeft) return setCoordX(500 + 50);
        if (key === KeyType.ArrowDown) return setCoordY(50 - 50);
        if (key === KeyType.ArrowUp) return setCoordY(height - 100 + 50);
      }
      context.canvas.width = width;
      context.canvas.height = height;
      context.fillStyle = "red";
      context.fillRect(koordX, koordY, heroProp.size, heroProp.size);
      context.fillStyle = "rgba(0, 0, 200, 0.5)";
      context.fillRect(500, 50, 50, height - 100);
    }
  }, [koordX, height, width, koordY, key]);

  return <canvas ref={ref} />;
};

export default Canvas;
