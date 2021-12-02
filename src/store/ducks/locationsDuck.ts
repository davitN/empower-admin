import { AnyAction } from 'redux';

import { CallBacks } from '../../types/main';

export const GET_LOCATIONS = 'socialize/locations/getLocations';
export const SET_LOCATIONS = 'socialize/locations/setLocations';
export const RESET_LOCATIONS_STATE = 'socialize/locations/resetLocationsState';

const initialState = {
  locations: null,
};

export const locationsReducer = (state = initialState, action: AnyAction) => {
  const { payload } = action;
  switch (action.type) {
    case SET_LOCATIONS:
      return {
        locations: (payload as any),
      };
    case RESET_LOCATIONS_STATE:
      return {
        ...state,
        locations: null,
      };
    default:
      return state;
  }
};

export const setLocations = (locations: any) => ({
  type: SET_LOCATIONS,
  payload: locations,
});

export const getLocations = (data: any, callbacks?: CallBacks) => {
  return {
    type: GET_LOCATIONS,
    data,
    callbacks,
  };
};

export const resetLocationsState = () => ({
  type: RESET_LOCATIONS_STATE,
});
