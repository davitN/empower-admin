export interface ISignInData {
  email: string;
  password: string;
}

export interface ISignUpData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone: string;
  companyCode: string;
}

export interface UserData {
  userData: {
    accessToken: string,
    email: string
    firstName: string
    id: string | null
    lastName: string
    phone: string
    role: { _id: string, name: string, description: string }
    description:string
    name: string
  }
}
