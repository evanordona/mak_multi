import React, { useEffect, useState } from 'react'
import Card from './Card'

const Hand = ({player, look, cards, handleCardSelect}) => {

    return (
        <div className='flex w-[350px] h-[80px] lg:w-[600px] lg:h-[125px] justify-evenly'>
            {cards.map((card, index) => (
                <Card
                    key={`${card.id}-${index}`}
                    id={card.id}
                    type={card.type}
                    value={card.value}
                    power={card.power}
                    look={look}
                    onSelect={handleCardSelect}
                    player={player}
                  
                />
            ))}
        </div>
    )
}

export default Hand