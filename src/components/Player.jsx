import React from 'react'
import Hand from './Hand'

const Player = ({ player, turn}) => {

    return (
        <div>
            <div className='flex justify-center text-4xl py-4 text-white'>
                Player {player}:
            </div>

            <Hand turn={turn}/>

        </div>
    )
}

export default Player