import React from 'react'


const Card = ({ type, value, turn, power}) => {

    let bgColor = '';

    switch (type) {
        case 'Mage':
            bgColor = 'bg-blue-300';
            break;
        case 'Archer':
            bgColor = 'bg-green-300';
            break;
        case 'Knight':
            bgColor = 'bg-red-300';
            break;
            
    }

    if (!turn) {
        bgColor = 'bg-gray-300';
    }

    const glowClass = power && turn ? 'glow' : '';


    return (
        <div className={`${bgColor} py-5 mx-2 w-[100px] flex flex-col justify-center items-center rounded-lg ${glowClass}`}>
            {
                turn ?  (<div className='flex flex-col justify-center items-center'>
                            <div className='text-3xl'>{type}</div>
                            <div className=' text-purple-500 text-2xl'>{value}</div>
                        </div>)
                    : (<></>)
            }         
        </div>
    )
}

export default Card