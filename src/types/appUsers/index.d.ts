export interface AppUser {
  email: string,
  firstName: string,
  lastName: string,
  phone: string,
  _id: string,
  location: {
    _id: string,
    name: string,
    imgURL: string
  },
  company: {
    _id: string,
    name: string,
    imgURL: string
  }
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
    _id?: string
  },
  userId?: string | null
}

export interface CheckIn {
  createdAt:string,
  emotional: number,
  environmental: number,
  mental: number,
  note: string,
  occupational: number,
  physical: number,
  social: number,
  spiritual: number,
  userId: string,
  _id: string
}

export interface Goals {
  createdAt: string,
  isCompleted: boolean,
  text: string,
  title: string,
  userId: string
}

export interface Gratitudes {
  createdAt: string,
  text: string,
  title: string,
  updatedAt: string,
  userId: string,
  _id: string
}

export interface LastMonthProgressItems {
  checkIns: CheckIn[],
  completedGoals: Goals[],
  gratitudes: Gratitudes[],
  unCompletedGoals: Goals[]
}

export interface InitialState {
  users: GetAppUsersData | null,
  userDetails: GetAppUserDetailsData | null,
  allUsers: GetAppUsersData | null,
  lastMonthProgress: LastMonthProgressItems | null
}
