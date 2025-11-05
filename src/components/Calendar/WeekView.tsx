import React, { useMemo } from 'react'
import type { CalendarEvent } from './CalendarView.types'

type Props = {
  viewDate: Date
  events: CalendarEvent[]
  onOpen: (date: Date, ev?: CalendarEvent) => void
}

// simple helpers
function startOfWeek(d: Date) {
  const dd = new Date(d)
  const day = dd.getDay()
  dd.setDate(dd.getDate() - day)
  dd.setHours(0, 0, 0, 0)
  return dd
}
function hoursBetween(a: Date, b: Date) {
  return (b.getTime() - a.getTime()) / 1000 / 60 / 60
}

export default function WeekView({ viewDate, events, onOpen }: Props) {
  const weekStart = startOfWeek(viewDate)
  const days = new Array(7).fill(0).map((_, i) => {
    const d = new Date(weekStart)
    d.setDate(d.getDate() + i)
    return d
  })

  // group events by day for quick lookup and compute layout lanes for overlaps
  const eventsByDay = useMemo(() => {
    const map = new Map<string, any[]>()
    for (const ev of events) {
      const s = new Date(ev.start)
      const key = s.toISOString().slice(0, 10)
      const arr = map.get(key) || []
      arr.push(ev)
      map.set(key, arr)
    }
    // compute lanes for each day's events
    const result = new Map()
    for (const [k, arr] of map.entries()) {
      const sorted = arr.slice().sort((a, b) => new Date(a.start).getTime() - new Date(b.start).getTime())
      const lanes: any[] = []
      for (const ev of sorted) {
        const s = new Date(ev.start).getTime()
        let placed = false
        for (const lane of lanes) {
          const last = lane[lane.length - 1]
          if (new Date(last.end).getTime() <= s) {
            lane.push(ev)
            placed = true
            break
          }
        }
        if (!placed) lanes.push([ev])
      }
      result.set(k, { events: sorted, lanes })
    }
    return result
  }, [events])

  const hourHeight = 40 // px per hour (reduced for readability)
  const totalHeight = 24 * hourHeight

  return (
    <div className="border rounded overflow-hidden">
      <div className="grid grid-cols-7">
        {days.map((d) => (
          <div key={d.toISOString()} className="text-sm text-center py-2 border-r last:border-r-0">
            {d.toLocaleDateString(undefined, { weekday: 'short', day: 'numeric' })}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7" style={{ height: totalHeight }}>
        {days.map((d) => {
          const key = d.toISOString().slice(0, 10)
          const data = eventsByDay.get(key)
          const lanes = data?.lanes || []
          const laneCount = lanes.length || 1

          return (
            <div key={key} className="relative border-r last:border-r-0 bg-white" onDoubleClick={() => onOpen(d)}>
              {/* hour lines */}
              <div className="absolute inset-0 pointer-events-none">
                {Array.from({ length: 24 }).map((_, i) => (
                  <div
                    key={i}
                    style={{
                      top: i * hourHeight,
                      position: 'absolute',
                      left: 0,
                      right: 0,
                      height: 1,
                      background: '#f3f4f6',
                    }}
                  />
                ))}
              </div>

              {/* events */}
              <div className="relative h-full">
                {lanes.flatMap((lane, laneIndex) =>
                  lane.map((ev: CalendarEvent) => {
                    const s = new Date(ev.start)
                    const e = new Date(ev.end)
                    const top = (s.getHours() + s.getMinutes() / 60) * hourHeight
                    const durationHours = Math.max(hoursBetween(s, e), 0.25) // minimum sensible height
                    const height = Math.max(12, durationHours * hourHeight)
                    const width = 100 / laneCount
                    const left = laneIndex * width
                    const backgroundColor = (ev as any).color || '#bfdbfe'

                    return (
                      <button
                        key={ev.id}
                        onClick={(e) => {
                          e.stopPropagation()
                          onOpen(d, ev)
                        }}
                        className="absolute text-xs left-0 week-event text-left overflow-hidden"
                        style={{
                          top,
                          height,
                          left: `${left}%`,
                          width: `calc(${width}% - 8px)`,
                          backgroundColor,
                        }}
                        aria-label={ev.title}
                      >
                        <div className="font-semibold truncate">{ev.title}</div>
                        <div className="text-[10px] truncate">
                          {new Date(ev.start).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} -{' '}
                          {new Date(ev.end).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </div>
                      </button>
                    )
                  })
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
