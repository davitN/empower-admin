import { AnyAction } from 'redux';
import { CallBacks } from '../../types/main';
import {
  InitialState, AppContentGetData, GetCommunityData, GetCommunityDataParams,
} from '../../types/appContent';

export const GET_APP_CONTENT = 'socialize/content/getAppContent';
export const SET_APP_CONTENT = 'socialize/content/setAppContent';
export const RESET_APP_CONTENT_STATE = 'socialize/content/resetAppContent';

export const GET_COMMUNITY_DATA = 'socialize/content/getCommunityData';
export const SET_COMMUNITY_DATA = 'socialize/content/setCommunityData';
export const RESET_COMMUNITY_DATA = 'socialize/content/resetCommunityData';

const initialState: InitialState = {
  communityData: null,
  ethos: null,
  gratitude: null,
  kickOff: null,
  powerDown: null,
  powerUp: null,
};

export const appContentReducer = (state = initialState, action: AnyAction) => {
  const { payload } = action;
  switch (action.type) {
    case SET_APP_CONTENT:
      return (payload as AppContentGetData);
    case RESET_APP_CONTENT_STATE:
      return initialState;
    case SET_COMMUNITY_DATA:
      return {
        ...state,
        communityData: payload as GetCommunityData,
      };
    case RESET_COMMUNITY_DATA:
      return {
        ...state,
        communityData: null,
      };
    default:
      return state as InitialState;
  }
};

export const getAppContent = (callbacks?: CallBacks) => ({
  type: GET_APP_CONTENT,
  callbacks,
});
export const setAppContent = (data: AppContentGetData) => ({
  type: SET_APP_CONTENT,
  payload: data,
});
export const resetAppContentState = () => ({
  type: RESET_APP_CONTENT_STATE,
});

export const getCommunityData = (params: GetCommunityDataParams, callbacks?: CallBacks) => ({
  type: GET_COMMUNITY_DATA,
  callbacks,
  params,
});
export const setCommunityData = (data: GetCommunityData) => ({
  type: SET_COMMUNITY_DATA,
  payload: data,
});
export const resetCommunityData = () => ({
  type: RESET_COMMUNITY_DATA,
});
