
import { useState } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import './App.css'
import Home from './components/Home'
import Game from './components/Game'

function App() {

  const [isConnected, setIsConnected] = useState(true) // joined a room state  
  const [code, setCode] = useState("") // room code state
  const [showKey, setShowKey] = useState(true)


  return (
    
    <>
      <Routes>

        <Route exact path='/' element={!isConnected ? <Home setIsConnected={setIsConnected} code={code} setCode={setCode} showKey={showKey} setShowKey={setShowKey} /> : <Navigate to='/game' />} />

        <Route exact path='/game'
          element={isConnected ?
            <Game setIsConnected={setIsConnected} code={code} showKey={showKey} /> :
            <Navigate to='/' />} />

      </Routes>
    </>
  )
}

export default App
