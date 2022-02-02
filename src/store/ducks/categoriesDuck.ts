import { AnyAction } from 'redux';
import { CategoryItem, InitialState } from '../../types/categories';

import { CallBacks } from '../../types/main';

export const GET_CATEGORIES = 'socialize/categories/getCategories';
export const SET_CATEGORIES = 'socialize/categories/setCategories';
export const RESET_CATEGORIES_STATE = 'socialize/categories/resetCategoriesState';

export const GET_CATEGORY_DETAILS = 'socialize/categories/getCategoryDetails';
export const SET_CATEGORY_DETAILS = 'socialize/categories/setCategoryDetails';
export const RESET_CATEGORY_DETAILS_STATE = 'socialize/categories/resetCategoryDetailsState';

export const SAVE_CATEGORY = 'socialize/categories/saveCategory';

const initialState: InitialState = {
  categories: null,
  categoryDetails: null,
};

export const categoriesReducer = (state = initialState, action: AnyAction) => {
  const { payload } = action;
  switch (action.type) {
    case SET_CATEGORIES:
      return {
        categories: payload as CategoryItem[],
      };
    case RESET_CATEGORIES_STATE:
      return {
        ...state,
        categories: null,
      };
    case SET_CATEGORY_DETAILS:
      return {
        ...state,
        categoryDetails: payload as any,
      };
    case RESET_CATEGORY_DETAILS_STATE:
      return {
        ...state,
        categoryDetails: null,
      };
    default:
      return state;
  }
};

export const getCategories = (callbacks?: CallBacks) => ({
  type: GET_CATEGORIES,
  callbacks,
});

export const setCategories = (data: CategoryItem[]) => ({
  type: SET_CATEGORIES,
  payload: data,
});

export const resetCategoriesState = () => ({
  type: RESET_CATEGORIES_STATE,
});

export const getCategoryDetails = (categoryId: any, callbacks?: CallBacks) => ({
  type: GET_CATEGORY_DETAILS,
  categoryId,
  callbacks,
});

export const setCategoryDetails = (data: any, callbacks?: CallBacks) => ({
  type: SET_CATEGORY_DETAILS,
  payload: data,
  callbacks,
});

export const resetCategoryDetails = () => ({
  type: RESET_CATEGORY_DETAILS_STATE,
});

export const saveCategory = (data: any, callbacks?: CallBacks) => ({
  type: SAVE_CATEGORY,
  data,
  callbacks,
});
