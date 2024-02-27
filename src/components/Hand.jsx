import React, { useEffect, useState } from 'react'
import Card from './Card'

const Hand = ({ player, turn, look, setPlayer1Pick, setPlayer2Pick }) => {

    const types = ["Mage", "Archer", "Knight"]
    let deck = []
    const [cards, setCards] = useState([])

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

    const createDeck = () => {
        for (let i = 0; i < 5; i++) {
            let type = types[Math.floor(Math.random() * types.length)]
            let val = Math.floor(Math.random() * 6) + 1
            deck.push({
                id: i,
                type: type,
                value: val,
                power: true
            })
        }

        for (let i = 0; i < 2; i++) {
            let type = types[Math.floor(Math.random() * types.length)]
            let val = 7
            deck.push({
                id: i + 5,
                type: type,
                value: val,
                power: false
            })
        }

        let type = types[Math.floor(Math.random() * types.length)]
        deck.push({
            id: 7,
            type: type,
            value: 8,
            power: false
        })

        for (let i = 0; i < 8; i++) {
            let type = types[Math.floor(Math.random() * types.length)]
            let val = Math.floor(Math.random() * 6) + 1
            deck.push({
                id: i + 8,
                type: type,
                value: val,
                power: false
            })
        }


        deck = shuffle(deck)
        createHand()
    }

    const createHand = () => {
        let newCards = [];
        for (let i = 0; i < 5; i++) {
            newCards.push(deck.pop());
        }
        setCards(newCards);
    }


    const handleCardSelect = (id, turn) => {

        if (player == "1") {
            setPlayer1Pick(cards.filter(card => card.id == id)[0])
            console.log(cards.filter(card => card.id == id))
        } else {
            setPlayer2Pick(cards.filter(card => card.id == id)[0])
            console.log(cards.filter(card => card.id == id))
        }

        // const updatedCards = cards.filter(card => card.id !== id);
        // setCards(updatedCards);

    };

    useEffect(() => {
        createDeck()
    }, [])


    return (
        <div className='flex w-[600px] h-[125px] justify-evenly'>
            {cards.map((card, index) => (
                <Card
                    key={`${card.id}-${index}`}
                    id={card.id}
                    type={card.type}
                    value={card.value}
                    turn={turn}
                    power={card.power}
                    look={look}
                    onSelect={handleCardSelect}
                />
            ))}
        </div>
    )
}

export default Hand