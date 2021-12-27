export type StatusType = 'SUCCESS' | 'DECLINED';

export interface PaymentDataType {
  amount: number,
  chargeData: string,
  clientSecret: string
  company: string,
  createdAt: string,
  currency: string,
  paidFor: string,
  paymentId: string,
  paymentMethod: string,
  status: StatusType
  succeedData: string,
  updatedAt: Date,
  _id: string
}

interface GetPaymentDataParams {
  clientSecret: string
}

export interface InitialState {
  paymentData: PaymentDataType | null
}
