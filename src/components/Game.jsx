import { useState, useEffect } from 'react'
import '../App.css'
import Player from './Player'
import Battle from './Battle'
import Scoreboard from './Scoreboard'
import socket from '../socket'
import Key from './Key'
import ExampleWin from './ExampleWin'
import Lobby from './Lobby'
import { useNavigate } from 'react-router-dom'

const Game = ({ isConnected, setIsConnected, code, showKey, showGame, setShowGame, setCode }) => {

    const [dir, setDir] = useState("Select a card")
    const [player1Pick, setPlayer1Pick] = useState({})
    const [player2Pick, setPlayer2Pick] = useState({})
    const [battle, setBattle] = useState(false)
    const [score1, setScore1] = useState({ "Mage": 0, "Archer": 0, "Knight": 0 })
    const [score2, setScore2] = useState({ "Mage": 0, "Archer": 0, "Knight": 0 })
    const [cards, setCards] = useState([])
    const [cards2, setCards2] = useState([])
    const [send, setSend] = useState(false)
    const [series, setSeries] = useState({ "You": 0, "Opponent": 0 })

    const types = ["Mage", "Archer", "Knight"]
    const [deck, setDeck] = useState([])
    const [deck2, setDeck2] = useState([])
    const delay = ms => new Promise(res => setTimeout(res, ms));

    const navigate = useNavigate()


    const [textColor, setTextColor] = useState('red')

    useEffect(() => {
        if (!isConnected) {
          navigate('/');
        }
    
        socket.on('disconnect', () => {
          setIsConnected(false);
          navigate('/');
        });
    
        // Clean up the event listener when the component unmounts
        return () => {
          socket.off('disconnect');
        };
      }, [isConnected, navigate, setIsConnected]);

    // shuffle deck
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

    // Creates the main users deck
    const createDeck1 = () => {
        setDeck(() => {
            let newDeck = [];

            // 5 power cards
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

            // 2 level 7 cards
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

            // 1 level 8 card
            let type = types[Math.floor(Math.random() * types.length)];
            newDeck.push({
                id: 7,
                type: type,
                value: 8,
                power: false
            });

            // rest of 8 random cards
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

    // Creates fake deck displayed at top of screen
    const createDeck2 = () => {
        setDeck2(() => {
            let newDeck = [];

            // 5 dummy cards
            for (let i = 0; i < 5; i++) {
                let type = types[Math.floor(Math.random() * types.length)];

                newDeck.push({
                    id: i,
                    type: type,
                    value: 0,
                    power: false
                });
            }

            return newDeck;
        });

        createHand(true);
    }

    // Creates the 5 cards user sees
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

    // Shows card in battle once player presses enter
    const handleCardSelect = (player, id) => {

        if (player == "1" && !send) {
            setPlayer1Pick(cards.filter(card => card.id == id)[0])
            console.log(cards.filter(card => card.id == id))
        }
    };

    useEffect(() => {
        createDeck1()
        createDeck2()
    }, [])


    const handleBattle = async () => {
        // show both battle cards
        setBattle(true)

        let temp1 = score1
        let temp2 = score2

        // Determine who wins and update score
        if (player1Pick.type === player2Pick.type) {
            if (player1Pick.power && !player2Pick.power) {
                setDir("You win with a power card!");
                setTextColor('green')
                temp1[player1Pick.type] += 1
                setScore1(temp1)
            } else if (!player1Pick.power && player2Pick.power) {
                
                setDir("You lose to a power card!");
                setTextColor('red')
                temp2[player2Pick.type] += 1
                setScore2(temp2)
            } else if (player1Pick.value > player2Pick.value) {
                setDir("You win with higher value!");
                setTextColor('green')
                temp1[player1Pick.type] += 1
                setScore1(temp1)
            } else if (player1Pick.value < player2Pick.value) {
                setDir("You lose due to having a lower value!");
                setTextColor('red')
                temp2[player2Pick.type] += 1
                setScore2(temp2)
            } else {
                setDir("It's a tie!");
                setTextColor('blue')
            }
        } else {

            if (
                (player1Pick.type === 'Mage' && player2Pick.type === 'Knight') ||
                (player1Pick.type === 'Archer' && player2Pick.type === 'Mage') ||
                (player1Pick.type === 'Knight' && player2Pick.type === 'Archer')
            ) {
                setDir(`You win! ${player1Pick.type} beats ${player2Pick.type}`);
                setTextColor('green')
                temp1[player1Pick.type] += 1
                setScore1(temp1)
            } else {
                setDir(`You lose! ${player2Pick.type} beats ${player1Pick.type}`);
                setTextColor('red')
                temp2[player2Pick.type] += 1
                setScore2(temp2)
            }
        }

        // Replace card used with new card from deck
        setCards(prevArr => {
            const newArr = prevArr.filter(card => card.id != player1Pick.id);
            const t1 = [...deck];
            newArr.push(t1.pop());
            setDeck(t1);
            return newArr;
        })

        // Wait 3 seconds
        await delay(3000)


        if (checkWin()) {
            setDir("GAME OVER!")

            socket.emit('gameOver', code)
            await delay(3000)

            setSend(false)
            setPlayer1Pick({})
            setPlayer2Pick({})
            createDeck1()
            createDeck2()
            setBattle(false)
            setShowGame(false)
            setDir("Select a card")
            setTextColor("red")
            setScore1({ "Mage": 0, "Archer": 0, "Knight": 0 })
            setScore2({ "Mage": 0, "Archer": 0, "Knight": 0 })
        } else {
            setDir("Select a card")
            setTextColor('red')
        }

        setSend(false)
        setPlayer1Pick({})
        setPlayer2Pick({})
        setBattle(false)

    }

    // Win conditions
    const checkWin = () => {
        let temp = series

        if (score1["Mage"] > 0 && score1["Archer"] > 0 && score1["Knight"] > 0) {
            temp["You"] += 1
            setSeries(temp)
            return true;
        }

        if (score2["Mage"] > 0 && score2["Archer"] > 0 && score2["Knight"] > 0) {
            temp["Opponent"] += 1
            setSeries(temp)
            return true;
        }

        for (let category in score1) {
            if (score1[category] === 3) {
                temp["You"] += 1
                setSeries(temp)
                return true;
            }

            if (score2[category] === 3) {
                temp["Opponent"] += 1
                setSeries(temp)
                return true;
            }

        }

        return false;
    }

    const handleButtonPress = () => {

        // send card if you havent already
        if (!send && player1Pick.type) {

            // send card to server
            setDir("Wait for opponent pick")
            setTextColor('green')
            setSend(true)

            socket.emit("send-card", player1Pick, code)

        }

    }


    // listen for messages from server
    useEffect(() => {
        socket.on("receive-card", (card) => {
            setPlayer2Pick(card)
        })

        socket.on("player-quit", async () => {
            setDir("Opponent left game")
            await delay(3000)
            setIsConnected(false)
        })

    }, [socket])

    useEffect(() => {

        if (player1Pick.type && player2Pick.type && send) {
            handleBattle()
        }
    }, [player1Pick, player2Pick, send])

    return (



        <div className='w-screen h-screen pb-[60rem] flex flex-col items-center bg-gradient-to-b from-[#101010] to-[#4b4b4b] '>
            {
                showKey ? <div>
                    <div className='absolute left-0'><Key /></div>
                    <div className='absolute right-0'><ExampleWin /></div>
                </div>
                    : <div></div>
            }

            <div className='flex w-screen justify-evenly'>
                <div className='flex m-auto mt-10'>
                    <h1 className='text-2xl lg:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-red-500  via-yellow-200 to-red-500 font-bold font-[MedievalSharp]'>Lords Duel</h1>
                </div>
            </div>

            {!showGame ? <div className='mt-[10rem]'> <Lobby series={series} setSeries={setSeries} code={code} setCode={setCode} setIsConnected={setIsConnected} setShowGame={setShowGame} /> </div> :

                <div className='flex flex-col items-center justify-center'>

                    <div className='flex mt-7'>
                        <Scoreboard score={score1} person={"You"} />
                        <Scoreboard score={score2} person={"Opponent"} />
                    </div>

                    <Battle player1Pick={player1Pick} player2Pick={player2Pick} battle={battle} />
                    <div
                        className='flex justify-center text-xl mt-4 mb-5 lg:w-full font-[MedievalSharp]'
                        style={{ color: textColor }}
                    >
                        {dir}
                    </div>

                    <button
                        onClick={handleButtonPress}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 
                                rounded focus:outline-none focus:shadow-outline w-[80px] font-[MedievalSharp]">
                        Enter
                    </button>

                    <div className='lg:mt-12'>
                        <Player player="1" look={true} cards={cards} handleCardSelect={handleCardSelect} />
                    </div>
                </div>

            }

        </div>

    )
}

export default Game
