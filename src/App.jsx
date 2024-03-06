
import { useState } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import './App.css'
import Home from './components/Home'
import Game from './components/Game'

function App() {

  const [isConnected, setIsConnected] = useState(false) // joined a room state  
  const [showGame, setShowGame] = useState(false)
  const [code, setCode] = useState("") // room code state
  const [showKey, setShowKey] = useState(false)


  return (

    <>
      <Routes>

        <Route exact path='/' element={!isConnected ? <Home setIsConnected={setIsConnected} code={code} setCode={setCode} showKey={showKey} setShowKey={setShowKey} setShowGame={setShowGame} /> : <Navigate to='/game' />} />

        <Route exact path='/game'
          element={isConnected ?
            <Game setIsConnected={setIsConnected} setCode={setCode} code={code} showKey={showKey} showGame={showGame} setShowGame={setShowGame} /> :
            <Navigate to='/' />} />

      </Routes>
    </>
  )
}

export default App
