import React, { useState } from 'react'
import Host from './Host'
import Join from './Join'
import Key from './Key'
import ExampleWin from './ExampleWin'

const Home = ({setShowGame, setIsConnected, code, setCode, showKey, setShowKey }) => {

    const [host, setHost] = useState(false)
    const [join, setJoin] = useState(false)

    const handleClick = () => {
        setShowKey(!showKey)
    }

    const handleHost = () => {
        setHost(true)

    }

    const handleJoin = () => {
        setJoin(true)
    }

    return (
        <div className='flex flex-col items-center h-screen w-screen bg-gradient-to-b from-[#101010] to-[#4b4b4b]'>
            {showKey ?

                <div>
                    <div className='absolute left-0'>
                        <Key />

                    </div>

                    <div className='absolute right-0'>
                        <ExampleWin />

                    </div>


                </div> :

                <div></div>}
            <div className='flex flex-col items-center justify-center w-screen h-screen'>

                <h1 className='text-4xl lg:text-5xl font-[MedievalSharp] bg-clip-text text-transparent bg-gradient-to-r from-red-500  via-yellow-200 to-red-500 font-bold'>
                    Lords Duel
                </h1>


                {
                    !host && !join ? (
                        <div className='flex flex-col items-center justify-center'>


                            <div className='mt-16 flex w-[300px] justify-evenly '>

                                <button onClick={handleHost} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 
                             rounded focus:outline-none focus:shadow-outline w-[100px] font-[MedievalSharp]'>Host</button>
                                <button onClick={handleJoin} className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 
                             rounded focus:outline-none focus:shadow-outline w-[100px] font-[MedievalSharp]'>Join</button>

                            </div>

                            <div>
                                <button onClick={handleClick} className='mt-10 px-4 py-2 font-bold text-white bg-green-500 hover:bg-green-700 rounded 
                            focus:outline-none focus:shadow-outline w-[100px] font-[MedievalSharp] text-[14px]'>
                                    {showKey ? "Hide Key" : "Show Key"}
                                </button>
                            </div>

                        </div>

                    ) : (
                        <div>
                            {
                                host ? <Host setShowGame={setShowGame} setIsConnected={setIsConnected} setCode={setCode} code={code} /> : <Join setShowGame={setShowGame} setIsConnected={setIsConnected} setCode={setCode} code={code} />
                            }
                        </div>
                    )
                }



            </div>

        </div>
    )
}

export default Home