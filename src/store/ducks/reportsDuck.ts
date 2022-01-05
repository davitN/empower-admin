import { AnyAction } from 'redux';
import { CallBacks } from '../../types/main';
import { ReportsCompanyDetails, InitialState } from '../../types/reports';

export const GET_REPORTS_COMPANY = 'socialize/reports/getReportsCompany';
export const SET_REPORTS_COMPANY = 'socialize/reports/setReportsCompany';
export const RESET_REPORTS_COMPANY_STATE = 'socialize/reports/resetReportsCompaniesSty';

const initialState: InitialState = {
  companyDetails: null,
};

export const reportsReducer = (state = initialState, action: AnyAction) => {
  const { payload } = action;
  switch (action.type) {
    case SET_REPORTS_COMPANY:
      return {
        companies: (payload as ReportsCompanyDetails),
      };
    case RESET_REPORTS_COMPANY_STATE:
      return {
        ...state,
        companies: null,
      };
    default:
      return state;
  }
};

export const setReportsCompany = (companies: any) => ({
  type: SET_REPORTS_COMPANY,
  payload: companies,
});
export const getReportsCompany = (params: { companyId: string }, callbacks?: CallBacks) => ({
  type: GET_REPORTS_COMPANY,
  params,
  callbacks,
});
export const resetReportsCompanyState = () => ({
  type: RESET_REPORTS_COMPANY_STATE,
});
