import { AnyAction } from 'redux';
import { AppAdminsData } from '../../types/appAdmin';
import {
  InitialStateLocations, GetLocationsOptions, GetLocationsData, SaveDataOptions, LocationItem, GetLocationDetails, GetLocationAdminsParams,
} from '../../types/locations';
import { CallBacks } from '../../types/main';

export const GET_LOCATIONS = 'socialize/locations/getLocations';
export const SET_LOCATIONS = 'socialize/locations/setLocations';
export const RESET_LOCATIONS_STATE = 'socialize/locations/resetLocationsState';

export const SAVE_LOCATION = 'socialize/locations/saveLocation';

export const GET_LOCATION_DETAILS = 'socialize/locations/getLocationDetails';
export const RESET_LOCATION_DETAILS = 'socialize/locations/resetLocationDetails';
export const SET_LOCATION_DETAILS = 'socialize/locations/setLocationDetails';

export const GET_LOCATION_ADMINS = 'socialize/locations/getLocationAdmins';
export const SET_LOCATION_ADMINS = 'socialize/locations/setLocationAdmins';
export const RESET_LOCATION_ADMINS_STATE = 'socialize/locations/resetLocationAdminsState';

const initialState: InitialStateLocations = {
  locations: null,
  locationDetails: null,
  admins: null,
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
    case SET_LOCATION_ADMINS:
      return {
        ...state,
        admins: (payload as AppAdminsData),
      };
    case RESET_LOCATION_ADMINS_STATE:
      return {
        ...state,
        admins: null,
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

export const getLocationAdmins = (params: GetLocationAdminsParams, callbacks?: CallBacks) => ({
  type: GET_LOCATION_ADMINS,
  params,
  callbacks,
});
export const setLocationAdmins = (admins: AppAdminsData) => ({
  type: SET_LOCATION_ADMINS,
  payload: admins,
});
export const resetLocationAdminsState = () => ({
  type: RESET_LOCATION_ADMINS_STATE,
});
