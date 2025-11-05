import React, {useState} from 'react'
import MonthView from './MonthView'
import WeekView from './WeekView'
import EventModal from './EventModal'
import { useCalendar } from '../../hooks/useCalendar'
import type { CalendarEvent } from './CalendarView.types'

export default function CalendarView(){
  const {events, addEvent, updateEvent, deleteEvent, viewDate, setViewDate, viewMode, setViewMode} = useCalendar(sampleEvents)
  const [modalOpen, setModalOpen] = useState(false)
  const [selected, setSelected] = useState<{date: Date, ev?: CalendarEvent}|null>(null)

  function open(date: Date, ev?: CalendarEvent){
    setSelected({date, ev})
    setModalOpen(true)
  }

  function close(){ setModalOpen(false); setSelected(null) }

  function save(ev: CalendarEvent){
    const exists = events.some(e=>e.id===ev.id)
    if(exists) updateEvent(ev.id, ev)
    else addEvent(ev)
  }

  function gotoPrev(){
    const d = new Date(viewDate); if(viewMode==='month') d.setMonth(d.getMonth()-1); else d.setDate(d.getDate()-7); setViewDate(d)
  }
  function gotoNext(){
    const d = new Date(viewDate); if(viewMode==='month') d.setMonth(d.getMonth()+1); else d.setDate(d.getDate()+7); setViewDate(d)
  }

  return (
    <div className="bg-white rounded shadow p-4">
      <div className="flex items-center justify-between mb-4">
        <div>
          <div className="text-lg font-semibold">{viewDate.toLocaleString(undefined, {month:'long', year:'numeric'})}</div>
          <div className="text-sm text-gray-500">Calendar</div>
        </div>
        <div className="flex gap-2">
          <button onClick={()=>setViewMode(viewMode==='month'? 'week' : 'month')} className="px-3 py-1 border rounded">{viewMode==='month' ? 'Week' : 'Month'}</button>
          <button onClick={gotoPrev} className="px-3 py-1 border rounded">Prev</button>
          <button onClick={()=>setViewDate(new Date())} className="px-3 py-1 border rounded">Today</button>
          <button onClick={gotoNext} className="px-3 py-1 border rounded">Next</button>
        </div>
      </div>

      <div>
        {viewMode==='month' ? (
          <MonthView viewDate={viewDate} events={events} onOpen={open} />
        ) : (
          <WeekView viewDate={viewDate} events={events} onOpen={open} />
        )}
      </div>

      <EventModal open={modalOpen} onClose={close} onSave={save} initial={selected?.ev ? selected.ev : {start: selected?.date.toISOString().slice(0,16) || '', end: selected?.date.toISOString().slice(0,16) || ''}} />
    </div>
  )
}

const now = new Date()
const sampleEvents = [
  // Multi-day event (Conference)
  { id: 'conf1', title: 'Dev Conference', start: new Date(now.getFullYear(), now.getMonth(), now.getDate()-1, 9,0).toISOString(), end: new Date(now.getFullYear(), now.getMonth(), now.getDate()+1, 17,0).toISOString(), color: '#fb923c' },
  // Overlapping events same day (Sprint planning)
  { id: 's1', title: 'Sprint Planning', start: new Date(now.getFullYear(), now.getMonth(), now.getDate(), 9,0).toISOString(), end: new Date(now.getFullYear(), now.getMonth(), now.getDate(), 10,30).toISOString(), color: '#60a5fa' },
  { id: 's2', title: 'Architecture Sync', start: new Date(now.getFullYear(), now.getMonth(), now.getDate(), 9,30).toISOString(), end: new Date(now.getFullYear(), now.getMonth(), now.getDate(), 11,0).toISOString(), color: '#f472b6' },
  { id: 's3', title: 'Customer Call', start: new Date(now.getFullYear(), now.getMonth(), now.getDate(), 10,0).toISOString(), end: new Date(now.getFullYear(), now.getMonth(), now.getDate(), 10,30).toISOString(), color: '#34d399' },
  // Many events in a single day to test +x more
  ...Array.from({length:8}).map((_,i)=>({ id: 'dayevt'+i, title: 'Task '+(i+1), start: new Date(now.getFullYear(), now.getMonth(), now.getDate()+3, 9 + (i%6), 0).toISOString(), end: new Date(now.getFullYear(), now.getMonth(), now.getDate()+3, 9 + (i%6), 30).toISOString(), color: '#a78bfa' })),
  // Events across different days/time
  { id: 'a4', title: '1:1 with Manager', start: new Date(now.getFullYear(), now.getMonth(), now.getDate()-2, 16,0).toISOString(), end: new Date(now.getFullYear(), now.getMonth(), now.getDate()-2, 16,30).toISOString(), color: '#f97316' },
  { id: 'wrap1', title: 'Release Window', start: new Date(now.getFullYear(), now.getMonth(), now.getDate()+5, 22,0).toISOString(), end: new Date(now.getFullYear(), now.getMonth(), now.getDate()+6, 2,0).toISOString(), color: '#ef4444' },
]
