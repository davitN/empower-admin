import { AppAdminsData } from '../appAdmin';
import { GetDataParams } from '../main';

export interface InitialStateCompanies {
  companies: {
    data: CompanyItem[] | null,
    count: number
  } | null;
  companyDetails: CompanyItem | null,
  admins: null | AppAdminsData,
  allCompanies: CompanyItem[] | null
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
  paidTill: Date,
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
  showCommunitySection: boolean
  updatedAt: string
  userCount: number
  __v: number
  _id: string,
  admins: AppAdminsData
}

export interface CompaniesTypes {
  count: number,
  data: CompanyItem[]
}

export type GetCompanyDetailsTypes = string;

export interface SaveDataTypes {
  data: {
    price: number | null
    showCommunitySection: boolean,
    name: string,
    code?: string | null,
    paymentType: string
  },
  logo: any,
  thumbnail: any,
  companyId?: string | null
}

export interface GetCompanyAdminsParams extends GetDataParams {
  companyId: string
}

export interface AllCompaniesItem {
  logo: {
    width: number,
    height: number,
    imgURL: string
  },
  _id: string,
  name: string
}
