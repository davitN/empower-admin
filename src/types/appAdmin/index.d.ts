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

interface AppAdminsRoles {
  name: string,
  description: string,
  _id: string
}

interface SaveAppAdmin {
  data: {
    email: string,
    firstName: string,
    lastName: string,
    phone: string,
    role: string
  },
  adminId?: string
}

export interface InitialState {
  admins: null | AppAdminsData,
  adminDetails: null,
  adminsRoles: null | AppAdminsRoles
}