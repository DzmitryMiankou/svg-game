const SETKOORDX = "SET_KOORDX_sdfbsfdsDDf!fgngfnm42FDB_drbgtr$$_RF_1831";
const SETKOORDY = "SET_KOORDY_sdfbsfdssws1221sDDf!fQQgngfnm42FDB_$_RF_1833";

interface InitialStateType {
  x: number;
  y: number;
}

const initialState: InitialStateType = { x: 0, y: 0 };

interface TypeAction {
  type: typeof SETKOORDX | typeof SETKOORDY;
  value: number;
}

const koordReducer = (state = initialState, action: TypeAction) => {
  switch (action.type) {
    case SETKOORDX:
      return { ...state, x: state.x + action.value };
    case SETKOORDY:
      return { ...state, y: state.y + action.value };
    default:
      return state;
  }
};

export const setKoordActionX = (value: number) => ({
  type: SETKOORDX,
  value,
});
export const setKoordActionY = (value: number) => ({
  type: SETKOORDY,
  value,
});

export default koordReducer;
