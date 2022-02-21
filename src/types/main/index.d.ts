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

export interface GetDataParams {
  limit: number,
  offset: number,
  searchWord?: string
}

export interface Image {
  URL: string,
  height: number,
  width: number
}
export interface Audio {
  URL: string,
  duration: number,
  height: number,
  width: number
}

export interface Media {
  URL: string,
  duration: number,
  height: number,
  width: number
}

export interface UploadedFile {
  duration: number,
  height: number,
  width: number,
  preview: string,
  file: File
}
