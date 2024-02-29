
import { useState } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import './App.css'
import Home from './components/Home'
import Game from './components/Game'

function App() {

  const [isConnected, setIsConnected] = useState(false)
  const [code, setCode] = useState("")

  return (

    <>
      <Routes>
        <Route exact path='/' element={!isConnected ? <Home setIsConnected={setIsConnected} code={code} setCode={setCode} /> : <Navigate to='/game' />} />
        <Route exact path='/game' element={isConnected ? <Game setIsConnected={setIsConnected} code={code} /> : <Navigate to='/' />} />
      </Routes>
    </>
  )
}

export default App
