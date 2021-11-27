import { AnyAction } from 'redux';

export const DEFAULT = 'socialize/main/default';
export const RESET_STORE = 'socialize/main/resetStore';
export const CHECKED_SIGNED_IN = 'socialize/main/checkedSignedIn';
export const SET_DEVICE_TOKEN = 'socialize/main/setDeviceToken';

const initialState = {
  isLoading: true,
  isSignedIn: false,
  isVerified: false,
};

export const mainReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case CHECKED_SIGNED_IN:
      return {
        ...state,
        isLoading: false,
        isSignedIn: action.isSignedIn,
      };
    case DEFAULT:
      return state;
    default:
      return state;
  }
};

export const checkedSignedInAction = (isSignedIn: boolean) => ({
  type: CHECKED_SIGNED_IN,
  isSignedIn,
});

export const resetStoreAction = (isLoading = false) => ({
  type: RESET_STORE,
  isLoading,
});
