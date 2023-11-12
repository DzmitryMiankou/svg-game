import React, { FC, useState, useCallback, useEffect, useRef } from "react";
import styled from "styled-components";
import img from "../../../img/1.png";
import img2 from "../../../img/2.png";
import { CaseProp, CasePropType } from "./CaseProp";
import Data from "../../../data/data.json";
import { setGameAction } from "../../../redux/gameReducer";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../redux/store";
import { ColourEnum } from "../../../types/enum/ColourEnum";
import {
  GameReducerType,
  CharacterSizeType,
} from "../../../types/enum/type/gameType";

const ForObj = styled.foreignObject<{ $gameOver: boolean }>`
  background-color: ${(prop) =>
    prop.$gameOver ? ColourEnum.GameEndBGColour : ColourEnum.GameOkBGColour};
  border: 8px solid ${ColourEnum.BorderModalGameColour};
  display: flex;
  flex-direction: column;
  text-align: center;
  width: 50%;
  height: 50%;
  color: ${(prop) =>
    prop.$gameOver
      ? ColourEnum.TextGameEndColour
      : ColourEnum.TextGameOkColour};
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

interface PropType<T extends number> {
  width: T;
  height: T;
  storeX: T;
  storeY: T;
  sizeCh: T;
  keyd: string | undefined;
  revers: boolean;
  CharacterProp: CharacterSizeType;
  state: { data: GameReducerType[] };
}

const ActiveElement: FC<PropType<number>> = (prop) => {
  const dispatch: AppDispatch = useDispatch();
  const [openDial, setOpenDial] = useState<string>("");
  const [qvest, setQvest] = useState<string>("");
  const [key, setKey] = useState<string>("");
  const [openQvest, setOpenQvest] = useState<boolean>(false);
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [newImg, setnewImg] = useState<string>("");
  const ref = useRef<SVGAElement>(null);

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
    fill: ColourEnum.WhiteColour,
    rx: 10,
  };

  type JSONgameType<S extends string> = {
    text: S;
    qvest: S;
    answer: S;
  };

  useEffect((): void => {
    const colisObj = (
      hero: number,
      fn: CasePropType<number, string> & JSONgameType<string>
    ): void => {
      if (
        prop.storeX < fn.x + fn.width &&
        prop.storeX + hero > fn.x &&
        prop.storeY < fn.y + fn.height &&
        prop.storeY + hero > fn.y
      ) {
        if (Boolean(prop.state.data.find((el) => el.id === fn.key))) {
          setOpenQvest(false);
          return setOpenDial("");
        }
        setOpenDial(fn.text);
        setQvest(fn.qvest);
        if (prop.keyd === " ") {
          setnewImg(fn.newp ?? "");
          setKey(fn.key);
          if (fn.answer === "") setGameOver(true);
          setOpenQvest(true);
        }
      }
    };
    setOpenDial("");
    setQvest("");
    assignObj().forEach((props) => colisObj(prop.sizeCh, props));
  }, [
    assignObj,
    prop.keyd,
    prop.sizeCh,
    prop.state.data,
    prop.storeX,
    prop.storeY,
  ]);

  const clickHandler = (answer: "Да" | "Нет") => {
    setOpenQvest(false);
    if (answer === "Да") {
      ref.current
        ?.querySelector(`#${key}`)
        ?.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", newImg);
      return dispatch(setGameAction({ id: key }));
    }
  };

  return (
    <g ref={ref}>
      {assignObj().map(({ key, x, y, width, height, xlinkHref }) => (
        <image
          overflow="visible"
          key={key}
          id={key}
          x={x}
          y={y}
          width={width}
          height={height}
          xlinkHref={xlinkHref}
        />
      ))}
      <g>
        <>
          {gameOver ? (
            <></>
          ) : (
            <>
              {openDial !== "" ? (
                <>
                  <rect {...DialogProp} />
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
      </g>
    </g>
  );
};

export default ActiveElement;
