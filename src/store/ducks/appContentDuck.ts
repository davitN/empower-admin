import { AnyAction } from 'redux';
import { CallBacks } from '../../types/main';

export const GET_APP_CONTENT = 'socialize/locations/getAppContent';
export const SET_APP_CONTENT = 'socialize/locations/setAppContent';
export const RESET_APP_CONTENT_STATE = 'socialize/locations/resetAppContent';

const initialState: any = {
  users: null,
  userDetails: null,
};

export const appContentReducer = (state = initialState, action: AnyAction) => {
  const { payload } = action;
  switch (action.type) {
    case SET_APP_CONTENT:
      return {
        ...state,
        users: (payload as any),
      };
    case RESET_APP_CONTENT_STATE:
      return {
        ...state,
        users: null,
      };
    default:
      return state;
  }
};

export const setAppContent = (data: any) => ({
  type: SET_APP_CONTENT,
  payload: data,
});

export const getAppContent = (callbacks?: CallBacks) => ({
  type: GET_APP_CONTENT,
  callbacks,
});

export const resetAppContentState = () => ({
  type: RESET_APP_CONTENT_STATE,
});
