import { AnyAction } from 'redux';
import { ForYouItem, SaveForYou } from '../../types/forYou';
import { CallBacks } from '../../types/main';

export const GET_FOR_YOU = 'socialize/forYou/getForYou';
export const SET_FOR_YOU = 'socialize/forYou/setForYou';
export const RESET_FOR_YOU_STATE = 'socialize/forYou/resetForYouState';

export const SAVE_FOR_YOU = 'socialize/forYou/saveForYou';
export const REMOVE_FOR_YOU = 'socialize/forYou/removeForYou';

const initialState: null | ForYouItem[] = null;

export const forYouReducer = (state = initialState, action: AnyAction) => {
  const { payload } = action;
  switch (action.type) {
    case SET_FOR_YOU:
      return (payload as ForYouItem[]);
    case RESET_FOR_YOU_STATE:
      return null;
    default:
      return state;
  }
};

export const getForYou = (callbacks?: CallBacks) => ({
  type: GET_FOR_YOU,
  callbacks,
});
export const setForYou = (data: ForYouItem[]) => ({
  type: SET_FOR_YOU,
  payload: data,
});
export const resetForYouState = () => ({
  type: RESET_FOR_YOU_STATE,
});

export const saveForYou = (data: SaveForYou, callbacks?: CallBacks) => ({
  type: SAVE_FOR_YOU,
  data,
  callbacks,
});

export const removeForYou = (id: string, callbacks?: CallBacks) => ({
  type: REMOVE_FOR_YOU,
  id,
  callbacks,
});
