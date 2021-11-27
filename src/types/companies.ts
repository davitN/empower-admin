export interface GetDataOptions {
  offset: number,
  limit: number
}

export interface DataTypes {
  code: string
  createdAt: string
  individualLocationPaymentPage: string
  individualLocationPrice: number
  locationCount: number
  logo: {
    height: number,
    width: number,
    imgURL: string
  }
  name: string
  paymentType: string
  showTeamSection: boolean
  updatedAt: string
  userCount: number
  __v: number
  _id: string
}
