import React from "react";
import caseQvest from "../../../img/case.gif";
import danger from "../../../img/dangGif.gif";
import styled from "styled-components";

const ForObj = styled.foreignObject`
  background-color: #c1e9da;
  border: 8px solid red;
  display: flex;
  flex-direction: column;
  text-align: center;
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
}

const ActiveElement: React.FC<PropType<number>> = ({
  width,
  height,
  storeX,
  storeY,
  sizeCh,
  keyd,
}) => {
  const [openDial, setOpenDial] = React.useState<string>("");
  const [openQvest, setOpenQvest] = React.useState<boolean>(false);

  const DialogProp = {
    width: 100,
    height: 50,
    x: storeX - 88,
    y: storeY,
    fill: "#ffffff",
    rx: 10,
  };

  const CaseProp = React.useMemo(() => {
    return [
      {
        key: "case1",
        x: width / 2.5,
        y: 3,
        width: width / 30,
        height: width / 30,
        xlinkHref: caseQvest,
        text: "Упс, что-то не так",
      },
      {
        key: "case2",
        x: width / 3.8,
        y: width / 6,
        width: width / 36,
        height: width / 36,
        xlinkHref: danger,
        text: "Посмотрим, что там?",
      },
    ];
  }, [width]);

  React.useEffect(() => {
    const colisObj = (
      hero: number,
      x: number,
      y: number,
      height: number,
      width: number,
      text: string
    ) => {
      if (
        storeX < x + width &&
        storeX + hero > x &&
        storeY < y + height &&
        storeY + hero > y
      ) {
        setOpenDial(text);
        if (keyd === " ") setOpenQvest(true);
      }
    };
    setOpenDial("");
    CaseProp.forEach(({ x, y, height, width, text }) => {
      return colisObj(sizeCh, x, y, height, width, text);
    });
  }, [CaseProp, height, keyd, sizeCh, storeX, storeY, width]);

  return (
    <>
      {CaseProp.map((prop) => (
        <image overflow="visible" {...prop} />
      ))}
      <>
        {openDial !== "" ? (
          <>
            <rect {...DialogProp}></rect>
            <foreignObject x={storeX - 88} y={storeY} width="100" height="50">
              <p style={{ textAlign: "center" }}>{openDial}</p>
            </foreignObject>
          </>
        ) : (
          <></>
        )}
      </>
      <>
        {openQvest ? (
          <ForObj x={width / 4} y={height / 4} width="50%" height="50%">
            <h1>
              Кто-то играл и ушёл. Компьютер уже долго время включён и работает!
              Отключать питание у компьютера рекомендуют, когда планируете
              прекратить работу дольше, чем на 5 минут. Выключим его?
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
