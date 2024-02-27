import React, { useState } from 'react'


const Card = ({ id, type, value, turn, power, look, onSelect }) => {

    const [selected, setSelected] = useState(false)    
    let bgColor = '';
    const glowClass = power && turn && look ? 'glow' : '';


    const handleClick = () => {
        setSelected(!selected);
        onSelect(id, turn)
    };

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

    if (!turn || !look) {
        bgColor = 'bg-gray-300';
    }
    

    return (
        <div className={`${selected ? 'scale-[115%]' : 'scale-100'} 
                        ${bgColor} py-5 mx-2 w-[100px] flex flex-col justify-center items-center rounded-lg 
                        ${glowClass} ${look ? 'hover:scale-[115%]' : ''}`}
            onClick={handleClick}>

            {
                turn && look ?
                    (<div className='flex flex-col justify-center items-center h-[125px]'>
                        <div className='text-3xl font-[MedievalSharp]'>{type}</div>
                        <div className=' text-purple-500 text-2xl font-[MedievalSharp] font-bold'>{value}</div>
                    </div>)
                    :
                    (<div className='flex flex-col justify-center items-center h-[125px]'>
                      
                    </div>)
            }

        </div>
    )
}

export default Card