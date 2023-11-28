import { GameReducerType } from "../types/type/gameType";

const SETKEY = "SET_KEY_sdfsdghr333333__tyjdsWWS";

interface InitialStateType {
  data: [];
}

const initialState: InitialStateType = { data: [] };

interface TypeAction {
  type: typeof SETKEY;
  value: string;
}

const gameReducer = (state = initialState, action: TypeAction) => {
  switch (action.type) {
    case SETKEY:
      return { ...state, data: [...state.data, action.value] };
    default:
      return state;
  }
};

export const setGameAction = (value: GameReducerType) => ({
  type: SETKEY,
  value,
});

export default gameReducer;
