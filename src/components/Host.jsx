import React, { useEffect, useState } from 'react'
import socket from '../socket'

const Host = ({ setIsConnected, code, setCode, setShowGame, setHost}) => {



    const generateRoomCode = () => {
        const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
        let code = '';
        for (let i = 0; i < 3; i++) {
            code += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return code;
    }

    const goBack = () => {
        setCode('')
        setHost(false)
    }


    useEffect(() => {
        setCode(generateRoomCode());
    }, []);

    // make the host join the room
    useEffect(() => {
        if (code !== '') {
            socket.emit('joinRoom', code);
        }
    }, [code]);

    // listen for other user to join then start game
    useEffect(() => {
        socket.on('startGame', () => {
            setIsConnected(true)
            setShowGame(true)
        })
    }, [socket])

    return (
        <div className='flex flex-col items-center justify-center mt-10 text-white'>
            <h1 className='text-2xl font-[MedievalSharp]'>Room Code: </h1>
            <h1 className='mt-5 text-5xl text-red-300'>{code}</h1>
            
            <button onClick={goBack} className='mt-10 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-2 
                             rounded focus:outline-none focus:shadow-outline w-[100px] font-[MedievalSharp]'>Back</button>
        </div>
    )
}

export default Host