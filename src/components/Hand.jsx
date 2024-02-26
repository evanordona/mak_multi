import React from 'react'
import Card from './Card'

const Hand = () => {

    const cards = [
        {
            id: 1,
            type: "Mage",
            value: "5"
        },
        {
            id: 2,
            type: "Archer",
            value: "3"
        },
        {
            id: 3,
            type: "Knight",
            value: "6"
        },
    ]

    return (
        <div className='flex w-[600px] h-[125px] justify-evenly'>
            {cards.map(card => (
                <Card key={card.id} type={card.type} value={card.value} />
            ))}
        </div>
    )
}

export default Hand