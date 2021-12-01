export interface InitialStateCompanies {
  companies: {
    data: CompanyItem[] | null,
    count: number
  } | null;
  companyDetails: CompanyItem | null
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

export type GetCompanyDetailsTypes = string;

export interface SaveDataTypes {
  data: {
    individualLocationPaymentPage: string
    individualLocationPrice: number | null
    showTeamSection: boolean,
    name: string,
    code?: string | null,
    paymentType: string
  },
  logo: any,
  logoThumbnail: any,
  companyId?: string | null
}
