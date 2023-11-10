import React, { FC, useState, useCallback, useEffect } from "react";
import styled from "styled-components";
import img from "../../../img/1.png";
import img2 from "../../../img/2.png";
import { CaseProp } from "./CaseProp";
import Data from "../../../data/data.json";
import { setGameAction } from "../../../redux/gameReducer";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../../redux/store";

const ForObj = styled.foreignObject<{ $gameOver: boolean }>`
  background-color: ${(prop) => (prop.$gameOver ? "#ff0000" : "#fff8ad")};
  border: 8px solid #906200;
  display: flex;
  flex-direction: column;
  text-align: center;
  width: 50%;
  height: 50%;
  color: ${(prop) => (prop.$gameOver ? "#fff8bf" : "#000000")};
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

const ActiveElement: FC<PropType<number>> = (prop) => {
  const state = useSelector((store: RootState) => store.game);
  const dispatch: AppDispatch = useDispatch();
  const [openDial, setOpenDial] = useState<string>("");
  const [qvest, setQvest] = useState<string>("");
  const [openQvest, setOpenQvest] = useState<boolean>(false);
  const [gameOver, setGameOver] = useState<boolean>(false);

  console.log(state);

  const assignObj = useCallback(() => {
    let newArr = [];
    for (let i in CaseProp(prop.width))
      newArr.push(Object.assign(CaseProp(prop.width)[+i], Data[+i]));
    return newArr;
  }, [prop.width]);

  const CharacterRect = {
    x: prop.storeX,
    y: prop.storeY,
    width: prop.CharacterProp.size,
  };

  const DialogProp = {
    width: 100,
    height: 50,
    x: Math.floor(prop.storeX - 100),
    y: prop.storeY,
    fill: "#ffffff",
    rx: 10,
  };

  useEffect((): void => {
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
    setQvest("");
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

  const clickHandler = (answer: "Да" | "Нет") => {
    dispatch(setGameAction(openDial));
  };

  return (
    <>
      {assignObj().map((prop) => (
        <image overflow="visible" {...prop} />
      ))}
      <>
        <>
          {gameOver ? (
            <></>
          ) : (
            <>
              {openDial !== "" ? (
                <>
                  <rect {...DialogProp}></rect>
                  <foreignObject
                    x={Math.floor(prop.storeX - 100)}
                    y={prop.storeY}
                    width={100}
                    height={50}
                  >
                    <P>{openDial}</P>
                  </foreignObject>
                </>
              ) : (
                <></>
              )}
              <image
                overflow="visible"
                {...CharacterRect}
                xlinkHref={prop.revers ? img2 : img}
              />
            </>
          )}
        </>
        {openQvest ? (
          <ForObj $gameOver={gameOver} x={prop.width / 4} y={prop.height / 4}>
            <h1>{qvest}</h1>
            <>
              {gameOver ? (
                <></>
              ) : (
                <ButtonBox>
                  {["Да", "Нет"].map((data, i) => (
                    <ButtonClouse
                      key={i}
                      onClick={() => {
                        setOpenQvest(false);
                        clickHandler(data === "Да" ? "Да" : "Нет");
                      }}
                    >
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
