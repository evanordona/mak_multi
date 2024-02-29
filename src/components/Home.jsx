import React, { useState } from 'react'
import Host from './Host'
import Join from './Join'

const Home = ({ setIsConnected, code, setCode }) => {

    const [host, setHost] = useState(false)
    const [join, setJoin] = useState(false)


    const handleHost = () => {
        setHost(true)

    }

    const handleJoin = () => {
        setJoin(true)
    }

    return (
        <div className='h-screen f-screen flex flex-col items-center justify-center bg-[#101010]'>

            <h1 className='text-4xl text-white font-[MedievalSharp] '>
                Mage Archer Knight
            </h1>


            {
                !host && !join ? (

                    <div className='mt-16 flex w-[300px] justify-evenly '>

                        <button onClick={handleHost} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 
                             rounded focus:outline-none focus:shadow-outline w-[100px] font-[MedievalSharp]'>Host</button>
                        <button onClick={handleJoin} className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 
                             rounded focus:outline-none focus:shadow-outline w-[100px] font-[MedievalSharp]'>Join</button>
                    </div>) : (
                    <div>
                        {
                            host ? <Host setIsConnected={setIsConnected} setCode={setCode} code={code} /> : <Join setIsConnected={setIsConnected} setCode={setCode} code={code} />
                        }
                    </div>
                )
            }



        </div>
    )
}

export default Home