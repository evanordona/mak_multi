import React from 'react'

const Card = ({ type, value }) => {

    return (
        <div className=' bg-gray-300 py-5 mx-2 w-[100px] flex flex-col justify-center items-center'>
            <div className='text-3xl'>{type}</div>
            <div className=' text-purple-500 text-2xl'>{value}</div>
        </div>
    )
}

export default Card