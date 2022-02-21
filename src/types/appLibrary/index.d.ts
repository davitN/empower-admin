import { Media } from '../main';

export interface LibraryItem {
  content: Media,
  title: string,
  _id: string
}

export interface LibrariesFetchedData {
  count: string,
  data: LibraryItem[]
}

export interface InitialState {
  libraries: null | LibrariesFetchedData,
}

export interface SaveAppLibrary {
  data: {
    title: string,
    width: number,
    height: number,
    duration: number
  },
  id?: string,
  file: File
}
