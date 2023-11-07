import React from "react";
import caseQvest from "../../../img/case.gif";
import danger from "../../../img/dangGif.gif";
import styled from "styled-components";
import img from "../../../img/1.png";
import img2 from "../../../img/2.png";
import forest from "../../../img/frost.png";
import lightbulbActive from "../../../img/lightbulbActive.gif";

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
  const [openQvest, setOpenQvest] = React.useState<boolean>(false);

  const CharacterRect = {
    x: prop.storeX,
    y: prop.storeY,
    width: prop.CharacterProp.size,
  };

  const DialogProp = {
    width: 100,
    height: 50,
    x: prop.storeX - 100,
    y: prop.storeY,
    fill: "#ffffff",
    rx: 10,
  };

  const CaseProp = React.useMemo(() => {
    return [
      {
        key: "case1",
        x: prop.width / 2.5,
        y: 3,
        width: prop.width / 30,
        height: prop.width / 30,
        xlinkHref: caseQvest,
        text: "Упс, что-то не так",
      },
      {
        key: "case2",
        x: prop.width / 9,
        y: prop.width / 6.1,
        width: prop.width / 36,
        height: prop.width / 36,
        xlinkHref: danger,
        text: "Посмотрим, что там?",
      },
      {
        key: "case3",
        x: prop.width / 2.8,
        y: prop.width / 3.46,
        width: prop.width / 37,
        height: prop.width / 33,
        xlinkHref: forest,
        text: "Не так стоит холодильник",
      },
      {
        key: "case4",
        x: prop.width / 2.8,
        y: prop.width / 16.2,
        width: prop.width / 130,
        height: prop.width / 130,
        xlinkHref: lightbulbActive,
        text: "Лампочка не исправна",
      },
    ];
  }, [prop.width]);

  React.useEffect((): void => {
    const colisObj = (
      hero: number,
      x: number,
      y: number,
      height: number,
      width: number,
      text: string
    ): void => {
      if (
        prop.storeX < x + width &&
        prop.storeX + hero > x &&
        prop.storeY < y + height &&
        prop.storeY + hero > y
      ) {
        setOpenDial(text);
        if (prop.keyd === " ") setOpenQvest(true);
      }
    };
    setOpenDial("");
    CaseProp.forEach(({ x, y, height, width, text }) =>
      colisObj(prop.sizeCh, x, y, height, width, text)
    );
  }, [CaseProp, prop.height, prop.keyd, prop.sizeCh, prop.storeX, prop.storeY]);

  return (
    <>
      {CaseProp.map((prop) => (
        <image overflow="visible" {...prop} />
      ))}
      <>
        {openDial !== "" ? (
          <>
            <rect {...DialogProp}></rect>
            <foreignObject
              x={prop.storeX - 100}
              y={prop.storeY}
              width="100"
              height="50"
            >
              <p style={{ textAlign: "center" }}>{openDial}</p>
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
            <h1>
              Кто-то играл и ушёл. Компьютер уже долгое время включён и
              работает! Отключать питание у компьютера рекомендуют, когда
              планируете прекратить работу дольше, чем на 5 минут. Выключим его?
            </h1>
            <ButtonBox>
              <ButtonClouse onClick={() => setOpenQvest(false)}>
                Нет
              </ButtonClouse>
              <ButtonClouse onClick={() => setOpenQvest(false)}>
                Да
              </ButtonClouse>
            </ButtonBox>
          </ForObj>
        ) : (
          <></>
        )}
      </>
    </>
  );
};

export default ActiveElement;
