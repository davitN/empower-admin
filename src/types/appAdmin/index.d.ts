export interface AppAdmin {
  email: string,
  firstName: string,
  lastName: string,
  phone: string,
  _id: string,
  createdAt: string,
  role: {
    description: string,
    name: RoleType,
    _id: string,
  }
}

export interface AppAdminsData {
  data: AppAdmin[],
  count: number
}

export type RoleType = 'SuperAdmin' | 'LocationManager' | 'CompanyManager';

interface AppAdminsRoles {
  name: RoleType,
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
