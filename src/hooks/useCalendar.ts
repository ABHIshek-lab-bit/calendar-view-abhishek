import { useCallback, useEffect, useMemo, useState } from 'react'
import type { CalendarEvent, ViewMode } from '../components/Calendar/CalendarView.types'

const STORAGE_KEY = 'calendar_events_v1'

export function useCalendar(initialEvents: CalendarEvent[] = []){
  const [events, setEvents] = useState<CalendarEvent[]>(()=>{
    try{
      const raw = localStorage.getItem(STORAGE_KEY)
      if(raw) return JSON.parse(raw) as CalendarEvent[]
    }catch(e){ /* ignore */ }
    return initialEvents
  })
  const [viewDate, setViewDate] = useState<Date>(new Date())
  const [viewMode, setViewMode] = useState<ViewMode>('month')

  useEffect(()=>{
    try{ localStorage.setItem(STORAGE_KEY, JSON.stringify(events)) }catch(e){}
  }, [events])

  const addEvent = useCallback((ev: CalendarEvent)=>{
    setEvents(prev=>[...prev, ev])
  }, [])

  const updateEvent = useCallback((id: string, patch: Partial<CalendarEvent>)=>{
    setEvents(prev=>prev.map(e=> e.id===id ? {...e, ...patch} : e))
  }, [])

  const deleteEvent = useCallback((id: string)=>{
    setEvents(prev=>prev.filter(e=>e.id!==id))
  }, [])

  return useMemo(()=>({events, addEvent, updateEvent, deleteEvent, viewDate, setViewDate, viewMode, setViewMode}), [events, addEvent, updateEvent, deleteEvent, viewDate, viewMode])
}
