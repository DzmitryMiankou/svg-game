import React from "react";
import styled from "styled-components";
import img from "../../../img/1.png";
import img2 from "../../../img/2.png";
import { CaseProp } from "./CaseProp";
import Data from "../../../data/data.json";

const ForObj = styled.foreignObject`
  background-color: #fff8ad;
  border: 8px solid #906200;
  display: flex;
  flex-direction: column;
  text-align: center;
  width: 50%;
  height: 50%;
`;

const ButtonClouse = styled.button`
  padding: 10px 20px;
`;

const ButtonBox = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
`;

const P = styled.p`
  text-align: center;
`;

interface PropType<T> {
  width: T;
  height: T;
  storeX: T;
  storeY: T;
  sizeCh: T;
  keyd: string | undefined;
  revers: boolean;
  CharacterProp: { size: T; step: T };
}

const ActiveElement: React.FC<PropType<number>> = (prop) => {
  const [openDial, setOpenDial] = React.useState<string>("");
  const [qvest, setQvest] = React.useState<string>("");
  const [openQvest, setOpenQvest] = React.useState<boolean>(false);
  const [gameOver, setGameOver] = React.useState<boolean>(false);

  const assignObj = React.useCallback(() => {
    let newArr = [];
    for (let i in CaseProp(prop.width)) {
      const newObj = Object.assign(CaseProp(prop.width)[+i], Data[+i]);
      newArr.push(newObj);
    }
    return newArr;
  }, [prop.width]);

  const CharacterRect = {
    x: prop.storeX,
    y: prop.storeY,
    width: prop.CharacterProp.size,
  };

  const DialogProp = {
    width: Math.floor(prop.width / 15),
    height: Math.floor(prop.width / 30),
    x: Math.floor(prop.storeX - 100),
    y: prop.storeY,
    fill: "#ffffff",
    rx: 10,
  };

  React.useEffect((): void => {
    const colisObj = (
      hero: number,
      x: number,
      y: number,
      height: number,
      width: number,
      text: string,
      qvest: string,
      answer: string
    ): void => {
      if (
        prop.storeX < x + width &&
        prop.storeX + hero > x &&
        prop.storeY < y + height &&
        prop.storeY + hero > y
      ) {
        setOpenDial(text);
        setQvest(qvest);
        if (prop.keyd === " ") {
          if (answer === "") setGameOver(true);
          setOpenQvest(true);
        }
      }
    };
    setOpenDial("");
    assignObj().forEach(({ x, y, height, width, text, qvest, answer }) =>
      colisObj(prop.sizeCh, x, y, height, width, text, qvest, answer)
    );
  }, [
    assignObj,
    prop.height,
    prop.keyd,
    prop.sizeCh,
    prop.storeX,
    prop.storeY,
    prop.width,
  ]);

  return (
    <>
      {assignObj().map((prop) => (
        <image overflow="visible" {...prop} />
      ))}
      <>
        {openDial !== "" ? (
          <>
            <rect {...DialogProp}></rect>
            <foreignObject
              x={Math.floor(prop.storeX - 100)}
              y={prop.storeY}
              width={Math.floor(prop.width / 15)}
              height={Math.floor(prop.width / 30)}
            >
              <P>{openDial}</P>
            </foreignObject>
          </>
        ) : (
          <></>
        )}
      </>
      <>
        <image
          overflow="visible"
          {...CharacterRect}
          xlinkHref={prop.revers ? img2 : img}
        />
        {openQvest ? (
          <ForObj x={prop.width / 4} y={prop.height / 4}>
            <h1>{qvest}</h1>
            <>
              {gameOver ? (
                <></>
              ) : (
                <ButtonBox>
                  {["Да", "Нет"].map((data, i) => (
                    <ButtonClouse key={i} onClick={() => setOpenQvest(false)}>
                      {data}
                    </ButtonClouse>
                  ))}
                </ButtonBox>
              )}
            </>
          </ForObj>
        ) : (
          <></>
        )}
      </>
    </>
  );
};

export default ActiveElement;
