import React from "react";
import caseQvest from "../../../img/case.gif";
import danger from "../../../img/dangGif.gif";

interface PropType<T> {
  width: T;
  height: T;
  storeX: T;
  storeY: T;
  sizeCh: T;
}

const ActiveElement: React.FC<PropType<number>> = ({
  width,
  height,
  storeX,
  storeY,
  sizeCh,
}) => {
  const [openDial, setOpenDial] = React.useState<string>("");

  const DialogProp = {
    width: 100,
    height: 50,
    x: storeX / 1.2,
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
      }
    };
    setOpenDial("");
    CaseProp.forEach(({ x, y, height, width, text }) => {
      return colisObj(sizeCh, x, y, height, width, text);
    });
  }, [CaseProp, height, sizeCh, storeX, storeY, width]);

  return (
    <>
      {CaseProp.map((prop) => (
        <image overflow="visible" {...prop} />
      ))}
      <>
        {openDial !== "" ? (
          <>
            <rect {...DialogProp}></rect>
            <foreignObject x={storeX / 1.2} y={storeY} width="100" height="50">
              <p style={{ textAlign: "center" }}>{openDial}</p>
            </foreignObject>
          </>
        ) : (
          <></>
        )}
      </>
    </>
  );
};

export default ActiveElement;
