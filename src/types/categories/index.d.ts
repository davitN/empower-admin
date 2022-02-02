export interface CategoryItem {
  name: string,
  ordering: number,
  _id: string
}

export interface InitialState {
  categories: null | CategoryItem[],
  categoryDetails: null
}
