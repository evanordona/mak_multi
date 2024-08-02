import React, { useEffect, useState } from 'react'
import Card from './Card'

const Hand = ({player, look, cards, handleCardSelect}) => {

    return (
        <div className='flex flex-wrap justify-center w-[350px] h-[260px] lg:w-[600px] lg:h-[125px] lg:mt-0 mt-10'>
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