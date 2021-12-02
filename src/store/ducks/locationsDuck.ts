import { AnyAction } from 'redux';
import { InitialStateLocations, GetLocationsOptions, GetLocationsData } from '../../types/locations';
import { CallBacks } from '../../types/main';

export const GET_LOCATIONS = 'socialize/locations/getLocations';
export const SET_LOCATIONS = 'socialize/locations/setLocations';
export const RESET_LOCATIONS_STATE = 'socialize/locations/resetLocationsState';
export const SAVE_LOCATION = 'socialize/locations/saveLocation';

const initialState: InitialStateLocations = {
  locations: null,
};

export const locationsReducer = (state = initialState, action: AnyAction) => {
  const { payload } = action;
  switch (action.type) {
    case SET_LOCATIONS:
      return {
        locations: (payload as GetLocationsData),
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

export const setLocations = (data: GetLocationsData) => ({
  type: SET_LOCATIONS,
  payload: data,
});

export const getLocations = (data: GetLocationsOptions, callbacks?: CallBacks) => {
  return {
    type: GET_LOCATIONS,
    data,
    callbacks,
  };
};

export const resetLocationsState = () => ({
  type: RESET_LOCATIONS_STATE,
});

export const saveLocation = (data, callbacks?: CallBacks) => ({
  type: SAVE_LOCATION,
  data,
  callbacks,
});
