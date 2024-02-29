import { useState, useEffect } from 'react'
import '../App.css'
import Player from './Player'
import Battle from './Battle'
import Scoreboard from './Scoreboard'
import socket from '../socket'

const Game = ({ setIsConnected, code }) => {

    const [turn, setTurn] = useState(true)
    const [look, setLook] = useState(true)
    const [dir, setDir] = useState("Select a card")
    const [start, setStart] = useState(true)
    const [player1Pick, setPlayer1Pick] = useState({})
    const [player2Pick, setPlayer2Pick] = useState({})
    const [battle, setBattle] = useState(false)
    const [score1, setScore1] = useState({ "Mage": 0, "Archer": 0, "Knight": 0 })
    const [score2, setScore2] = useState({ "Mage": 0, "Archer": 0, "Knight": 0 })
    const [cards, setCards] = useState([])
    const [cards2, setCards2] = useState([])
    const [send, setSend] = useState(false)

    const types = ["Mage", "Archer", "Knight"]
    const [deck, setDeck] = useState([])
    const [deck2, setDeck2] = useState([])
    const delay = ms => new Promise(res => setTimeout(res, ms));

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
                    value: 0,
                    power: false
                });
            }

            return newDeck;
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
        setBattle(true)
        let temp1 = score1
        let temp2 = score2
        if (player1Pick.type === player2Pick.type) {
            if (player1Pick.power && !player2Pick.power) {
                setDir("You win with a power card!");
                temp1[player1Pick.type] += 1
                setScore1(temp1)
            } else if (!player1Pick.power && player2Pick.power) {
                setDir("You lose to a power card!");
                temp2[player2Pick.type] += 1
                setScore2(temp2)
            } else if (player1Pick.value > player2Pick.value) {
                setDir("You win with higher value!");
                temp1[player1Pick.type] += 1
                setScore1(temp1)
            } else if (player1Pick.value < player2Pick.value) {
                setDir("You lose due to having a lower value!");
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
                setDir(`You win! ${player1Pick.type} beats ${player2Pick.type}`);
                temp1[player1Pick.type] += 1
                setScore1(temp1)
            } else {
                setDir(`You lose! ${player2Pick.type} beats ${player1Pick.type}`);
                temp2[player2Pick.type] += 1
                setScore2(temp2)
            }
        }

        
        setCards(prevArr => {
            const newArr = prevArr.filter(card => card.id != player1Pick.id);
            const t1 = [...deck];
            newArr.push(t1.pop());
            setDeck(t1);
            return newArr;
        })
        await delay(3000)


        if (checkWin()) {
            setDir("GAME OVER!")
            await delay(3000)
            setIsConnected(false)
        } else {
            setDir("Select a card")
        }

        setSend(false)
        setPlayer1Pick({})
        setPlayer2Pick({})
        setBattle(false)        

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
        if (!send) {

            // send card to server
            setDir("Wait for opponent pick")
            setSend(true)

            socket.emit("send-card", player1Pick, code)
            
        }

    }



    useEffect(()=> {
        socket.on("receive-card", (card)=> {
            setPlayer2Pick(card)
        })

        socket.on("player-quit", async () => {
            setDir("Opponent left game")
            await delay(3000)
            setIsConnected(false)
        })
    }, [socket])

    useEffect(()=> {
        
        if (player1Pick.type && player2Pick.type && send) {
            handleBattle()
        }
    }, [player1Pick, player2Pick, send])

    return (

        <div className='w-screen h-full flex flex-col items-center bg-[#101010]'>
            <div className='flex justify-evenly w-screen'>
                <Scoreboard score={score1} />
                <div className='flex m-auto'>
                    <h1 className='text-2xl lg:text-5xl text-white font-bold font-[MedievalSharp]'>Mage Archer Knight</h1>
                </div>
                <Scoreboard score={score2} />
            </div>

            <Player player="2" cards={cards2} handleCardSelect={handleCardSelect} />


            <div className='flex justify-center text-2xl mt-10 mb-5 w-[250px] lg:w-full text-white font-[MedievalSharp]'>{dir}</div>

            <button
                onClick={handleButtonPress}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 
                  rounded focus:outline-none focus:shadow-outline w-[100px] font-[MedievalSharp]">
                Enter
            </button>
            <Battle player1Pick={player1Pick} player2Pick={player2Pick} battle={battle} />

            <div className='lg:mt-12 pb-56'>
                <Player player="1" turn={turn} look={look} setPlayer1Pick={setPlayer1Pick} cards={cards} handleCardSelect={handleCardSelect} />
            </div>
        </div>
    )
}

export default Game