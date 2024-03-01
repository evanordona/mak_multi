import React, { useState } from 'react'
import mageImage from '../assets/wizard.jpg'
import archerImage from '../assets/archer.jpg'
import knightImage from '../assets/knight.jpg'
import backImage from '../assets/backcard.png'

const Card = ({ player, id, type, value, look, power, onSelect }) => {

    // used to see if a card has been clicked
    const [selected, setSelected] = useState(false)

    let bgColor = '';
    let borderType = ''
    let cardImage = null;

    const glowClass = power && look ? 'glow' : '';

    // handle card click
    const handleClick = () => {
        setSelected(!selected);
        onSelect(player, id)
    };

    switch (type) {
        case 'Mage':
            bgColor = 'bg-blue-300';
            borderType = 'border-4 border-blue-300'
            cardImage = mageImage;
            break;
        case 'Archer':
            bgColor = 'bg-green-300';
            borderType = 'border-4 border-green-300'
            cardImage = archerImage;
            break;
        case 'Knight':
            bgColor = 'bg-red-300';
            borderType = 'border-4 border-red-300'
            cardImage = knightImage;
            break;

    }

    if (!look) {
        bgColor = 'bg-gray-300';
    }

    return (
        <div className={`
                        ${look ? borderType : ''} ${bgColor} py-5 mx-2 w-[80px] h-[100px] lg:w-[100px] lg:h-[125px] flex flex-col justify-center items-center rounded-lg 
                        ${glowClass} ${look ? 'hover:scale-[115%]' : ''} bg-cover bg-center`}

            style={{ backgroundImage: look ? `url(${cardImage})` : `url(${backImage})` }}
            onClick={handleClick}>

            {

                look ?
                    (<div className='flex flex-col items-center justify-center'>
                        <div className='text-xl lg:text-3xl font-[MedievalSharp] text-white lg:font-outline-2'>{type}</div>
                        <div className=' text-white text-lg lg:text-2xl font-[MedievalSharp] font-bold'>{value}</div>
                    </div>)
                    :
                    (<div className='flex flex-col items-center justify-center'>

                    </div>)
            }

        </div>
    )
}

export default Card