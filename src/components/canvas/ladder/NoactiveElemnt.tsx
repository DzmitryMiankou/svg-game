import React from "react";
import ladder from "../../../img/ladder.png";
import flo from "../../../img/flo.png";
import windows from "../../../img/window.png";
import light from "../../../img/lightbulb.png";

const NoactiveElemnt: React.FC<{ width: number; height: number }> = ({
  width,
  height,
}) => {
  const noActiveElemntProp = React.useMemo(() => {
    return [
      {
        key: "Noactive1",
        x: width / 8.6,
        y: width / 30,
        width: width / 7,
        height: width / 9,
        xlinkHref: ladder,
      },
      {
        key: "Noactive2",
        x: width / 2.97,
        y: width / 10.4,
        width: width / 7,
        height: width / 9,
        xlinkHref: ladder,
      },
      {
        key: "Noactive3",
        x: width / 25,
        y: height / 63,
        width: width / 35,
        height: width / 35,
        xlinkHref: flo,
      },
      {
        key: "Noactive4",
        x: width / 16,
        y: height / 48,
        width: width / 40,
        height: width / 40,
        xlinkHref: flo,
      },
      {
        key: "Noactive5",
        x: 0,
        y: width / 4.9,
        width: width / 23,
        height: height / 4.5,
        xlinkHref: ladder,
      },
      {
        key: "Noactive6",
        x: width / 10,
        y: height / 20,
        width: width / 23,
        height: height / 4.5,
        xlinkHref: windows,
      },
      {
        key: "Noactive7",
        x: width / 28,
        y: height / 20,
        width: width / 23,
        height: height / 4.5,
        xlinkHref: windows,
      },
      {
        key: "Noactive8",
        x: width / 7,
        y: 1,
        width: 12,
        height: 12,
        xlinkHref: light,
      },
      {
        key: "Noactive9",
        x: width / 3,
        y: 1,
        width: 12,
        height: 12,
        xlinkHref: light,
      },
      {
        key: "Noactive10",
        x: width / 4,
        y: height / 7.9,
        width: 12,
        height: 12,
        xlinkHref: light,
      },
    ];
  }, [height, width]);

  return (
    <>
      {noActiveElemntProp.map((prop) => (
        <image overflow="visible" {...prop} />
      ))}
    </>
  );
};

export default NoactiveElemnt;
