import React from 'react'

const ExampleWin = () => {
    return (
        <div className='mt-2 mr-2'>
            <h1 className='text-white lg:text-2xl'>Example Wins:</h1>
            <div className='flex h-[60px] justify-evenly lg:h-[150px]'>

                <div className='flex flex-col justify-evenly'>
                    <div className='w-[15px] h-[15px] lg:w-[30px] lg:h-[30px] bg-blue-300 rounded-md'></div>
                    <div className='w-[15px] h-[15px] lg:w-[30px] lg:h-[30px] bg-blue-300 rounded-md'></div>
                    <div className='w-[15px] h-[15px] lg:w-[30px] lg:h-[30px] bg-blue-300 rounded-md'></div>

                </div>

                <div className='w-1 bg-white rounded-lg'>

                </div>
                <div className='flex items-center justify-evenly w-[70px] lg:w-[150px]'>
                    <div className='w-[15px] h-[15px] lg:w-[30px] lg:h-[30px] bg-red-300 rounded-md'></div>
                    <div className='w-[15px] h-[15px] lg:w-[30px] lg:h-[30px] bg-blue-300 rounded-md'></div>
                    <div className='w-[15px] h-[15px] lg:w-[30px] lg:h-[30px] bg-green-300 rounded-md'></div>
                </div>
            </div>

        </div>
    )
}

export default ExampleWin