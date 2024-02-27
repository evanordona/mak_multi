import { useState, useEffect } from 'react'
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
  const [score1, setScore1] = useState({ "Mage": 0, "Archer": 0, "Knight": 0 })
  const [score2, setScore2] = useState({ "Mage": 0, "Archer": 0, "Knight": 0 })
  const [cards, setCards] = useState([])
  const [cards2, setCards2] = useState([])

  const types = ["Mage", "Archer", "Knight"]
  const [deck, setDeck] = useState([])
  const [deck2, setDeck2] = useState([])

  function shuffle(array) {
    let currentIndex = array.length, randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex > 0) {

      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }

    return array;
  }

  const createDeck1 = () => {
    setDeck(prevDeck => {
      let newDeck = [];

      for (let i = 0; i < 5; i++) {
        let type = types[Math.floor(Math.random() * types.length)];
        let val = Math.floor(Math.random() * 6) + 1;
        newDeck.push({
          id: i,
          type: type,
          value: val,
          power: true
        });
      }

      for (let i = 0; i < 2; i++) {
        let type = types[Math.floor(Math.random() * types.length)];
        let val = 7;
        newDeck.push({
          id: i + 5,
          type: type,
          value: val,
          power: false
        });
      }

      let type = types[Math.floor(Math.random() * types.length)];
      newDeck.push({
        id: 6,
        type: type,
        value: 8,
        power: false
      });

      for (let i = 0; i < 8; i++) {
        let type = types[Math.floor(Math.random() * types.length)];
        let val = Math.floor(Math.random() * 6) + 1;
        newDeck.push({
          id: i + 8,
          type: type,
          value: val,
          power: false
        });
      }

      return shuffle(newDeck);
    });

    createHand(false);
  }

  const createDeck2 = () => {
    setDeck2(prevDeck => {
      let newDeck = [];

      for (let i = 0; i < 5; i++) {
        let type = types[Math.floor(Math.random() * types.length)];
        let val = Math.floor(Math.random() * 6) + 1;
        newDeck.push({
          id: i,
          type: type,
          value: val,
          power: true
        });
      }

      for (let i = 0; i < 2; i++) {
        let type = types[Math.floor(Math.random() * types.length)];
        let val = 7;
        newDeck.push({
          id: i + 5,
          type: type,
          value: val,
          power: false
        });
      }

      let type = types[Math.floor(Math.random() * types.length)];
      newDeck.push({
        id: 6,
        type: type,
        value: 8,
        power: false
      });

      for (let i = 0; i < 8; i++) {
        let type = types[Math.floor(Math.random() * types.length)];
        let val = Math.floor(Math.random() * 6) + 1;
        newDeck.push({
          id: i + 8,
          type: type,
          value: val,
          power: false
        });
      }

      return shuffle(newDeck);
    });

    createHand(true);
  }

  const createHand = (check) => {

    if (!check) {
      setDeck(prevArr => {
        const newArr = [...prevArr]
        const newCards = []
        for (let i = 0; i < 5; i++) {
          newCards.push(newArr.pop())
        }

        setCards(newCards)
        return newArr
      })
    } else {
      setDeck2(prevArr => {
        const newArr = [...prevArr]
        const newCards = []
        for (let i = 0; i < 5; i++) {
          newCards.push(newArr.pop())
        }

        setCards2(newCards)
        return newArr
      })
    }

  }


  const handleCardSelect = (player, id) => {

    if (player == "1") {
      setPlayer1Pick(cards.filter(card => card.id == id)[0])
      console.log(cards.filter(card => card.id == id))
    } else {
      setPlayer2Pick(cards2.filter(card => card.id == id)[0])
      console.log(cards2.filter(card => card.id == id))
    }

  };

  useEffect(() => {
    createDeck1()
    createDeck2()
  }, [])


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
    console.log(player1Pick.id)
    setCards(prevArr => {
      const newArr = prevArr.filter(card => card.id != player1Pick.id);
      const t1 = [...deck];
      newArr.push(t1.pop());
      setDeck(t1);
      return newArr;
    })

    setCards2(prevArr => {
      const newArr = prevArr.filter(card => card.id != player2Pick.id);
      const t2 = [...deck2];
      newArr.push(t2.pop());
      setDeck2(t2);
      return newArr;
    })

    setLook(false)
    setStart(false)
  }

  const checkWin = () => {
    if (score1["Mage"] > 0 && score1["Archer"] > 0 && score1["Knight"] > 0) {
      return true;
    }

    if (score2["Mage"] > 0 && score2["Archer"] > 0 && score2["Knight"] > 0) {
      return true;
    }

    for (let category in score1) {
      if (score1[category] === 3 || score2[category] === 3) {
        return true;
      }
    }

    return false;
  }

  const handleButtonPress = () => {

    // initial enter press
    if (!start) {
      // check for win here
      if (checkWin()) {
        setDir("GAME OVER")
        setStart(false)
        setLook(false)
        setTurn(true)
        setCards([])
        setCards2([])
        setPlayer1Pick({})
        setPlayer2Pick({})
        setBattle(false)
        setScore1({ "Mage": 0, "Archer": 0, "Knight": 0 })
        setScore2({ "Mage": 0, "Archer": 0, "Knight": 0 })
        setDeck([])
        setDeck2([])
        createDeck1(deck)
        createDeck2(deck2)
        return
      }

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
        <Scoreboard score={score1} />
        <h1 className='text-5xl mt-8 text-white font-bold font-[MedievalSharp]'>Mage Archer Knight</h1>
        <Scoreboard score={score2} />
      </div>
      {start ?
        <Player player="1" turn={turn} look={look} setPlayer1Pick={setPlayer1Pick} cards={cards} handleCardSelect={handleCardSelect} />
        :
        <Player player="1" turn={!turn} look={look} setPlayer1Pick={setPlayer1Pick} cards={cards} handleCardSelect={handleCardSelect} />
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
        <Player player="2" turn={!turn} look={look} setPlayer2Pick={setPlayer2Pick} cards={cards2} handleCardSelect={handleCardSelect} />
      </div>
    </div>
  )
}

export default App
