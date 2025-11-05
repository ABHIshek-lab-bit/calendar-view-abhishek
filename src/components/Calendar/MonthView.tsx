import React from 'react'
import { getCalendarGrid } from '../../utils/date.utils'
import CalendarCell from './CalendarCell'
import type { CalendarEvent } from './CalendarView.types'

type Props = {
  viewDate: Date
  events: CalendarEvent[]
  onOpen: (date: Date, ev?: CalendarEvent)=>void
}

export default function MonthView({viewDate, events, onOpen}: Props){
  const grid = getCalendarGrid(viewDate)
  const currentMonth = viewDate.getMonth()

  // group events by date string yyyy-mm-dd for quick lookup
  const map = new Map<string, CalendarEvent[]>()
  events.forEach(ev=>{
    const d = new Date(ev.start)
    const key = d.toISOString().slice(0,10)
    const arr = map.get(key) || []
    arr.push(ev)
    map.set(key, arr)
  })

  function onKeyDown(e: React.KeyboardEvent){
    const active = document.activeElement as HTMLElement|null
    if(!active) return
    const idx = active.closest('[data-index]')?.getAttribute('data-index')
    if(idx == null) return
    const i = Number(idx)
    let next = i
    if(e.key === 'ArrowRight') next = i + 1
    else if(e.key === 'ArrowLeft') next = i - 1
    else if(e.key === 'ArrowDown') next = i + 7
    else if(e.key === 'ArrowUp') next = i - 7
    else if(e.key === 'Enter') { active.querySelector('button')?.dispatchEvent(new MouseEvent('click', {bubbles:true})) ; return }
    if(next < 0 || next >= grid.length) return
    const el = document.querySelector(`[data-index="${next}"] .cell-button`) as HTMLElement|null
    el?.focus()
    e.preventDefault()
  }

  return (
    <div className="grid grid-cols-7 gap-1" role="grid" tabIndex={0} onKeyDown={onKeyDown}>
      {['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].map(d=> (
        <div key={d} className="text-xs text-center font-medium py-2">{d}</div>
      ))}
      {grid.map((date, index)=>{
        const key = date.toISOString().slice(0,10)
        const evs = map.get(key) || []
        return <div key={key} data-index={index}><CalendarCell date={date} currentMonth={currentMonth} events={evs} onOpen={onOpen} index={index} /></div>
      })}
    </div>
  )
}
