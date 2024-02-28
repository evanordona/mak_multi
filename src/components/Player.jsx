import React from 'react'
import Hand from './Hand'

const Player = ({ player, turn, look, setPlayer1Pick, setPlayer2Pick, cards, handleCardSelect }) => {

    return (
        <div>
            <div className='flex justify-center text-2xl lg:text-4xl py-4 text-white font-[MedievalSharp]'>
                Player {player}:
            </div>

            <Hand
                player={player}
                turn={turn}
                look={look}
                setPlayer1Pick={setPlayer1Pick}
                setPlayer2Pick={setPlayer2Pick}
                cards={cards}
                handleCardSelect={handleCardSelect} />

        </div>
    )
}

export default Player