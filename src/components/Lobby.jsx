import React, { useEffect, useState } from 'react'
import socket from '../socket'

const Lobby = ({ setShowGame, setIsConnected, setCode, code }) => {

    const [message, setMessage] = useState("Your choice?")
    const [redButton, setRedButton] = useState("I'm scared")
    const [clicked, setClicked] = useState(false)

    const handleRerun = () => {
        if (!clicked) {
            setMessage("Waiting for opponent...")
            socket.emit("rerun", code)
            setClicked(true)
        }

    }

    const handleLeave = () => {
        setMessage("Scared smh")
        setShowGame(false)
        setIsConnected(false)
        
        socket.emit("leaveLobby", code)
        setCode("")

    }

    useEffect(() => {
        socket.on('rematch', () => {
            setShowGame(true)
            setIsConnected(true)
        })

        socket.on('leave', () => {
            setMessage("Opponent ran away!")
            setRedButton("Leave Lobby")
            setClicked(true)
            setCode("")
        })
    }, [socket])

    return (

        <div className='flex flex-col items-center justify-center'>
            <h1 className='text-3xl text-white font-[MedievalSharp]'>
                {message}
            </h1>
            <div className='flex text-white w-[250px] justify-evenly mt-[5rem]'>
                <button onClick={handleRerun} className='p-2 rounded-lg bg-emerald-500 font-[MedievalSharp] hover:bg-emerald-800'>RUN IT BACK!!</button>
                <button onClick={handleLeave} className='p-2 bg-red-500 rounded-lg font-[MedievalSharp] hover:bg-red-800'>{redButton}</button>
            </div>
        </div>
    )
}

export default Lobby