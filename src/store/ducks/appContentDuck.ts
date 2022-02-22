import { AnyAction } from 'redux';
import { CallBacks } from '../../types/main';
import {
  InitialState,
  AppContentGetData,
  GetCommunityData,
  GetCommunityDataParams,
  GetAppContentItemOptions,
  GetAppContentItemData,
  AppContentCategory,
  GetCommunityDataItem,
  GetAppContentItemInfo,
} from '../../types/appContent';

export const GET_APP_CONTENT = 'socialize/content/getAppContent';
export const SET_APP_CONTENT = 'socialize/content/setAppContent';
export const RESET_APP_CONTENT_STATE = 'socialize/content/resetAppContent';

export const GET_COMMUNITY_DATA = 'socialize/content/getCommunityData';
export const SET_COMMUNITY_DATA = 'socialize/content/setCommunityData';
export const RESET_COMMUNITY_DATA = 'socialize/content/resetCommunityData';

export const GET_APP_CONTENT_ITEM = 'socialize/content/getAppContentItem';
export const SET_APP_CONTENT_ITEM = 'socialize/content/setAppContentItem';
export const RESET_APP_CONTENT_ITEM_STATE = 'socialize/content/resetAppContentItemState';

export const SAVE_APP_CONTENT_ITEM = 'socialize/content/saveAppContentItem';
export const SAVE_COMMUNITY_DATA = 'socialize/content/saveCommunityData';
export const REMOVE_COMMUNITY_DATA = 'socialize/content/removeCommunityData';

export const GET_APP_CONTENT_CATEGORIES = 'socialize/content/getAppContentCategories';
export const SET_APP_CONTENT_CATEGORIES = 'socialize/content/setAppContentCategories';
export const RESET_APP_CONTENT_CATEGORIES_STATE = 'socialize/content/resetAppContentCategoriesState';

export const GET_COMMUNITY_DATA_ITEM = 'socialize/content/getCommunityDataItem';
export const SET_COMMUNITY_DATA_ITEM = 'socialize/content/setCommunityDataItem';
export const RESET_COMMUNITY_DATA_ITEM_STATE = 'socialize/content/resetCommunityDataItemState';

export const GET_APP_CONTENT_ITEM_INFO = 'socialize/content/getAppContentItemInfo';
export const SET_APP_CONTENT_ITEM_INFO = 'socialize/content/setAppContentItemInfo';
export const RESET_APP_CONTENT_ITEM_INFO_STATE = 'socialize/content/resetAppContentItemInfoState';

const initialState: InitialState = {
  communityData: null,
  ethos: null,
  gratitude: null,
  kickOff: null,
  powerDown: null,
  powerUp: null,
  categories: null,
  communityDataItem: null,
  appContentItemInfo: null,
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
    case SET_APP_CONTENT_ITEM:
      return {
        ...state,
        [action.payload.fieldName]: action.payload.data as GetAppContentItemData,
      };
    case RESET_APP_CONTENT_ITEM_STATE:
      return {
        ...state,
        [action.payload]: null,
      };
    case SET_APP_CONTENT_CATEGORIES:
      return {
        ...state,
        categories: payload as AppContentCategory[],
      };
    case RESET_APP_CONTENT_CATEGORIES_STATE:
      return {
        ...state,
        categories: null,
      };
    case SET_COMMUNITY_DATA_ITEM:
      return {
        ...state,
        communityDataItem: action.payload as GetCommunityDataItem,
      };
    case RESET_COMMUNITY_DATA_ITEM_STATE:
      return {
        ...state,
        communityDataItem: null,
      };
    case SET_APP_CONTENT_ITEM_INFO:
      return {
        ...state,
        appContentItemInfo: action.payload as GetAppContentItemInfo,
      };
    case RESET_APP_CONTENT_ITEM_INFO_STATE:
      return {
        ...state,
        appContentItemInfo: null,
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

export const getAppContentItem = (params: GetAppContentItemOptions, callbacks?: CallBacks) => ({
  type: GET_APP_CONTENT_ITEM,
  callbacks,
  params,
});
export const setAppContentItem = (data: GetAppContentItemData, fieldName: string) => ({
  type: SET_APP_CONTENT_ITEM,
  payload: { data, fieldName },
});
export const resetAppContentItem = (fieldName: string) => ({
  type: RESET_APP_CONTENT_ITEM_STATE,
  payload: fieldName,
});

export const saveAppContentItem = (data: any, callbacks?: CallBacks, uploadWatcher?: (val: number) => void) => ({
  type: SAVE_APP_CONTENT_ITEM,
  callbacks,
  data,
  uploadWatcher,
});

export const getAppContentCategory = () => ({
  type: GET_APP_CONTENT_CATEGORIES,
});
export const setAppContentCategory = (data: AppContentCategory[]) => ({
  type: SET_APP_CONTENT_CATEGORIES,
  payload: data,
});
export const resetAppContentCategory = () => ({
  type: RESET_APP_CONTENT_CATEGORIES_STATE,
});

export const saveCommunityData = (data: any, callbacks?: CallBacks) => ({
  type: SAVE_COMMUNITY_DATA,
  callbacks,
  data,
});

export const getCommunityDataItem = (id: string) => ({
  type: GET_COMMUNITY_DATA_ITEM,
  id,
});
export const setCommunityDataItem = (data: GetCommunityDataItem) => ({
  type: SET_COMMUNITY_DATA_ITEM,
  payload: data,
});
export const resetCommunityDataItem = () => ({
  type: RESET_COMMUNITY_DATA_ITEM_STATE,
});

export const getAppContentItemInfo = (params: { companyId: string, fieldName: string }) => ({
  type: GET_APP_CONTENT_ITEM_INFO,
  params,
});
export const setAppContentItemInfo = (data: GetAppContentItemInfo) => ({
  type: SET_APP_CONTENT_ITEM_INFO,
  payload: data,
});
export const resetAppContentItemInfo = () => ({
  type: RESET_APP_CONTENT_ITEM_INFO_STATE,
});

export const removeCommunityItem = (id: string, callbacks?: CallBacks) => ({
  type: REMOVE_COMMUNITY_DATA,
  id,
  callbacks,
});
