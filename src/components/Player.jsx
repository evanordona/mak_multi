import React from 'react'
import Hand from './Hand'

const Player = ({ player }) => {
    return (
        <div>
            <div className='flex justify-center text-4xl py-4'>
                Player {player}:
            </div>

            <Hand />

        </div>
    )
}

export default Player