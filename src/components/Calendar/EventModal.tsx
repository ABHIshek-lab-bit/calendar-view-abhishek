import React, {useEffect, useRef, useState} from 'react'
import type { CalendarEvent } from './CalendarView.types'

type Props = {
  open: boolean
  onClose: ()=>void
  onSave: (ev: CalendarEvent)=>void
  initial?: Partial<CalendarEvent>
}

function toLocalDatetimeInputValue(iso?: string){
  if(!iso) return ''
  const d = new Date(iso)
  const pad = (n:number)=> n.toString().padStart(2,'0')
  const date = d.getFullYear() + '-' + pad(d.getMonth()+1) + '-' + pad(d.getDate())
  const time = pad(d.getHours()) + ':' + pad(d.getMinutes())
  return date + 'T' + time
}

function fromLocalToIso(val: string){
  if(!val) return ''
  const d = new Date(val)
  return d.toISOString()
}

export default function EventModal({open, onClose, onSave, initial}: Props){
  const [title, setTitle] = useState(initial?.title || '')
  const [start, setStart] = useState(initial?.start ? toLocalDatetimeInputValue(initial.start) : '')
  const [end, setEnd] = useState(initial?.end ? toLocalDatetimeInputValue(initial.end) : '')
  const ref = useRef<HTMLDivElement|null>(null)
  const previouslyFocused = useRef<HTMLElement|null>(null)

  useEffect(()=>{
    if(open){
      previouslyFocused.current = document.activeElement as HTMLElement
      setTitle(initial?.title || '')
      setStart(initial?.start ? toLocalDatetimeInputValue(initial.start) : toLocalDatetimeInputValue(new Date().toISOString()))
      setEnd(initial?.end ? toLocalDatetimeInputValue(initial.end) : toLocalDatetimeInputValue(new Date().toISOString()))
      setTimeout(()=> ref.current?.querySelector('input')?.focus(), 10)
    } else {
      previouslyFocused.current?.focus?.()
    }
  }, [open, initial])

  useEffect(()=>{
    function onKey(e: KeyboardEvent){
      if(e.key === 'Escape') onClose()
    }
    if(open) document.addEventListener('keydown', onKey)
    return ()=> document.removeEventListener('keydown', onKey)
  }, [open, onClose])

  if(!open) return null

  function save(){
    const id = initial?.id || Math.random().toString(36).slice(2,9)
    const isoStart = fromLocalToIso(start)
    const isoEnd = fromLocalToIso(end)
    onSave({id, title, start: isoStart, end: isoEnd})
    onClose()
  }

  // simple focus trap: keep focus inside modal by cycling
  function onKeyDown(e: React.KeyboardEvent){
    if(e.key === 'Tab'){
      const focusable = ref.current?.querySelectorAll<HTMLElement>('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])') || []
      const nodes = Array.from(focusable)
      if(nodes.length === 0) return
      const first = nodes[0], last = nodes[nodes.length-1]
      if(!e.shiftKey && document.activeElement === last){ e.preventDefault(); (first as HTMLElement).focus() }
      if(e.shiftKey && document.activeElement === first){ e.preventDefault(); (last as HTMLElement).focus() }
    }
  }

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center" role="dialog" aria-modal="true" aria-labelledby="event-modal-title" onKeyDown={onKeyDown}>
      <div className="fixed inset-0 bg-black/40" onClick={onClose}></div>
      <div ref={ref} className="bg-white rounded shadow p-4 z-50 w-full max-w-md">
        <h2 id="event-modal-title" className="text-lg font-semibold">{initial? 'Edit' : 'Add'} event</h2>
        <label className="block mt-3">
          <div className="text-sm">Title</div>
          <input className="mt-1 w-full border rounded p-2" value={title} onChange={e=>setTitle(e.target.value)} />
        </label>
        <label className="block mt-3">
          <div className="text-sm">Start</div>
          <input type="datetime-local" className="mt-1 w-full border rounded p-2" value={start} onChange={e=>setStart(e.target.value)} />
        </label>
        <label className="block mt-3">
          <div className="text-sm">End</div>
          <input type="datetime-local" className="mt-1 w-full border rounded p-2" value={end} onChange={e=>setEnd(e.target.value)} />
        </label>
        <div className="mt-4 flex gap-2 justify-end">
          <button className="px-3 py-1 rounded" onClick={onClose}>Cancel</button>
          <button className="bg-indigo-600 text-white px-3 py-1 rounded" onClick={save}>Save</button>
        </div>
      </div>
    </div>
  )
}
