export interface CompletedDailiyCheckIns {
  createdAt: string,
  emotional: number,
  environmental: number,
  mental: number,
  occupational: number,
  physical: number,
  social: number,
  spiritual: number,
  updatedAt: string,
  userId: string,
  _id: string
}

export interface GoalsType {
  createdAt: string,
  isCompleted: boolean
  isCompletedAt: string,
  text: string,
  title: string,
  updatedAt: string,
  userId: string,
  _id: string
}

export interface ReportsCompanyDetails {
  completedDailiyCheckIns: CompletedDailiyCheckIns[],
  completedGoals: GoalsType[],
  setGoals: GoalsType[]
}

export interface InitialState {
  companyDetails: null | ReportsCompanyDetails
}
