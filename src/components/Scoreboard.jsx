import React, { useState } from 'react'

const Scoreboard = ({ score, person }) => {

    const typeColors = {
        Mage: 'bg-blue-300',
        Archer: 'bg-green-300',
        Knight: 'bg-red-300'
    };


    return (
        <div className='w-[150px] lg:w-[600px] h-[150px]'>

            <div className='flex justify-center text-white'>
                <h1>{person}</h1>
            </div>

            <div className='flex justify-center'>
                {Object.keys(score).map(type => (
                    <div key={type} className='flex flex-col'>
                        {Array.from({ length: score[type] }).map((_, index) => (
                            <div key={`${type}-${index}`} className={`w-[25px] h-[25px] lg:w-[50px] lg:h-[50px] ${typeColors[type]} m-2 rounded-md`}>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Scoreboard