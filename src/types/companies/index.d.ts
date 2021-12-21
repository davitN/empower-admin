import { AppAdmin } from '../appAdmin';

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
  price: number
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
  _id: string,
  admins: {
    data: AppAdmin[],
    count: number
  }
}

export interface CompaniesTypes {
  count: number,
  data: CompanyItem[]
}

export type GetCompanyDetailsTypes = string;

export interface SaveDataTypes {
  data: {
    price: number | null
    showTeamSection: boolean,
    name: string,
    code?: string | null,
    paymentType: string
  },
  logo: any,
  thumbnail: any,
  companyId?: string | null
}
