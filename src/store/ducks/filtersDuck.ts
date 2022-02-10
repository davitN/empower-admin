import { AnyAction } from 'redux';

export const SET_FILTERS = 'filters/setPage';
export const RESET_ALL_FILTERS = 'filters/resetAllPage';

const initialState: {} = {
};

export const filtersReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case SET_FILTERS:
      return {
        ...state,
        ...action.payload,
      };
    case RESET_ALL_FILTERS:
      return initialState;
    default:
      return state;
  }
};

export const set = (data: any) => ({
  type: SET_FILTERS,
  payload: data,
});

export const reset = (data: any) => ({
  type: RESET_ALL_FILTERS,
  payload: data,
});
