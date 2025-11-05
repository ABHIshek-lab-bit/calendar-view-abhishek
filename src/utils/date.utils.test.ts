import { getCalendarGrid, addDays, isSameDay } from './date.utils'

test('getCalendarGrid returns 42 days and starts on Sunday', () => {
  const grid = getCalendarGrid(new Date(2025, 9, 1)) // Oct 2025
  expect(grid.length).toBe(42)
  // first day should be a Sunday (0)
  expect(grid[0].getDay()).toBe(0)
})

test('addDays adds correct number of days', () => {
  const d = new Date(2025,0,1)
  const d2 = addDays(d, 10)
  expect(d2.getDate()).toBe(11)
})

test('isSameDay works', () => {
  const a = new Date(2025,1,3,10)
  const b = new Date(2025,1,3,22)
  expect(isSameDay(a,b)).toBeTruthy()
