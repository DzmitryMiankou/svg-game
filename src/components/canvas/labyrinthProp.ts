interface LabyrinthProp<T> {
  key: T;
  x: T;
  y: T;
  width: T;
  height: T;
}

export const labyrinthProp = (width: number): LabyrinthProp<number>[] => {
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
      height: width / 34,
    },
    {
      key: 4,
      x: width / 4.8,
      y: width / 32,
      width: width / 4.2,
      height: width / 34,
    },
    {
      key: 5,
      x: 0,
      y: width / 10.6,
      width: width / 2.55,
      height: width / 15,
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
      y: width / 10,
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
      x: width / 2,
      y: width / 6.3,
      width: width / 3.5,
      height: width / 35,
    },
    {
      key: 14,
      x: width / 1.2,
      y: width / 6.3,
      width: width / 6,
      height: width / 35,
    },
  ];
};
