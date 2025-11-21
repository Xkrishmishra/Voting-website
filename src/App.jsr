import React, { useState, useEffect } from 'react'
import OptionCard from './components/OptionCard'
import { loadState, saveState } from './utils/localStorage'

const STORAGE_KEY = 'voting_app_v1'

export default function App() {
  const [options, setOptions] = useState([])
  const [title, setTitle] = useState('My Poll')

  useEffect(() => {
    const saved = loadState(STORAGE_KEY)
    if (saved) {
      setOptions(saved.options || [])
      setTitle(saved.title || 'My Poll')
    } else {
      setOptions([
        { id: 1, text: 'Option A', img: '', votes: 0 },
        { id: 2, text: 'Option B', img: '', votes: 0 }
      ])
    }
  }, [])

  useEffect(() => {
    saveState(STORAGE_KEY, { title, options })
  }, [title, options])

  function addOption() {
    setOptions(prev => [...prev, { id: Date.now(), text: 'New option', img: '', votes: 0 }])
  }

  function updateOption(id, patch) {
    setOptions(prev => prev.map(o => (o.id === id ? { ...o, ...patch } : o)))
  }

  function vote(id) {
    setOptions(prev => prev.map(o => (o.id === id ? { ...o, votes: o.votes + 1 } : o)))
  }

  function removeOption(id) {
    setOptions(prev => prev.filter(o => o.id !== id))
  }

  return (
    <div className="container">
      <header className="header">
        <h1>{title}</h1>
        <input
          className="title-input"
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder="Poll title"
        />
      </header>

      <main>
        <div className="controls">
          <button onClick={addOption}>Add option</button>
          <button onClick={() => setOptions([])}>Clear all</button>
        </div>

        <div className="grid">
          {options.map(opt => (
            <OptionCard
              key={opt.id}
              option={opt}
              onVote={() => vote(opt.id)}
              onUpdate={patch => updateOption(opt.id, patch)}
              onRemove={() => removeOption(opt.id)}
            />
          ))}
        </div>
      </main>

      <footer className="footer">
        <small>Votes stored in your browser (localStorage).</small>
      </footer>
    </div>
  )
}
