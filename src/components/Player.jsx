import React from 'react'
import Hand from './Hand'

const Player = ({ player, turn, look, setPlayer1Pick, setPlayer2Pick}) => {

    return (
        <div>
            <div className='flex justify-center text-4xl py-4 text-white font-[MedievalSharp]'>
                Player {player}:
            </div>

            <Hand player={player} turn={turn} look={look} setPlayer1Pick={setPlayer1Pick} setPlayer2Pick={setPlayer2Pick}/>

        </div>
    )
}

export default Player