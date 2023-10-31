import React from "react";
import caseQvest from "../../../img/case.gif";
import danger from "../../../img/dangGif.gif";
import styled from "styled-components";
import img from "../../../img/pixel-art-santa-claus-with-a-bag-of-gifts-isolated-on-white-background-8-bit-christmas-character-winter-holiday-clipart-old-school-vintage-retro-80s-90s-slot-machinevideo-game-graphics-700-224060105.png";
import img2 from "../../../img/2.png";
import audio from "../../../audio/SpaceHarrierTheme.mp3";

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
  revers: boolean;
  CharacterProp: { size: T; step: T };
}

const ActiveElement: React.FC<PropType<number>> = (prop) => {
  const [openDial, setOpenDial] = React.useState<string>("");
  const [openQvest, setOpenQvest] = React.useState<boolean>(false);

  const music = React.useMemo(() => {
    return new Audio(audio);
  }, []);

  const handlePlay = React.useCallback(() => {
    music.loop = true;
    music.play();
  }, [music]);

  const CharacterRect = {
    x: prop.storeX,
    y: prop.storeY,
    width: prop.CharacterProp.size,
    height: prop.CharacterProp.size,
  };

  const DialogProp = {
    width: 100,
    height: 50,
    x: prop.storeX - 88,
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
        x: prop.width / 3.8,
        y: prop.width / 6,
        width: prop.width / 36,
        height: prop.width / 36,
        xlinkHref: danger,
        text: "Посмотрим, что там?",
      },
    ];
  }, [prop.width]);

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
    CaseProp.forEach(({ x, y, height, width, text }) => {
      return colisObj(prop.sizeCh, x, y, height, width, text);
    });
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
              x={prop.storeX - 88}
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
          onClick={handlePlay}
          {...CharacterRect}
          xlinkHref={prop.revers ? img2 : img}
        />
        {openQvest ? (
          <ForObj
            x={prop.width / 4}
            y={prop.height / 4}
            width="50%"
            height="50%"
          >
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
