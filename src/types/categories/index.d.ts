export interface CategoryItem {
  name: string,
  ordering: number,
  _id: string
}

export interface SaveCategoryParams {
  data: {
    name: string,
    ordering?: number
  },
  categoryId: string | null
}

export interface InitialState {
  categories: null | CategoryItem[],
  categoryDetails: null
}
