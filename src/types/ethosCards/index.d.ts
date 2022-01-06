export interface EthosCard {
  audio?: {
    URL: string,
    duration: number
  },
  createdAt: Date,
  description: string,
  image?: {
    URL: string,
    height: number,
    width: number,
  },
  title: string,
  updatedAt: Date,
  _id: string
}

export interface EthosCardsData {
  data: EthosCard[],
  count: number
}

export interface InitialState {
  ethosCards: EthosCard | null
}
