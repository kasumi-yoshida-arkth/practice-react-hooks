import React from 'react'
import { useEffect, useState } from 'react/cjs/react.development'

const App = props => {
  const [state, setState] = useState(props)
  const { name, price } = state

  useEffect(() => {
    console.log('This is like componentDidMount or componentDidUpdate')
  })

  useEffect(() => {
    // 一度だけ呼ばれる場合
    console.log('This is like componentDidMount')
  }, [])

  useEffect(() => {
    // 特定の要素が変更された時にのみ呼ばれる場合
    console.log('This callback is for name only.')
  }, [name])

  return (
    <>
      <p>現在の{name}は、{state.price}円です。</p>
      <button onClick={() => setState({...state, price: price + 1})}>+1</button>
      <button onClick={() => setState({...state, price: price - 1})}>-1</button>
      <button onClick={() => setState(props)}>Reset</button>
      <input value={name} onChange={e => setState({...state, name: e.target.value})}/>
    </>
  )
}

App.defaultProps = {
  name: '',
  price: 1000
}

export default App
