import bricks from "../../img/vs.png";
import bricks1 from "../../img/vs1.png";
import ladder from "../../img/ladder.png";
import ladderShort from "../../img/ladder_short.png";
import flo from "../../img/flo.png";
import flo2 from "../../img/flo2.png";
import windows from "../../img/window.gif";
import light from "../../img/lightbulb.png";
import armch from "../../img/armch.png";
import armch2 from "../../img/armch2.png";
import table from "../../img/table.png";
import batteries from "../../img/batteries.png";
import batteriesAct from "../../img/batteriesActive.gif";
import sofa from "../../img/sofa.png";
import endGameImg from "../../img/endGameImg.png";
import washer from "../../img/gsg.gif";
import door from "../../img/door.png";

export interface LabyrinthPropType<T extends number> {
  key: T;
  x: T;
  y: T;
  width: T;
  height: T;
}

interface BrikcsPropType<T extends number> {
  key: string | number;
  x: T;
  y: T;
  width: T;
  xlinkHref: string;
}

const labyrinthProp = (width: number): LabyrinthPropType<number>[] => {
  return [
    {
      key: 1,
      x: width / 2.2,
      y: 0,
      width: width / 1.8,
      height: width / 15,
    },
    {
      key: 2,
      x: width / 2.3,
      y: 0,
      width: width / 35,
      height: width / 3.6,
    },
    {
      key: 3,
      x: 0,
      y: width / 32,
      width: width / 6,
      height: width / 32.7,
    },
    {
      key: 4,
      x: width / 4.8,
      y: width / 32,
      width: width / 4.2,
      height: width / 32.7,
    },
    {
      key: 5,
      x: 0,
      y: width / 10.8,
      width: width / 2.55,
      height: width / 14.5,
    },
    {
      key: 6,
      x: width / 25,
      y: width / 5.13,
      width: width / 2.363,
      height: width / 11,
    },
    {
      key: 7,
      x: width / 6,
      y: width / 3.13,
      width: width / 3,
      height: width / 25,
    },
    {
      key: 8,
      x: 0,
      y: width / 3.13,
      width: width / 8,
      height: width / 25,
    },
    {
      key: 9,
      x: 0,
      y: width / 2.55,
      width: width / 2,
      height: width / 9,
    },
    {
      key: 10,
      x: width / 2,
      y: width / 9.5,
      width: width / 35,
      height: width / 2,
    },
    {
      key: 11,
      x: width / 2,
      y: width / 10,
      width: width / 8,
      height: width / 35,
    },
    {
      key: 12,
      x: width / 1.5,
      y: width / 10,
      width: width / 3,
      height: width / 35,
    },
    {
      key: 13,
      x: Math.floor(width / 2),
      y: Math.floor(width / 6.24),
      width: Math.floor(width / 3.5),
      height: Math.floor(width / 34),
    },
    {
      key: 14,
      x: Math.floor(width / 1.2),
      y: Math.floor(width / 6.24),
      width: Math.floor(width / 6),
      height: Math.floor(width / 34),
    },
    {
      key: 15,
      x: Math.floor(width / 1.756),
      y: Math.floor(width / 4.53),
      width: Math.floor(width / 2.56),
      height: Math.floor(width / 7.1),
    },
    {
      key: 16,
      x: Math.floor(width / 2),
      y: Math.floor(width / 2.54),
      width: Math.floor(width / 2),
      height: Math.floor(width / 9),
    },
  ];
};

