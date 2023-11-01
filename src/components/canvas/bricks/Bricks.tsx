import React from "react";
import bricks from "../../../img/vs.png";

const Bricks: React.FC<{ width: number }> = ({ width }) => {
  const BrikcsProp = React.useMemo(() => {
    return [
      {
        key: "br1",
        x: width / 3,
        y: width / 24,
        width: width / 9,
        xlinkHref: bricks,
      },
      {
        key: "br2",
        x: width / 4.7,
        y: width / 26,
        width: width / 9,
        xlinkHref: bricks,
      },
      {
        key: "br3",
        x: width / 20,
        y: width / 26,
        width: width / 9,
        xlinkHref: bricks,
      },
      {
        key: "br4",
        x: width / 20,
        y: width / 26,
        width: width / 9,
        xlinkHref: bricks,
      },
      {
        key: "br5",
        x: 0,
        y: width / 26,
        width: width / 9,
        xlinkHref: bricks,
      },
      {
        key: "br6",
        x: 0,
        y: width / 10.5,
        width: width / 6,
        xlinkHref: bricks,
      },
      {
        key: "br7",
        x: width / 4.8,
        y: width / 7.3,
        width: width / 6,
        xlinkHref: bricks,
      },
      {
        key: "br8",
        x: width / 4.8,
        y: width / 10.5,
        width: width / 9,
        xlinkHref: bricks,
      },
      {
        key: "br9",
        x: width / 5,
        y: width / 5,
        width: width / 6,
        xlinkHref: bricks,
      },
      {
        key: "br10",
        x: width / 25,
        y: width / 5,
        width: width / 6,
        xlinkHref: bricks,
      },
      {
        key: "br11",
        x: width / 10,
        y: width / 4,
        width: width / 6,
        xlinkHref: bricks,
      },
      {
        key: "br12",
        x: width / 5,
        y: width / 2.5,
        width: width / 6,
        xlinkHref: bricks,
      },
      {
        key: "br13",
        x: 0,
        y: width / 2.55,
        width: width / 6,
        xlinkHref: bricks,
      },
      {
        key: "br14",
        x: width / 3.55,
        y: width / 2.25,
        width: width / 6,
        xlinkHref: bricks,
      },
      {
        key: "br15",
        x: width / 2.77,
        y: width / 3.1,
        width: width / 6,
        xlinkHref: bricks,
      },
      {
        key: "br15",
        x: width / 6,
        y: width / 3.1,
        width: width / 6,
        xlinkHref: bricks,
      },
    ];
  }, [width]);

  return (
    <>
      {BrikcsProp.map((props) => (
        <image {...props} />
      ))}
    </>
  );
};

export default Bricks;
