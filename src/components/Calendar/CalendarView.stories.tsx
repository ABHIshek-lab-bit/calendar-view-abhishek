import React from 'react'
import CalendarView from './CalendarView'

export default { title: 'Calendar/CalendarView', component: CalendarView }

export const Default = () => <CalendarView />

Default.storyName = 'Default month view'

export const Week = () => <CalendarView />

Week.storyName = 'Week view (toggle to week in toolbar)'
