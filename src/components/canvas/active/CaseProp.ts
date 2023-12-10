import refrigerator from "../../../img/frost.png";
import lightbulbActive from "../../../img/lightbulbActive.gif";
import lightbulbActive2 from "../../../img/lightbulbActive.png";
import caseQvest from "../../../img/case.gif";
import caseQvest2 from "../../../img/case.png";
import danger from "../../../img/dangGif.gif";
import door from "../../../img/door.png";
import setc from "../../../img/setc.png";
import setc2 from "../../../img/setc2.png";
import washstand from "../../../img/washstand.gif";
import washstand2 from "../../../img/washstand.png";
import windActiv from "../../../img/windActive.gif";
import wallpaper from "../../../img/wallpaper.png";
import wallpaper2 from "../../../img/wallpaper2.png";
import eas from "../../../img/eas.png";
export interface CasePropType<N extends number, S extends string> {
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
      y: Math.floor(width / 3.45),
      width: Math.floor(width / 37),
      height: Math.floor(width / 33),
      xlinkHref: refrigerator,
      newp: refrigerator,
    },
    {
      key: "case5",
      x: Math.floor(width / 1.1),
      y: Math.floor(width / 2.75),
      width: Math.floor(width / 37),
      height: Math.floor(width / 33),
      xlinkHref: door,
      newp: door,
    },
    {
      key: "case6",
      x: Math.floor(width / 15),
      y: Math.floor(width / 2.77),
      width: Math.floor(width / 37),
      height: Math.floor(width / 33),
      xlinkHref: setc,
      newp: setc2,
    },
    {
      key: "case7",
      x: Math.floor(width / 1.028),
      y: Math.floor(width / 14.5),
      width: Math.floor(width / 37),
      height: Math.floor(width / 33),
      xlinkHref: washstand,
      newp: washstand2,
    },
    {
      key: "case8",
      x: Math.floor(width / 1.728),
      y: Math.floor(width / 5.6),
      width: Math.floor(width / 23),
      height: Math.floor(width / 19),
      xlinkHref: windActiv,
      newp: windActiv,
    },
    {
      key: "case9",
      x: Math.floor(width / 1.7),
      y: Math.floor(width / 2.77),
      width: Math.floor(width / 5.2),
      height: Math.floor(width / 30),
      xlinkHref: wallpaper,
      newp: wallpaper2,
    },
    {
      key: "case10",
      x: Math.floor(width / 1.8),
      y: Math.floor(width / 7.2),
      width: Math.floor(width / 20),
      height: Math.floor(width / 40),
      xlinkHref: eas,
      newp: eas,
    },
  ];
};

export { CaseProp };
