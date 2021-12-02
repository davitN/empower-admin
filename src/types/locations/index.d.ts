export interface LocationItem {
  company: string,
  createdAt: string,
  name: string,
  updatedAt: string,
  userCount: number,
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

export interface InitialStateLocations {
  locations: {
    data: LocationItem[],
    count: number
  } | null;
}
