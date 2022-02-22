import { Media } from '../main';

export type ForYouTypes = 'KICK_OFF' | 'ETHOS' | 'WELNESS' | 'POWER_UP' | 'POWER_DOWN' | 'ACCOUNTABILITY';

export interface ForYouItem extends Media {
  contentType: 'AUDIO' | 'VIDEO',
  type: ForYouTypes,
  _id: string
}

export interface SaveForYou{
  data: {
    type: ForYouTypes,
    width: number,
    height: number,
    duration: number
  },
  file: File
}
