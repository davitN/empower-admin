import { Media } from '../main';

export type ForYouTypes = 'KICK_OFF' | 'ETHOS' | 'WELNESS' | 'POWER_UP' | 'POWER_DOWN';

export interface ForYouItem {
  contentType: 'AUDIO' | 'VIDEO',
  type: ForYouTypes,
  _id: string,
  content: Media,
  title: string,
  subTitle: string,
  description: string
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
