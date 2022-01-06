import { AnyAction } from 'redux';
import { EthosCardsData, InitialState } from '../../types/ethosCards';
import { CallBacks, GetDataParams } from '../../types/main';

export const GET_ETHOS_CARDS = 'socialize/reports/getEthosCards';
export const SET_ETHOS_CARDS = 'socialize/reports/setEthosCards';
export const RESET_ETHOS_CARDS_STATE = 'socialize/reports/resetEthosCardsState';

const initialState: InitialState = {
  ethosCards: null,
};

export const ethosCardsReducer = (state = initialState, action: AnyAction) => {
  const { payload } = action;
  switch (action.type) {
    case SET_ETHOS_CARDS:
      return {
        ethosCards: (payload as EthosCardsData),
      };
    case RESET_ETHOS_CARDS_STATE:
      return {
        ...state,
        ethosCards: null,
      };
    default:
      return state;
  }
};

export const setEthosCards = (data: any) => ({
  type: SET_ETHOS_CARDS,
  payload: data,
});
export const getEthosCards = (params: GetDataParams, callbacks?: CallBacks) => ({
  type: GET_ETHOS_CARDS,
  params,
  callbacks,
});
export const resetEthosCardsState = () => ({
  type: RESET_ETHOS_CARDS_STATE,
});
