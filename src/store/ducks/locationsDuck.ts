import { AnyAction } from 'redux';
import {
  InitialStateLocations, GetLocationsOptions, GetLocationsData, SaveDataOptions, LocationItem, GetLocationDetails,
} from '../../types/locations';
import { CallBacks } from '../../types/main';

export const GET_LOCATIONS = 'socialize/locations/getLocations';
export const SET_LOCATIONS = 'socialize/locations/setLocations';
export const RESET_LOCATIONS_STATE = 'socialize/locations/resetLocationsState';
export const SAVE_LOCATION = 'socialize/locations/saveLocation';
export const GET_LOCATION_DETAILS = 'socialize/locations/getLocationDetails';
export const RESET_LOCATION_DETAILS = 'socialize/locations/resetLocationDetails';
export const SET_LOCATION_DETAILS = 'socialize/locations/setLocationDetails';

const initialState: InitialStateLocations = {
  locations: null,
  locationDetails: null,
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
    case GET_LOCATION_DETAILS:
      return {
        ...state,
        locationDetails: (payload as LocationItem),
      };
    case SET_LOCATION_DETAILS:
      return {
        locationDetails: (payload as LocationItem),
      };
    case RESET_LOCATION_DETAILS:
      return {
        ...state,
        locationDetails: null,
      };
    default:
      return state;
  }
};

export const setLocations = (data: GetLocationsData) => ({
  type: SET_LOCATIONS,
  payload: data,
});

export const getLocations = (data: GetLocationsOptions, callbacks?: CallBacks) => ({
  type: GET_LOCATIONS,
  data,
  callbacks,
});

export const resetLocationsState = () => ({
  type: RESET_LOCATIONS_STATE,
});

export const saveLocation = (data: SaveDataOptions, callbacks?: CallBacks) => ({
  type: SAVE_LOCATION,
  data,
  callbacks,
});

export const getLocationDetails = (locationId: GetLocationDetails, callbacks?: CallBacks) => ({
  type: GET_LOCATION_DETAILS,
  locationId,
  callbacks,
});

export const setLocationDetails = (data: LocationItem, callbacks?: CallBacks) => ({
  type: SET_LOCATION_DETAILS,
  payload: data,
  callbacks,
});

export const resetLocationDetails = () => ({
  type: RESET_LOCATION_DETAILS,
});
