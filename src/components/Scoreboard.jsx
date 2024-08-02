import React from 'react'

const Scoreboard = ({ score, person }) => {
    const typeEmojis = {
        Mage: '🧙‍♂️',
        Archer: '🏹',
        Knight: '🛡️'
    };

    return (
        <div className='w-1/3 max-w-md p-4 mx-auto'>
            <div className='mb-4'>
                <h2 className='text-2xl font-bold text-center text-white font-medieval'>{person}</h2>
            </div>

            <div className='grid grid-cols-3 gap-4'>
                {Object.entries(score).map(([type, count]) => (
                    <div key={type} className='flex flex-col items-center'>
                        
                        <div className='grid grid-cols-3 gap-1'>
                            {Array.from({ length: 5 }).map((_, index) => (
                                <div key={`${type}-${index}`} className='text-2xl'>
                                    {index < count ? typeEmojis[type] : ''}
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Scoreboard