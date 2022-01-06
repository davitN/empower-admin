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
  ethosCards: EthosCardsData | null,
  ethosCardDetails: EthosCard | null
}

export interface SaveParamsTypes {
  data: {
    title: string
    description: string,
    duration?: number,
    image?: {
      width: number,
      height: number,
      URL?: string
    } | null,
    thumbnail?: {
      width: number,
      height: number
    }
  },
  image: EvenTarget,
  thumbnail: EvenTarget,
  audio: EvenTarget,
  ethosCardId?: string | null
}
