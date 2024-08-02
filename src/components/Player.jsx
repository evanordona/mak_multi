import React from 'react'
import Hand from './Hand'

const Player = ({ player, look, cards, handleCardSelect }) => {

    return (
        <div>

            <Hand
                player={player}
                look={look}
                cards={cards}
                handleCardSelect={handleCardSelect} />

        </div>
    )
}

export default Player