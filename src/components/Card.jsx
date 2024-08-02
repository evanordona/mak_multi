import React from 'react'
import mageImage from '../assets/wizard.jpg'
import archerImage from '../assets/archer.jpg'
import knightImage from '../assets/knight.jpg'
import backImage from '../assets/backcard.png'

const Card = ({ player, id, type, value, look, power, onSelect }) => {
    let bgColor = '';
    let borderType = ''
    let cardImage = null;

    const handleClick = () => {
        if (look) {
            onSelect(player, id)
        }
    };

    switch (type) {
        case 'Mage':
            bgColor = 'bg-blue-400';
            borderType = 'border-4 border-blue-500 shadow-md shadow-black'
            cardImage = mageImage;
            break;
        case 'Archer':
            bgColor = 'bg-green-400';
            borderType = 'border-4 border-green-500 shadow-md shadow-black'
            cardImage = archerImage;
            break;
        case 'Knight':
            bgColor = 'bg-red-400';
            borderType = 'border-4 border-red-500 shadow-md shadow-black'
            cardImage = knightImage;
            break;
    }

    if (!look) {
        bgColor = 'bg-gray-400';
        borderType = 'shadow-lg shadow-black';
    }

    const cardClasses = `
        ${borderType} ${bgColor} 
        py-5 mx-2 w-[80px] h-[100px] lg:w-[100px] lg:h-[125px] 
        flex flex-col justify-center items-center rounded-lg 
        ${look ? 'hover:scale-105' : ''} 
        bg-cover bg-center transition-all duration-300 ease-in-out
        ${look ? 'cursor-pointer' : 'cursor-default'}
        relative overflow-visible
        ${power && look ? 'animate-brightPulse' : ''}
    `;

    return (
        <div 
            className={cardClasses}
            style={{ 
                backgroundImage: look ? `url(${cardImage})` : `url(${backImage})`,
            }}
            onClick={handleClick}
        >
            {look ? (
                <div className='flex flex-col items-center justify-center'>
                    <div className='text-xl lg:text-3xl font-[MedievalSharp] text-white shadow-sm'>{type}</div>
                    <div className='text-white text-lg lg:text-2xl font-[MedievalSharp] font-bold shadow-sm'>{value}</div>
                </div>
            ) : (
                <div className='flex flex-col items-center justify-center'>
                    {/* Empty div for consistency */}
                </div>
            )}
        </div>
    )
}

export default Card