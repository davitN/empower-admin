import { AppAdminsData } from '../appAdmin';
import { GetDataParams } from '../main';

export interface LocationItem {
  company: {
    logo?: {
      width: number,
      height: number,
      imgURL: string
    },
    name: string,
    _id: string
  },
  paidTill: Date,
  admins: AppAdminsData,
  createdAt: string,
  name: string,
  updatedAt: string,
  userCount: number,
  logo?: {
    width: number,
    height: number,
    imgURL: string
  },
  _id: string,
}

export interface GetLocationsData {
  data: LocationItem[],
  count: number
}

export interface GetLocationsOptions {
  offset: number,
  limit: number,
  searchWord?: string | null,
  companyId: string
}

export type GetLocationDetails = string;

export interface InitialStateLocations {
  locations: {
    data: LocationItem[],
    count: number
  } | null;
  locationDetails: LocationItem | null,
  admins: AppAdminsData | null
}

export interface SaveDataOptions {
  logo?: {
    width: number,
    height: number
  },
  thumbnail?: {
    width: number,
    height: number
  },
  data: {
    companyId: string | null,
    name: string,
  },
  locationId?: string | null,
}

export interface GetLocationAdminsParams extends GetDataParams {
  locationId: string
}
