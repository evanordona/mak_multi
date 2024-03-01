import React, { useEffect, useState } from 'react'
import socket from '../socket'

const Host = ({ setIsConnected, code, setCode }) => {



    const generateRoomCode = () => {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let code = '';
        for (let i = 0; i < 6; i++) {
            code += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return code;
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
        })
    }, [socket])

    return (
        <div className='text-white flex flex-col justify-center items-center mt-10'>
            <h1 className='text-2xl font-[MedievalSharp]'>Room Code: </h1>
            <h1 className='text-5xl mt-5 text-red-300'>{code}</h1>
        </div>
    )
}

export default Host