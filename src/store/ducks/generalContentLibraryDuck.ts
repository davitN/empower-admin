import { AnyAction } from 'redux';
import { InitialState, FetchedInitialStates } from '../../types/generalContentLibrary';
import { CallBacks } from '../../types/main';

export const GET_CONTENTS = 'socialize/generalContentLibrary/getContents';
export const SET_CONTENTS = 'socialize/generalContentLibrary/setContents';
export const RESET_CONTENTS = 'socialize/generalContentLibrary/resetContents';

const initialState: InitialState = {
  ethosGeneralContent: null,
  powerDownGeneralContent: null,
  powerUpGeneralContent: null,
  welnessGeneralContent: null,
};

export const generalContentLibraryReducer = (state = initialState, action: AnyAction) => {
  const { payload } = action;
  switch (action.type) {
    case SET_CONTENTS:
      return (payload as FetchedInitialStates);
    case RESET_CONTENTS:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};

export const getContentsData = (callbacks?: CallBacks) => ({
  type: GET_CONTENTS,
  callbacks,
});
export const setContentsData = (data: FetchedInitialStates) => ({
  type: SET_CONTENTS,
  payload: data,
});
export const resetContentsData = () => ({
  type: RESET_CONTENTS,
});
