import { CategoryItem } from '../categories';

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
  communityData: null | CommunityItemModel,
  ethos: null | ItemModel,
  gratitude: null | ItemModel,
  kickOff: null | ItemModel,
  powerDown: null | ItemModel,
  powerUp: null | ItemModel,
  categories: null,
  communityDataItem: null | GetAppContentItemData,
  appContentItemInfo: null | GetAppContentItemInfo
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

export type MonthlyActivityTypes = 'kickOff' | 'ethos' | 'gratitude' | 'powerUp' | 'powerDown';

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

export interface GetCommunityDataItem {
  category: CategoryItem,
  createdAt:string,
  creator: string,
  image: any,
  isFeatured: boolean,
  show: boolean,
  subTitle: string,
  text: string,
  title: string,
  type: CommunityArticleType,
  updatedAt: string,
  __v: number,
  _id: string,
  description?: string,
  URL?: string,
  image?: {
    width: number,
    height: number,
    imgURL: string
  }
}

interface GetAppContentItemInfo {
  content: {
    URL: string,
    width: number,
    height: number
  },
  creator: string
  description: string
  endDate: string,
  startDate: string,
  subTitle: string,
  title: string,
  type: MonthlyActivityContentType
}
