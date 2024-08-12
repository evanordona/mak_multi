import React, { useState } from 'react'
import Host from './Host'
import Join from './Join'
import Key from './Key'
import ExampleWin from './ExampleWin'

const Home = ({ setShowGame, setIsConnected, code, setCode, showKey, setShowKey }) => {
    const [host, setHost] = useState(false)
    const [join, setJoin] = useState(false)

    const handleClick = () => setShowKey(!showKey)
    const handleHost = () => setHost(true)
    const handleJoin = () => setJoin(true)

    return (
        <div className='w-full min-h-screen text-white body-background'>
            <div className='stars'></div>
            <div className='container relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-8 mx-auto'>
                <h1 className='text-5xl lg:text-7xl font-[MedievalSharp] text-center mb-12 relative'>
                    <span className='relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-yellow-300 to-red-500'>
                        Lords Duel
                    </span>
                </h1>

                {!host && !join ? (
                    <div className='w-full max-w-md'>
                        <div className='flex flex-col items-center justify-center p-8 mb-8 bg-gray-800 bg-opacity-50 rounded-lg shadow-lg'>
                            <div className='flex flex-col justify-center gap-4 mb-6 sm:flex-row'>
                                <button onClick={handleHost} className='btn-primary'>
                                    Host Game
                                </button>
                                <button onClick={handleJoin} className='btn-secondary'>
                                    Join Game
                                </button>
                            </div>
                            <button onClick={handleClick} className='mt-5 btn-tertiary w-fit'>
                                {showKey ? "Hide Key" : "Show Key"}
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className='w-full max-w-md'>
                        {host ?
                            <Host setShowGame={setShowGame} setIsConnected={setIsConnected} setCode={setCode} code={code} setHost={setHost} /> :
                            <Join setShowGame={setShowGame} setIsConnected={setIsConnected} setCode={setCode} code={code} setJoin={setJoin} />
                        }
                    </div>
                )}
            </div>

            {showKey && (
                <div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50'>
                    <div className='w-full max-w-2xl p-6 mx-4 bg-gray-800 rounded-lg shadow-xl'>
                        <h2 className='text-4xl font-[MedievalSharp] mb-4 flex justify-center'>Game Key</h2>
                        <div className='flex justify-center'>
                            <Key />

                        </div>
                        <h2 className='text-2xl font-[MedievalSharp] mt-8 mb-4 flex justify-center'>Example Wins</h2>
                        <ExampleWin />
                        <button onClick={handleClick} className='w-full mt-10 btn-tertiary'>
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Home