const BrikcsProp = (width: number): BrikcsPropType<number>[] => {
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
      key: "br16",
      x: width / 15,
      y: width / 2.2,
      width: width / 6,
      xlinkHref: bricks,
    },
    {
      key: "br17",
      x: width / 6,
      y: width / 3.1,
      width: width / 6,
      xlinkHref: bricks,
    },
    {
      key: "br18",
      x: 0,
      y: width / 7.435,
      width: width / 6,
      xlinkHref: bricks,
    },
    {
      key: "br19",
      x: 0,
      y: width / 3,
      width: width / 19,
      xlinkHref: bricks1,
    },
    {
      key: "br20",
      x: width / 15,
      y: width / 3,
      width: width / 30,
      xlinkHref: bricks1,
    },
    {
      key: "br21",
      x: width / 2.35,
      y: width / 4,
      width: width / 30,
      xlinkHref: bricks1,
    },
    {
      key: "br22",
      x: width / 2.25,
      y: 0,
      width: width / 7,
      xlinkHref: bricks,
    },
    {
      key: "br23",
      x: width / 2,
      y: width / 25,
      width: width / 7,
      xlinkHref: bricks,
    },
    {
      key: "br24",
      x: width / 1.5,
      y: 0,
      width: width / 5,
      xlinkHref: bricks,
    },
    {
      key: "br25",
      x: Math.floor(width / 2),
      y: Math.floor(width / 2.5),
      width: Math.floor(width / 5),
      xlinkHref: bricks,
    },
    {
      key: "br26",
      x: Math.floor(width / 1.5),
      y: Math.floor(width / 4.5),
      width: Math.floor(width / 5),
      xlinkHref: bricks,
    },
    {
      key: "br27",
      x: Math.floor(width / 1.7),
      y: Math.floor(width / 3.6),
      width: Math.floor(width / 5),
      xlinkHref: bricks,
    },
    {
      key: "br28",
      x: Math.floor(width / 2),
      y: Math.floor(width / 5),
      width: Math.floor(width / 35),
      xlinkHref: bricks1,
    },
    {
      key: "br29",
      x: Math.floor(width / 1.95),
      y: Math.floor(width / 6),
      width: Math.floor(width / 30),
      xlinkHref: bricks1,
    },
    {
      key: "br30",
      x: Math.floor(width / 1.32),
      y: Math.floor(width / 3.05),
      width: Math.floor(width / 5),
      xlinkHref: bricks,
    },
    {
      key: "br31",
      x: Math.floor(width / 1.62),
      y: Math.floor(width / 6.05),
      width: Math.floor(width / 8),
      xlinkHref: bricks,
    },
    {
      key: "br32",
      x: Math.floor(width / 1.2),
      y: Math.floor(width / 6.05),
      width: Math.floor(width / 8),
      xlinkHref: bricks,
    },
    {
      key: "br33",
      x: Math.floor(width / 1.1),
      y: Math.floor(width / 9.5),
      width: Math.floor(width / 8),
      xlinkHref: bricks,
    },
    {
      key: "br34",
      x: Math.floor(width / 1.4),
      y: Math.floor(width / 9.5),
      width: Math.floor(width / 8),
      xlinkHref: bricks,
    },
  ];
};

