import { useState } from 'react'
import Card from './components/Card'
import './App.css'
import Hand from './components/Hand'
import Player from './components/Player'
import Battle from './components/Battle'
import Scoreboard from './components/Scoreboard'

function App() {


  const [turn, setTurn] = useState(true)
  const [look, setLook] = useState(false)
  const [dir, setDir] = useState("Player 1 press enter:")
  const [start, setStart] = useState(false)
  const [player1Pick, setPlayer1Pick] = useState({})
  const [player2Pick, setPlayer2Pick] = useState({})
  const [battle, setBattle] = useState(false)
  const [score1, setScore1] = useState({"Mage":0, "Archer": 0, "Knight": 0})
  const [score2, setScore2] = useState({"Mage":0, "Archer": 0, "Knight": 0})
    

  const handleBattle = () => {
    setBattle(true)
    let temp1 = score1
    let temp2 = score2
    if (player1Pick.type === player2Pick.type) {
      if (player1Pick.power && !player2Pick.power) {
        setDir("Player 1 wins with power card!");
        temp1[player1Pick.type] += 1
        setScore1(temp1)
      } else if (!player1Pick.power && player2Pick.power) {
        setDir("Player 2 wins with power card!");
        temp2[player2Pick.type] += 1
        setScore2(temp2)
      } else if (player1Pick.value > player2Pick.value) {
        setDir("Player 1 wins with higher value!");
        temp1[player1Pick.type] += 1
        setScore1(temp1)
      } else if (player1Pick.value < player2Pick.value) {
        setDir("Player 2 wins with higher value!");
        temp2[player2Pick.type] += 1
        setScore2(temp2)
      } else {
        setDir("It's a tie!");
      }
    } else {

      if (
        (player1Pick.type === 'Mage' && player2Pick.type === 'Knight') ||
        (player1Pick.type === 'Archer' && player2Pick.type === 'Mage') ||
        (player1Pick.type === 'Knight' && player2Pick.type === 'Archer')
      ) {
        setDir(`Player 1 wins! ${player1Pick.type} beats ${player2Pick.type}`);
        temp1[player1Pick.type] += 1
        setScore1(temp1)
      } else {
        setDir(`Player 2 wins! ${player2Pick.type} beats ${player1Pick.type}`);
        temp2[player2Pick.type] += 1
        setScore2(temp2)
      }
    }
    setLook(false)
    setStart(false)
  }

  const handleButtonPress = () => {

    // initial enter press
    if (!start) {
      setStart(true)
      setLook(true)
      setPlayer1Pick({})
      setPlayer2Pick({})
      setTurn(true)
      setBattle(false)
      setDir("Player 1 select a card and press enter")
    } else {

      // battle phase if both picks exist:
      if (player1Pick.type && player2Pick.type) {
        handleBattle()
      } else {
        if (look == true) {
          if (turn) {
            setDir("Look away Player 1! Player 2 press enter")
          } else {
            setDir("Look away Player 2! Player 1 press enter")
          }
          setLook(false)
        } else {
          if (turn) {
            setDir("Player 2 select a card and press enter")
          } else {
            setDir("Player 1 select a card and press enter")
          }
          setTurn(!turn)
          setLook(true)
        }

      }
    }

  }

  return (

    <div className='w-screen h-screen flex flex-col items-center bg-[#101010]'>
      <div className='flex justify-evenly w-screen'>
        <Scoreboard score={score1}/>
        <h1 className='text-5xl mt-8 text-white font-bold font-[MedievalSharp]'>Mage Archer Knight</h1>
        <Scoreboard score={score2}/>
      </div>
      {start ?
        <Player player="1" turn={turn} look={look} setPlayer1Pick={setPlayer1Pick} />
        :
        <Player player="1" turn={!turn} look={look} setPlayer1Pick={setPlayer1Pick} />
      }

      <div className='flex justify-center text-2xl mt-10 mb-5 text-white font-[MedievalSharp]'>{dir}</div>

      <button
        onClick={handleButtonPress}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 
                  rounded focus:outline-none focus:shadow-outline w-[100px] font-[MedievalSharp]">
        Enter
      </button>
      <Battle player1Pick={player1Pick} player2Pick={player2Pick} battle={battle} />

      <div className='flex flex-col h-screen justify-center'>
        <Player player="2" turn={!turn} look={look} setPlayer2Pick={setPlayer2Pick} />
      </div>
    </div>
  )
}

export default App
