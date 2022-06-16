export interface AnalyticsTopItem {
  _id: string,
  count: number,
  title: string,
  description?: string
}

export interface AnalyticsData {
  averageSessionLength: number,
  displayName?: string,
  checkInCount: number,
  churnRate: number,
  completedGoals: number,
  dailyActiveUsers: number,
  monthlyActiveUsers: number,
  monthlyInactiveUsers: number,
  monthlyRetentionRate: number,
  powerDownContentViewCount: number,
  powerUpContentViewCount: number,
  setGoals: number,
  stickinessRatio: number,
  totalUsers: number,
  wellnessContentViewCount: number,
  top7ChoosenEthosCard: AnalyticsTopItem[],
  topEthosByEmotional: AnalyticsTopItem,
  topEthosByEnvironmental: AnalyticsTopItem,
  topEthosByMental: AnalyticsTopItem,
  topEthosByOccupational: AnalyticsTopItem,
  topEthosByPhysical: AnalyticsTopItem,
  topEthosBySocial: AnalyticsTopItem,
  topEthosBySpiritual: AnalyticsTopItem,
  teamPowerUpContentViewCount?: number,
  teamEthosContentViewCount?: number,
  teamKickOffContentViewCount?: number,
  teamPowerDownContentViewCount?: number,
  teamWellnessContentViewCount?: number,
}

export interface InitialState {
  analytics: null | AnalyticsData
}
