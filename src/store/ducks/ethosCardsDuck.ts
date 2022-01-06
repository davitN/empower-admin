import { AnyAction } from 'redux';
import {
  EthosCard, EthosCardsData, InitialState, SaveParamsTypes,
} from '../../types/ethosCards';
import { CallBacks, GetDataParams } from '../../types/main';

export const GET_ETHOS_CARDS = 'socialize/reports/getEthosCards';
export const SET_ETHOS_CARDS = 'socialize/reports/setEthosCards';
export const RESET_ETHOS_CARDS_STATE = 'socialize/reports/resetEthosCardsState';

export const GET_ETHOS_CARD_DETAILS = 'socialize/reports/getEthosCardDetails';
export const SET_ETHOS_CARD_DETAILS = 'socialize/reports/setEthosCardDetails';
export const RESET_ETHOS_CARD_DETAILS_STATE = 'socialize/reports/resetEthosCardDetailsState';

export const SAVE_ETHOS_CARD_DETAILS = 'socialize/reports/saveEthosCardDetails';

const initialState: InitialState = {
  ethosCards: null,
  ethosCardDetails: null,
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
    case SET_ETHOS_CARD_DETAILS:
      return {
        ...state,
        ethosCardDetails: (payload as EthosCard),
      };
    case RESET_ETHOS_CARD_DETAILS_STATE:
      return {
        ...state,
        ethosCardDetails: null,
      };
    default:
      return state;
  }
};

export const getEthosCards = (params: GetDataParams, callbacks?: CallBacks) => ({
  type: GET_ETHOS_CARDS,
  params,
  callbacks,
});
export const setEthosCards = (data: any) => ({
  type: SET_ETHOS_CARDS,
  payload: data,
});
export const resetEthosCardsState = () => ({
  type: RESET_ETHOS_CARDS_STATE,
});

export const getEthosCardDetails = (id: string, callbacks?: CallBacks) => ({
  type: GET_ETHOS_CARD_DETAILS,
  id,
  callbacks,
});
export const setEthosCardDetails = (data: any) => ({
  type: SET_ETHOS_CARD_DETAILS,
  payload: data,
});
export const resetEthosCardDetailsState = () => ({
  type: RESET_ETHOS_CARD_DETAILS_STATE,
});

export const saveEthosCardDetails = (params: SaveParamsTypes, callbacks?: CallBacks) => ({
  type: SAVE_ETHOS_CARD_DETAILS,
  params,
  callbacks,
});
