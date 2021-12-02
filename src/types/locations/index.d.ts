export interface LocationItem {
  company: string,
  createdAt: string,
  name: string,
  updatedAt: string,
  userCount: number,
  logo?: {
    width: number,
    height: number,
    imgURL: string
  },
  __v: number,
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
  locationDetails: LocationItem | null
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
    companyId: string,
    name: string,
  },
  locationId?: string | null,
}
