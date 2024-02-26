import { useState } from 'react'
import Card from './components/Card'
import './App.css'
import Hand from './components/Hand'
import Player from './components/Player'

function App() {

  return (

    <div className='w-screen h-screen flex flex-col items-center bg-blue-400'>
      <h1 className='text-5xl py-8'>Mage Archer Knight</h1>
      <Player player="1" />
      <div className='flex justify-center text-2xl mt-10 mb-5'>Player 1 choose a card and press enter:</div>
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-[100px] ">Enter</button>

      <div className='flex flex-col h-screen justify-center'>
        <Player player="2" />
      </div>
    </div>
  )
}

export default App
