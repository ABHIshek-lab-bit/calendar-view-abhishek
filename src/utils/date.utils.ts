export function startOfMonth(date: Date){
  return new Date(date.getFullYear(), date.getMonth(), 1)
}

export function endOfMonth(date: Date){
  return new Date(date.getFullYear(), date.getMonth()+1, 0)
}

export function isSameDay(a: Date, b: Date){
  return a.getFullYear()===b.getFullYear() && a.getMonth()===b.getMonth() && a.getDate()===b.getDate()
}

export function addDays(date: Date, days: number){
  const d = new Date(date);
  d.setDate(d.getDate()+days);
  return d;
}

export function getCalendarGrid(viewDate: Date){
  // returns array of 42 Date objects starting from sunday of the first week
  const start = startOfMonth(viewDate)
  const startWeekDay = start.getDay() // 0..6
  const gridStart = addDays(start, -startWeekDay)
  const res: Date[] = []
  for(let i=0;i<42;i++) res.push(addDays(gridStart, i))
  return res
}
