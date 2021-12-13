export interface ItemModel {
  company: {
    name: string,
    _id: string
  },
  content: {
    URL: string,
    height: number,
    width: number
  },
  description: string,
  endDate: string,
  startDate: string,
  subTitle: string,
  title: string,
  type: string,
}

export interface CommunityItemModel {
  category: {
    _id: string,
    title: string,
    _id: string
  },
  createdAt: string,
  _id: string
}

export interface InitialState {
  communityData: null,
  ethos: null,
  gratitude: null,
  kickOff: null,
  powerDown: null,
  powerUp: null,
  categories: null
}

export interface GetCommunityDataParams {
  offset: string,
  limit: string,
  searchWord?: string
}

export interface GetAppContentItemOptions {
  offset: string,
  limit: string,
  searchWord?: string,
  fieldName: string
}

export interface AppContentGetData {
  communityData: {
    data: CommunityItemModel[],
    count: number
  },
  ethos: {
    data: ItemModel[],
    count: number
  },
  gratitude: {
    data: ItemModel[],
    count: number
  },
  kickOff: {
    data: ItemModel[],
    count: number
  },
  powerDown: {
    data: ItemModel[],
    count: number
  },
  powerUp: {
    data: ItemModel[],
    count: number
  }
}
export interface GetCommunityData extends CommunityItemModel {
  count: number
}
export interface GetAppContentItemData extends ItemModel {
  count: number
}

export type MonthlyActivityTypes = 'KICK_OFF' | 'ETHOS' | 'GRATITUDE' | 'POWER_UP' | 'POWER_DOWN';

export type MonthlyActivityContentType = 'VIDEO' | 'AUDIO';

export type CommunityArticleType = 'WRITTEN' | 'EXTERNAL';

export interface AppContentCategory {
  createdAt:string,
  name: string,
  ordering: number,
  updatedAt:string,
  __v: number,
  _id: string,
}
