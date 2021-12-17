export interface AppAdmin {
  email: string,
  firstName: string,
  lastName: string,
  phone: string,
  _id: string,
  createdAt: string,
  role: {
    description: string,
    name: string,
    _id: string,
  }
}

export interface AppAdminsData {
  data: AppUser[],
  count: number
}

export interface InitialState {
  admins: null | AppAdminsData,
  adminDetails: null
}
