import React from 'react'
import CalendarView from './components/Calendar/CalendarView'

export default function App(){
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-5xl mx-auto">
        <CalendarView />
      </div>
    </div>
  )
}
