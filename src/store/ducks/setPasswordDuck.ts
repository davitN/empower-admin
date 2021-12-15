import { CallBacks } from '../../types/main';

export const SET_PASSWORD = 'socialize/setPassword/setPassword';

export const setPassword = (data: { password: string, token: string }, callbacks: CallBacks) => ({
  type: SET_PASSWORD,
  data,
  callbacks,
});