const noActiveElemntProp = (width: number): BrikcsPropType<number>[] => {
  return [
    {
      key: "Noactive1",
      x: width / 5.75,
      y: width / 30,
      width: width / 35,
      xlinkHref: ladder,
    },
    {
      key: "Noactive2",
      x: width / 2.5,
      y: width / 10.6,
      width: width / 35,
      xlinkHref: ladder,
    },
    {
      key: "Noactive3",
      x: Math.floor(width / 25),
      y: Math.floor(width / 340),
      width: Math.floor(width / 45),
      xlinkHref: flo,
    },
    {
      key: "Noactive4",
      x: Math.floor(width / 16),
      y: Math.floor(width / 340),
      width: Math.floor(width / 45),
      xlinkHref: flo,
    },
    {
      key: "Noactive5",
      x: width / 120,
      y: width / 5.1,
      width: width / 35,
      xlinkHref: ladder,
    },
    {
      key: "Noactive6",
      x: width / 10,
      y: width / 15.7,
      width: width / 23,
      xlinkHref: windows,
    },
    {
      key: "Noactive7",
      x: width / 28,
      y: width / 15.7,
      width: width / 23,
      xlinkHref: windows,
    },
    {
      key: "Noactive8",
      x: width / 7,
      y: 1,
      width: width / 130,
      xlinkHref: light,
    },
    {
      key: "Noactive9",
      x: width / 3,
      y: 1,
      width: width / 130,
      xlinkHref: light,
    },
    {
      key: "Noactive10",
      x: Math.floor(width / 4),
      y: Math.floor(width / 16.4),
      width: Math.floor(width / 130),
      xlinkHref: light,
    },
    {
      key: "Noactive11",
      x: Math.floor(width / 2.69),
      y: Math.floor(width / 88),
      width: Math.floor(width / 48),
      xlinkHref: armch,
    },
    {
      key: "Noactive12",
      x: width / 3.1,
      y: width / 65,
      width: width / 65,
      xlinkHref: flo2,
    },
    {
      key: "Noactive13",
      x: width / 3.3,
      y: width / 3.35,
      width: width / 20,
      xlinkHref: table,
    },
    {
      key: "Noactive14",
      x: width / 2.63,
      y: width / 3.31,
      width: width / 36,
      xlinkHref: batteries,
    },
    {
      key: "Noactive15",
      x: width / 3.63,
      y: width / 3.31,
      width: width / 65,
      xlinkHref: flo2,
    },
    {
      key: "Noactive16",
      x: width / 2.33,
      y: width / 3.44,
      width: width / 45,
      xlinkHref: flo,
    },
    {
      key: "Noactive17",
      x: width / 5.23,
      y: width / 5.99,
      width: width / 45,
      xlinkHref: flo,
    },
    {
      key: "Noactive18",
      x: width / 4,
      y: width / 5.7,
      width: width / 15,
      xlinkHref: sofa,
    },
    {
      key: "Noactive19",
      x: width / 7.55,
      y: width / 3.13,
      width: width / 35,
      xlinkHref: ladder,
    },
    {
      key: "Noactive20",
      x: width / 13,
      y: width / 3.47,
      width: width / 42,
      xlinkHref: flo,
    },
    {
      key: "Noactive21",
      x: width / 15,
      y: width / 6.2,
      width: width / 130,
      xlinkHref: light,
    },
    {
      key: "Noactive22",
      x: width / 3,
      y: width / 6.2,
      width: width / 130,
      xlinkHref: light,
    },
    {
      key: "Noactive23",
      x: width / 5,
      y: width / 3.5,
      width: width / 130,
      xlinkHref: light,
    },
    {
      key: "Noactive24",
      x: Math.floor(width / 2.14),
      y: Math.floor(width / 5.1),
      width: Math.floor(width / 35),
      xlinkHref: ladder,
    },
    {
      key: "Noactive25",
      x: Math.floor(width / 2.14),
      y: Math.floor(width / 14),
      width: Math.floor(width / 35),
      xlinkHref: ladder,
    },
    {
      key: "Noactive26",
      x: Math.floor(width / 12.5),
      y: Math.floor(width / 13),
      width: Math.floor(width / 65),
      xlinkHref: flo2,
    },
    {
      key: "Noactive27",
      x: Math.floor(width / 3),
      y: Math.floor(width / 13),
      width: Math.floor(width / 65),
      xlinkHref: flo2,
    },
    {
      key: "Noactive28",
      x: Math.floor(width / 1.866),
      y: Math.floor(width / 4.5),
      width: Math.floor(width / 35),
      xlinkHref: ladder,
    },
    {
      key: "Noactive29",
      x: Math.floor(width / 1.866),
      y: Math.floor(width / 2.88),
      width: Math.floor(width / 35),
      xlinkHref: ladder,
    },
    {
      key: "Noactive30",
      x: Math.floor(width / 1.037),
      y: Math.floor(width / 4.5),
      width: Math.floor(width / 35),
      xlinkHref: ladder,
    },
    {
      key: "Noactive31",
      x: Math.floor(width / 1.037),
      y: Math.floor(width / 2.88),
      width: Math.floor(width / 35),
      xlinkHref: ladder,
    },
    {
      key: "Noactive32",
      x: Math.floor(width / 1.2),
      y: Math.floor(width / 7.5),
      width: Math.floor(width / 45),
      xlinkHref: flo,
    },
    {
      key: "Noactive33",
      x: Math.floor(width / 1.5),
      y: Math.floor(width / 5.2),
      width: Math.floor(width / 45),
      xlinkHref: flo,
    },
    {
      key: "Noactive35",
      x: Math.floor(width / 1.4),
      y: Math.floor(width / 5.2),
      width: Math.floor(width / 23),
      xlinkHref: windows,
    },
    {
      key: "Noactive36",
      x: Math.floor(width / 1.4),
      y: Math.floor(width / 12),
      width: Math.floor(width / 65),
      xlinkHref: flo2,
    },
    {
      key: "Noactive37",
      x: Math.floor(width / 1.8),
      y: Math.floor(width / 12),
      width: Math.floor(width / 65),
      xlinkHref: flo2,
    },
    {
      key: "Noactive38",
      x: Math.floor(width / 1.17),
      y: Math.floor(width / 2.75),
      width: Math.floor(width / 20),
      xlinkHref: endGameImg,
    },
    {
      key: "Noactive39",
      x: Math.floor(width / 1.58),
      y: Math.floor(width / 10),
      width: Math.floor(width / 35),
      xlinkHref: ladderShort,
    },
    {
      key: "Noactive40",
      x: Math.floor(width / 1.254),
      y: Math.floor(width / 6.2),
      width: Math.floor(width / 35),
      xlinkHref: ladderShort,
    },
    {
      key: "Noactive41",
      x: Math.floor(width / 26),
      y: Math.floor(width / 2.69),
      width: Math.floor(width / 48),
      xlinkHref: armch2,
    },
    {
      key: "Noactive42",
      x: Math.floor(width / 1.89),
      y: Math.floor(width / 7.55),
      width: Math.floor(width / 46),
      xlinkHref: washer,
    },
    {
      key: "Noactive43",
      x: Math.floor(width / 1.6),
      y: Math.floor(width / 4.93),
      width: width / 36,
      xlinkHref: batteriesAct,
    },
    {
      key: "Noactive44",
      x: Math.floor(width / 1.1),
      y: Math.floor(width / 2.75),
      width: Math.floor(width / 50),
      xlinkHref: door,
    },
  ];
};

export { labyrinthProp, BrikcsProp, noActiveElemntProp };
