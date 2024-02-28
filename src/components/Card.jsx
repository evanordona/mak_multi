import React, { useState } from 'react'
import mageImage from '../assets/wizard.jpg'
import archerImage from '../assets/archer.jpg'
import knightImage from '../assets/knight.jpg'
import backImage from '../assets/backcard.png'

const Card = ({ player, id, type, value, turn, power, look, onSelect }) => {

    const [selected, setSelected] = useState(false)
    let bgColor = '';
    let borderType = ''
    const glowClass = power && turn && look ? 'glow' : '';


    const handleClick = () => {
        setSelected(!selected);
        onSelect(player, id)
    };

    switch (type) {
        case 'Mage':
            bgColor = 'bg-blue-300';
            borderType = 'border-4 border-blue-300'
            break;
        case 'Archer':
            bgColor = 'bg-green-300';
            borderType = 'border-4 border-green-300'
            break;
        case 'Knight':
            bgColor = 'bg-red-300';
            borderType = 'border-4 border-red-300'
            break;

    }

    let cardImage;
    switch (type) {
        case 'Mage':
            cardImage = mageImage;
            break;
        case 'Archer':
            cardImage = archerImage;
            break;
        case 'Knight':
            cardImage = knightImage;
            break;
        default:
            cardImage = null;
            break;
    }

    if (!turn || !look) {
        bgColor = 'bg-gray-300';
    }



    return (
        <div className={`
                        ${look && turn ? borderType : ''} ${bgColor} py-5 mx-2 w-[60px] lg:w-[100px] flex flex-col justify-center items-center rounded-lg 
                        ${glowClass} ${look ? 'hover:scale-[115%]' : ''} bg-cover bg-center`}

            style={{ backgroundImage: look && turn ? `url(${cardImage})` : `url(${backImage})` }}
            onClick={handleClick}>



            {
                turn && look ?
                    (<div className='flex flex-col justify-center items-center h-[125px]'>
                        <div className='text-xl lg:text-3xl font-[MedievalSharp] text-white lg:font-outline-2'>{type}</div>
                        <div className=' text-white text-lg lg:text-2xl font-[MedievalSharp] font-bold'>{value}</div>
                    </div>)
                    :
                    (<div className='flex flex-col justify-center items-center h-[125px]'>

                    </div>)
            }

        </div>
    )
}

export default Card