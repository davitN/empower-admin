import { AnyAction } from 'redux';
import {
  LibrariesFetchedData, InitialState, SaveAppLibrary,
} from '../../types/appLibrary';
import { CallBacks, GetDataParams } from '../../types/main';

export const GET_APP_LIBRARIES = 'socialize/appLibraries/getAppLibraries';
export const SET_APP_LIBRARIES = 'socialize/appLibraries/setAppLibraries';
export const RESET_APP_LIBRARIES_STATE = 'socialize/appLibraries/resetAppLibrariesState';

export const SAVE_APP_LIBRARY = 'socialize/appLibraries/saveAppLibrary';
export const REMOVE_APP_LIBRARY = 'socialize/appLibraries/removeAppLibrary';

const initialState: InitialState = {
  libraries: null,
};

export const appLibrariesReducer = (state = initialState, action: AnyAction) => {
  const { payload } = action;
  switch (action.type) {
    case SET_APP_LIBRARIES:
      return {
        ...state,
        libraries: (payload as LibrariesFetchedData),
      };
    case RESET_APP_LIBRARIES_STATE:
      return {
        ...state,
        libraries: null,
      };
    default:
      return state;
  }
};

export const getAppLibraries = (params: GetDataParams, callbacks?: CallBacks) => ({
  type: GET_APP_LIBRARIES,
  params,
  callbacks,
});
export const setAppLibraries = (data: LibrariesFetchedData) => ({
  type: SET_APP_LIBRARIES,
  payload: data,
});
export const resetAppLibrariesState = () => ({
  type: RESET_APP_LIBRARIES_STATE,
});

export const saveAppLibrary = (data: SaveAppLibrary, callbacks?: CallBacks) => ({
  type: SAVE_APP_LIBRARY,
  data,
  callbacks,
});

export const removeAppLibrary = (id: string, callbacks?: CallBacks) => ({
  type: REMOVE_APP_LIBRARY,
  id,
  callbacks,
});
