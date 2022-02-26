import React, { useContext, useState } from 'react'

import {
    CREATE_EVENT,
    DELETE_ALL_EVENTS,
    ADD_OPERATION_LOG,
    DELETE_ALL_OPERATION_LOGS
} from '../actions'
import AppContext from '../contexts/AppContext'
import { timeCurrentIso8601 } from '../utils'

const EventForm = () => {
    const { state, dispatch } = useContext(AppContext)
    const [title, setTitle] = useState('')
    const [body, setBody] = useState('')
  
    const addEvent = e => {
        e.preventDefault()

        dispatch({
            type: CREATE_EVENT,
            title,
            body
        })

        dispatch({
            type: ADD_OPERATION_LOG,
            description: 'イベントを作成しました。',
            operationAt: timeCurrentIso8601()
        })

        setTitle('')
        setBody('')
    }
  
    const deleteAllEvents = e => {
        e.preventDefault()
        const result = window.confirm('全てのイベントを本当に削除してもいいですか？')
        if (result) {
            dispatch({ type: DELETE_ALL_EVENTS })

            dispatch({
                type: ADD_OPERATION_LOG,
                description: '全てのイベントを削除しました。',
                opeartionAt: timeCurrentIso8601()
            })
        }
    }

    const unCreatable = title === '' || body === '';

    return (
        <>
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
                <button className="btn btn-danger col-auto" onClick={deleteAllEvents} disabled={state.events.length === 0}>Delete all events</button>
            </form>
        </>
    )
}

export default EventForm
