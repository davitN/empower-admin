import { AnyAction } from 'redux';
import {
  InitialState, FetchedInitialStates, GetContentItemOptions, FetchedItem, GeneralContentLibraryType, ContentItem,
} from '../../types/generalContentLibrary';
import { CallBacks } from '../../types/main';

export const GET_CONTENTS = 'socialize/generalContentLibrary/getContents';
export const SET_CONTENTS = 'socialize/generalContentLibrary/setContents';
export const RESET_CONTENTS = 'socialize/generalContentLibrary/resetContents';

export const GET_CONTENT_ITEM = 'socialize/generalContentLibrary/getContentItem';
export const SET_CONTENT_ITEM = 'socialize/generalContentLibrary/setContentItem';
export const RESET_CONTENT_ITEM = 'socialize/generalContentLibrary/resetContentItem';

export const GET_CONTENT_ITEM_DETAILS = 'socialize/generalContentLibrary/getContentItemDetails';
export const SET_CONTENT_ITEM_DETAILS = 'socialize/generalContentLibrary/setContentItemDetails';
export const RESET_CONTENT_ITEM_DETAILS = 'socialize/generalContentLibrary/resetContentItemDetails';

export const SAVE_CONTENT_ITEM_DETAILS = 'socialize/generalContentLibrary/saveContentItemDetails';
export const REMOVE_CONTENT_ITEM = 'socialize/generalContentLibrary/removeContentItem';

const initialState: InitialState = {
  ethosGeneralContent: null,
  powerDownGeneralContent: null,
  powerUpGeneralContent: null,
  welnessGeneralContent: null,
  itemDetails: null,
};

const storeKeyByType = {
  POWER_UP: 'powerUpGeneralContent',
  POWER_DOWN: 'powerDownGeneralContent',
  ETHOS: 'ethosGeneralContent',
  WELNESS: 'welnessGeneralContent',
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
    case SET_CONTENT_ITEM:
      return {
        ...state,
        [storeKeyByType[action.fieldName as GeneralContentLibraryType]]: action.payload,
      };
    case RESET_CONTENT_ITEM:
      return {
        ...state,
        [storeKeyByType[action.fieldName as GeneralContentLibraryType]]: null,
      };
    case SET_CONTENT_ITEM_DETAILS:
      return {
        ...state,
        itemDetails: action.payload,
      };
    case RESET_CONTENT_ITEM_DETAILS:
      return {
        ...state,
        itemDetails: null,
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

export const getContentItem = (params: GetContentItemOptions, callbacks?: CallBacks) => ({
  type: GET_CONTENT_ITEM,
  callbacks,
  params,
});

export const setContentItem = (data: FetchedItem, type: string, callbacks?: CallBacks) => ({
  type: SET_CONTENT_ITEM,
  callbacks,
  payload: data,
  fieldName: type,
});

export const resetContentItem = (fieldName: GeneralContentLibraryType, callbacks?: CallBacks) => ({
  type: RESET_CONTENT_ITEM,
  callbacks,
  fieldName,
});

export const getContentItemDetails = (id: string, callbacks?: CallBacks) => ({
  type: GET_CONTENT_ITEM_DETAILS,
  callbacks,
  id,
});
export const setContentItemDetails = (data: ContentItem) => ({
  type: SET_CONTENT_ITEM_DETAILS,
  payload: data,
});
export const resetContentItemDetails = () => ({
  type: RESET_CONTENT_ITEM_DETAILS,
});

export const saveContentItemDetails = (data: any, callbacks?: CallBacks) => ({
  type: SAVE_CONTENT_ITEM_DETAILS,
  callbacks,
  data,
});

export const removeContentItem = (id: string, callbacks?: CallBacks) => ({
  type: REMOVE_CONTENT_ITEM,
  callbacks,
  id,
});
