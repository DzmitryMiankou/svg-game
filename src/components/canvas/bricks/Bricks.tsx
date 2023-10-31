import React from "react";
import bricks from "../../../img/vs.png";

const Bricks: React.FC<{ width: number }> = ({ width }) => {
  const BrikcsProp = React.useMemo(() => {
    return [
      {
        key: "br1",
        x: width / 3,
        y: width / 24,
        width: width / 40,
        xlinkHref: bricks,
      },
      {
        key: "br2",
        x: width / 2.6,
        y: width / 29,
        width: width / 45,
        xlinkHref: bricks,
      },
      {
        key: "br3",
        x: width / 3.6,
        y: width / 27,
        width: width / 70,
        xlinkHref: bricks,
      },
      {
        key: "br4",
        x: width / 3.4,
        y: width / 22,
        width: width / 70,
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
