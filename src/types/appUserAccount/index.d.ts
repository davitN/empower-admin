export interface User {
  firstName: string,
  lastName: string,
  phone: string,
  email: string
}

export interface InitialState {
  user: null | User
}
