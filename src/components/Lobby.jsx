import React, { useEffect, useState } from 'react'
import socket from '../socket'

const Lobby = ({ setShowGame, setIsConnected, setCode, code, series, setSeries}) => {

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
        setSeries({"You": 0, "Opponent": 0})

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
            setSeries({"You": 0, "Opponent": 0})
            setCode("")
        })
    }, [socket])

    return (

        <div className='flex flex-col items-center justify-center'>
            <div className='text-3xl text-white font-[MedievalSharp] flex flex-col items-center justify-center'>
                <div className='text-2xl'>Series Score:</div>
                {series["You"] >= series["Opponent"] ?
                    <div className='mb-3 text-green-500'>{`${series["You"]}-${series["Opponent"]}`}</div>
                    :
                    <div className='mb-3 text-red-500'>{`${series["You"]}-${series["Opponent"]}`}</div>
                }
                <div>{message}</div>
            </div>

            <div className='flex text-white w-[250px] justify-evenly mt-[5rem]'>
                <button onClick={handleRerun} className='p-2 rounded-lg bg-emerald-500 font-[MedievalSharp] hover:bg-emerald-800'>RUN IT BACK!!</button>
                <button onClick={handleLeave} className='p-2 bg-red-500 rounded-lg font-[MedievalSharp] hover:bg-red-800'>{redButton}</button>
            </div>
        </div>
    )
}

export default Lobby