import { AnyAction } from 'redux';
import { AnalyticsData, InitialState } from '../../types/analytics';
import { CallBacks } from '../../types/main';

export const GET_ANALYTICS = 'socialize/analytics/getAnalytics';
export const SET_ANALYTICS = 'socialize/analytics/setAnalytics';
export const RESET_ANALYTICS_STATE = 'socialize/analytics/resetAnalyticsState';

const initialState: InitialState = {
  analytics: null,
};

export const analyticsReducer = (state = initialState, action: AnyAction) => {
  const { payload } = action;
  switch (action.type) {
    case SET_ANALYTICS:
      return {
        analytics: payload as AnalyticsData,
      };
    case RESET_ANALYTICS_STATE:
      return {
        ...state,
        analytics: null,
      };
    default:
      return state;
  }
};

export const getAnalytics = (companyId?: string, locationId?: string, callbacks?: CallBacks) => ({
  type: GET_ANALYTICS,
  companyId,
  locationId,
  callbacks,
});

export const setAnalytics = (data: AnalyticsData) => ({
  type: SET_ANALYTICS,
  payload: data,
});

export const resetAnalyticsState = () => ({
  type: RESET_ANALYTICS_STATE,
});
