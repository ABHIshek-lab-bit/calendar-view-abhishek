import React from 'react'
import type { CalendarEvent } from './CalendarView.types'
import { isSameDay } from '../../utils/date.utils'

type Props = {
  date: Date
  currentMonth: number
  events: CalendarEvent[]
  onOpen: (date: Date, ev?: CalendarEvent)=>void
  index?: number
}

export default function CalendarCell({date, currentMonth, events, onOpen, index}: Props){
  const today = new Date()
  const isToday = isSameDay(date, today)
  const isOtherMonth = date.getMonth() !== currentMonth

  const visible = events.slice(0,3)
  const more = Math.max(0, events.length - visible.length)

  return (
    <div className={`p-1 border border-transparent ${isOtherMonth? 'bg-gray-50 text-gray-400' : 'bg-white'}`} data-index={index}>
      <button onClick={()=>onOpen(date)} className="w-full text-left p-2 rounded hover:bg-gray-100 focus:outline-none cell-button" aria-label={`Open ${date.toDateString()}`}>
        <div className="flex justify-between items-start">
          <div className={`text-sm font-medium ${isToday? 'ring-1 ring-indigo-400 rounded-full px-2': ''}`}>{date.getDate()}</div>
        </div>
        <div className="mt-2 space-y-1">
          {visible.map(ev=> (
            <div key={ev.id} onClick={(e)=>{e.stopPropagation(); onOpen(date, ev)}} className="text-xs truncate rounded px-1 py-[2px] bg-indigo-100" role="button" tabIndex={0} aria-label={`Event ${ev.title}`}>
              {ev.title}
            </div>
          ))}
        </div>
        {more>0 && <div className="mt-1 text-xs text-gray-500">+{more} more</div>}
      </button>
    </div>
  )
}
