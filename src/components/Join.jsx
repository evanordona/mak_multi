import React, { useState, useEffect } from 'react'
import socket from '../socket'

const Join = ({ setIsConnected, code, setCode, setShowGame, setJoin }) => {

    // Join user to room
    const joinRoom = () => {
        socket.emit("joinRoom", code)
    }

    useEffect(() => {
        socket.on('startGame', () => {
            setIsConnected(true)
            setShowGame(true)
        })
    }, [socket])

    return (
        <div className='flex flex-col items-center justify-center text-white'>
            <h1 className='text-2xl my-5 font-[MedievalSharp]'>Enter Room Code:</h1>
            <input type='text' value={code} onChange={e => setCode(e.target.value)} className='w-40 px-1 py-1 text-3xl text-center text-black border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 '></input>

            <button onClick={joinRoom} className='mt-10 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 
                             rounded focus:outline-none focus:shadow-outline w-[100px] font-[MedievalSharp]'>Enter</button>

            <button onClick={() => setJoin(false)} className='mt-10 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-2 
                             rounded focus:outline-none focus:shadow-outline w-[100px] font-[MedievalSharp]'>Back</button>
        </div>
    )
}

export default Join