import React, { useRef } from 'react'

export default function OptionCard({ option, onVote, onUpdate, onRemove }) {
  const fileRef = useRef()

  function handleFile(e) {
    const file = e.target.files[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = () => {
      onUpdate({ img: reader.result })
    }
    reader.readAsDataURL(file)
  }

  return (
    <div className="card">
      <input
        className="opt-text"
        value={option.text}
        onChange={e => onUpdate({ text: e.target.value })}
      />

      {option.img ? (
        <img src={option.img} alt="option" className="opt-img" />
      ) : (
        <div className="img-placeholder">No image</div>
      )}

      <div className="card-controls">
        <button onClick={onVote}>Vote ({option.votes})</button>
        <button onClick={() => fileRef.current.click()}>Upload Image</button>
        <button onClick={onRemove}>Remove</button>
      </div>

      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        style={{ display: 'none' }}
        onChange={handleFile}
      />
    </div>
  )
}
