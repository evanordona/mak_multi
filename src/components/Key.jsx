import React from 'react'

const Key = () => {


  return (
    <div className='text-xl flex flex-col items-center justify-center text-white w-[200px] h-[185px]'>
      <div className='font-[MedievalSharp] text-2xl'>What beats What:</div>
      <div className=''>
        <h1 className='text-red-300'>Knight <span className='text-white'>&#8594;</span> <span className='text-green-300'>Archer</span></h1>
        <h1 className='text-green-300'>Archer <span className='text-white'>&#8594;</span> <span className='text-blue-300'>Mage</span></h1>
        <h1 className='text-blue-300'>Mage <span className='text-white'>&#8594;</span> <span className='text-red-300'>Knight</span></h1>
      </div>
    </div>
  )
}

export default Key