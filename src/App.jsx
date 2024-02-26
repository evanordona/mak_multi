import { useState } from 'react'
import Card from './components/Card'
import './App.css'
import Hand from './components/Hand'
import Player from './components/Player'

function App() {


  const [turn, setTurn] = useState(true)
  const [dir, setDir] = useState("Player 1 press enter:")

  const handleButtonPress = () => {

    setTurn(!turn)
  }

  return (

    <div className='w-screen h-screen flex flex-col items-center bg-[#101010]'>
      <h1 className='text-5xl py-8 text-white'>Mage Archer Knight</h1>
      <Player player="1" turn={turn} />
      <div className='flex justify-center text-2xl mt-10 mb-5 text-white'>{dir}</div>
      <button onClick={handleButtonPress} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-[100px] ">Enter</button>

      <div className='flex flex-col h-screen justify-center'>
        <Player player="2" turn={!turn} />
      </div>
    </div>
  )
}

export default App
