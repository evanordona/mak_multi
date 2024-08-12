import React from 'react'

const ExampleWin = () => {
    return (
        <div className='mt-2 mr-2'>
            <div className='flex h-[60px] justify-evenly lg:h-[150px]'>

                <div className='flex flex-col gap-3 mr-2 justify-evenly'>
                    <div className='w-[15px] h-[15px] lg:w-[30px] lg:h-[30px]'>🧙‍♂️</div>
                    <div className='w-[15px] h-[15px] lg:w-[30px] lg:h-[30px]'>🧙‍♂️</div>
                    <div className='w-[15px] h-[15px] lg:w-[30px] lg:h-[30px]'>🧙‍♂️</div>

                </div>

                <div className='w-1 bg-white rounded-lg'>

                </div>
                <div className='flex items-center justify-evenly w-[70px] lg:w-[150px] gap-3'>
                    <div className='w-[15px] h-[15px] lg:w-[30px] lg:h-[30px]'>🛡️</div>
                    <div className='w-[15px] h-[15px] lg:w-[30px] lg:h-[30px]'>🧙‍♂️</div>
                    <div className='w-[15px] h-[15px] lg:w-[30px] lg:h-[30px]'>🏹</div>
                </div>
            </div>

        </div>
    )
}

export default ExampleWin