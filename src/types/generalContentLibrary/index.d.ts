import { GetDataParams, Image } from '../main';

export type GeneralContentLibraryType = 'ETHOS' | 'WELNESS' | 'POWER_UP' | 'POWER_DOWN';

export interface ContentItem {
  content: {
    URL: string,
    duration: number
  },
  contentType: 'VIDEO' | 'AUDIO',
  createdAt: Date
  description: 'description'
  image: Image
  title: string
  type: GeneralContentLibraryType
  _id: string
}

export interface FetchedItem {
  count: number,
  data: ContentItem[]
}

export interface InitialState {
  ethosGeneralContent: null | FetchedItem,
  powerDownGeneralContent: null | FetchedItem,
  powerUpGeneralContent: null | FetchedItem,
  welnessGeneralContent: null | FetchedItem,
  itemDetails: null | ContentItem
}

export interface FetchedInitialStates {
  ethosGeneralContent: FetchedItem,
  powerDownGeneralContent: FetchedItem,
  powerUpGeneralContent: FetchedItem,
  welnessGeneralContent: FetchedItem,
}

export interface GetContentItemOptions extends GetDataParams {
  type: string
}
