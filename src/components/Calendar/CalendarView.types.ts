export type CalendarEvent = {
  id: string
  title: string
  start: string // ISO date-time
  end: string // ISO date-time
  color?: string
  description?: string
}

export type ViewMode = 'month' | 'week'
