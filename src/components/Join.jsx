import React, { useState, useEffect } from 'react'
import socket from '../socket'

const Join = ({ setIsConnected, code, setCode}) => {


    const joinRoom = () => {
        socket.emit("joinRoom", code)
    }

    useEffect(()=> {
        socket.on('startGame', ()=> {
            setIsConnected(true)
        }) 
    }, [socket])

    return (
        <div className='text-white flex flex-col justify-center items-center'>
            <h1 className='text-2xl my-5 font-[MedievalSharp]'>Enter Room Code:</h1>
            <input type='text' value={code} onChange={e => setCode(e.target.value)} className='text-center px-1 py-1 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 text-black text-3xl w-40  '></input>

            <button onClick={joinRoom} className='mt-10 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 
                             rounded focus:outline-none focus:shadow-outline w-[100px] font-[MedievalSharp]'>Enter</button>

        </div>
    )
}

export default Join