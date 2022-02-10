import { AnyAction } from 'redux';

export const SET_PAGE = 'pagination/setPage';
export const RESET_ALL_PAGE = 'pagination/resetAllPage';

const initialState: {} = {
};

export const paginationReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case SET_PAGE:
      return {
        ...state,
        ...action.payload,
      };
    case RESET_ALL_PAGE:
      return initialState;
    default:
      return state;
  }
};

export const set = (data: any) => ({
  type: SET_PAGE,
  payload: data,
});

export const reset = (data: any) => ({
  type: RESET_ALL_PAGE,
  payload: data,
});
