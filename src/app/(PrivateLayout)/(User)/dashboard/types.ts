export interface MyDashboardInfo {
    currentStreak: number,
    longestStreak: number,
    lastLogDate: string | null,
    plan: "FREE" | "PRO",
    totalLogs: number,
    thisWeekLogs: number,
    recentLogs: []
}