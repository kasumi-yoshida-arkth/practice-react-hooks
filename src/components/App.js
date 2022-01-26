import React, { useReducer, useState } from 'react'

import 'bootstrap/dist/css/bootstrap.min.css'

import Event from './Event'
import reducer from '../reducers/index.js'

const App = () => {
  const [state, dispatch] = useReducer(reducer, [])
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')

  const addEvent = e => {
    e.preventDefault()
    
    dispatch({
      type: 'CREATE_EVENT',
      title,
      body
    })

    setTitle('')
    setBody('')
  }

  const deleteAllEvents = e => {
    e.preventDefault()
    const result = window.confirm('全てのイベントを本当に削除してもいいですか？')
    if (result) dispatch({ type: 'DELETE_ALL_EVENTS' })
  }

  const unCreatable = title === '' || body === '';

  return (
    <div className="container-fluid">
      <h4>Form</h4>
      <form>
        <div className="form-group col-auto">
          <label htmlFor="formEventTitle">タイトル</label>
          <input className="form-control" id="formEventTitle" value={title} onChange={e => setTitle(e.target.value)} />
        </div>

        <div className="form-group col-auto">
          <label htmlFor="formEventBody">ボディ</label>
          <textarea className="form-control" id="formEventBody" value={body} onChange={e => setBody(e.target.value)} />
        </div>

        <button className="btn btn-primary col-auto mr-2" onClick={addEvent} disabled={unCreatable}>Submit</button>
        <button className="btn btn-danger col-auto" onClick={deleteAllEvents} disabled={state.length === 0}>Delete all events</button>
        <button className="btn btn-danger col-auto">Delete All</button>
      </form>

      <h4 className="table table-hover">イベント一覧</h4>
      <table className="table table-hover">
        <thead>
          <tr>
            <th>ID</th>
            <th>タイトル</th>
            <th>ボディ</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          { state.map((event, index) => (<Event key={index} event={event} dispatch={dispatch} />)) }
        </tbody>
      </table>
    </div>
  )
}

export default App
