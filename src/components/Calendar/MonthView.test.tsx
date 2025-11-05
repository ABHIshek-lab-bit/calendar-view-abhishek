import React from 'react'
import { render, screen } from '@testing-library/react'
import MonthView from './MonthView'
import type { CalendarEvent } from './CalendarView.types'

test('renders month grid with weekday headings', () => {
  const events: CalendarEvent[] = []
  render(<MonthView viewDate={new Date(2025,9,1)} events={events} onOpen={()=>{}} />)
  expect(screen.getByText('Sun')).toBeInTheDocument()
  expect(screen.getByText('Sat')).toBeInTheDocument()
})
