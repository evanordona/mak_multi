import React from 'react'
import Hand from './Hand'

const Player = ({ player, look, cards, handleCardSelect }) => {

    return (
        <div>
            <div className='flex justify-center text-2xl lg:text-4xl py-4 text-white font-[MedievalSharp]'>
                Player {player}:
            </div>

            <Hand
                player={player}
                look={look}
                cards={cards}
                handleCardSelect={handleCardSelect} />

        </div>
    )
}

export default Player