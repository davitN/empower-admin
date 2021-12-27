import { AnyAction } from 'redux';
import { CallBacks } from '../../types/main';
import { PaymentDataType, InitialState, GetPaymentDataParams } from '../../types/payments';

export const GET_PAYMENT_DATA = 'socialize/payments/getPaymentData';
export const SET_PAYMENT_DATA = 'socialize/payments/setPaymentData';
export const RESET_PAYMENT_DATA = 'socialize/payments/resetPaymentData';

const initialState: InitialState = {
  paymentData: null,
};

export const paymentsReducer = (state = initialState, action: AnyAction) => {
  const { payload } = action;
  switch (action.type) {
    case SET_PAYMENT_DATA:
      return {
        paymentData: (payload as PaymentDataType),
      };
    case RESET_PAYMENT_DATA:
      return {
        ...state,
        paymentStatus: null,
      };
    default:
      return state;
  }
};

export const setPaymentStatus = (data: PaymentDataType) => ({
  type: SET_PAYMENT_DATA,
  payload: data,
});

export const getPaymentStatus = (params: GetPaymentDataParams, callbacks?: CallBacks) => ({
  type: GET_PAYMENT_DATA,
  params,
  callbacks,
});

export const resetPaymentStatusState = () => ({
  type: RESET_PAYMENT_DATA,
});
