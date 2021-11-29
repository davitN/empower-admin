export interface InitialStateGetCompanies {
  companies: {
    data: CompanyItem[] | null,
    count: number
  } | null;
}
export interface GetCompaniesOptions {
  offset: number,
  limit: number,
  searchWord?: string | null
}
export interface CompanyItem {
  code: string
  createdAt: string
  individualLocationPaymentPage: string
  individualLocationPrice: number
  locationCount: number,
  location?: {
    data: any[],
    count: number
  }
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

export interface CompaniesTypes {
  count: number,
  data: CompanyItem[]
}

export interface InitialStateGetCompanyDetails {
  company?: CompanyItem | null
}

export type GetCompanyDetailsTypes = string;
