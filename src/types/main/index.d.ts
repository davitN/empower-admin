export interface IUserData {
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

export interface NotificationManager {
  info: (message: string, title?: string, duration?: number, callback?: Function) => void;
  success: (message: string, title?: string, duration?: number, callback?: Function) => void;
  warning: (message: string, title?: string, duration?: number, callback?: Function) => void;
  error: (message: string, title?: string, duration?: number, callback?: Function) => void;
}

export interface CallBacks {
  success?: Function;
  error?: Function;
}
