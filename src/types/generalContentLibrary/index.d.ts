import { GetDataParams } from '../main';

export type GeneralContentLibraryType = 'ETHOS' | 'WELNESS' | 'POWER_UP' | 'POWER_DOWN';

export interface ContentItem {
  _id: string,
  title: string,
  type: GeneralContentLibraryType,
  description: string
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
