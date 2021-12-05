export interface AppUser {
  email: string,
  firstName: string,
  lastName: string,
  phone: string,
  _id: string
}

export interface GetAppUsersData {
  data: AppUser[],
  count: number
}

export interface GetAppUsersOptions {
  offset: string,
  limit: string,
  companyId: string,
  locationId: string,
  searchWord?: string
}

export type GetAppUserDetailsOptions = string;
export interface GetAppUserDetailsData extends AppUser {
  location: {
    _id: string,
    name: string,
    logo: {
      width: number,
      height: number,
      imgURL: string
    }
  },
  companyId: {
    _id: string,
    name: string,
    logo: {
      width: number,
      height: number,
      imgURL: string
    }
  },
}

export interface SaveAppUserDetails {
  data: {
    firstName: string,
    lastName: string,
    email: string,
    phone: string,
    locationId?: string | null,
    _id: null | string
  },
  userId?: string | null
}

export interface InitialState {
  users: GetAppUsersData | null,
  userDetails: GetAppUserDetailsData | null
}
