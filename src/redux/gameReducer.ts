const SETKEY = "SET_KEY_sdfsdghr333333__tyjdsWWS";

interface InitialStateType {
  id: string | number;
}

const initialState: InitialStateType = { id: 0 };

interface TypeAction {
  type: typeof SETKEY;
  value: number | string;
}

const gameReducer = (state = initialState, action: TypeAction) => {
  switch (action.type) {
    case SETKEY: {
      return { ...state, id: action.value };
    }

    default:
      return state;
  }
};

export const setGameAction = (value: number | string) => ({
  type: SETKEY,
  value,
});

export default gameReducer;
