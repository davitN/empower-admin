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
  powerUp: null
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

export type Types = 'KICK_OFF' | 'ETHOS' | 'GRATITUDE' | 'POWER_UP' | 'POWER_DOWN';

export type ContentType = 'VIDEO' | 'AUDIO';
