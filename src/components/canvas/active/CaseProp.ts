import refrigerator from "../../../img/frost.png";
import lightbulbActive from "../../../img/lightbulbActive.gif";
import lightbulbActive2 from "../../../img/lightbulbActive.png";
import caseQvest from "../../../img/case.gif";
import caseQvest2 from "../../../img/case.png";
import danger from "../../../img/dangGif.gif";

interface CasePropType<N extends number, S extends string> {
  key: S;
  x: N;
  y: N;
  width: N;
  height: N;
  xlinkHref: S;
  newp?: S;
}

const CaseProp = (width: number): CasePropType<number, string>[] => {
  return [
    {
      key: "case1",
      x: Math.floor(width / 2.5),
      y: 3,
      width: Math.floor(width / 32),
      height: Math.floor(width / 32),
      xlinkHref: caseQvest,
      newp: caseQvest2,
    },
    {
      key: "case2",
      x: Math.floor(width / 2.8),
      y: Math.floor(width / 16.2),
      width: Math.floor(width / 130),
      height: Math.floor(width / 130),
      xlinkHref: lightbulbActive,
      newp: lightbulbActive2,
    },
    {
      key: "case3",
      x: Math.floor(width / 9),
      y: Math.floor(width / 6.1),
      width: Math.floor(width / 36),
      height: Math.floor(width / 36),
      xlinkHref: danger,
    },
    {
      key: "case4",
      x: Math.floor(width / 2.8),
      y: Math.floor(width / 3.46),
      width: Math.floor(width / 37),
      height: Math.floor(width / 33),
      xlinkHref: refrigerator,
    },
  ];
};

export { CaseProp };
