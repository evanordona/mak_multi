import React from 'react'

const Key = () => {


  return (
    <div className='ml-0 lg:ml-10 flex flex-col items-center justify-center text-white w-[130px] h-[115px] text-[12px] lg:text-lg'>
      <div className='font-bold underline'>Key</div>
      <div>
        <h1 className='text-red-300'>Knight <span className='text-white'>&#8594;</span> <span className='text-green-300'>Archer</span></h1>
        <h1 className='text-green-300'>Archer <span className='text-white'>&#8594;</span> <span className='text-blue-300'>Mage</span></h1>
        <h1 className='text-blue-300'>Mage <span className='text-white'>&#8594;</span> <span className='text-red-300'>Knight</span></h1>
      </div>
    </div>
  )
}

export default Key