export type GameReducerType = { id: string };

export type CharacterSizeType = { size: number; step: number };

export type JSONgameType<S extends string> = {
  text: S;
  qvest: S;
  answer: S;
};

export type AnswerGameType = "Да" | "Нет";
