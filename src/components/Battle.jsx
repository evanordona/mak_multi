import React from 'react'
import Card from './Card'

const Battle = ({ player1Pick, player2Pick, battle }) => {
    return (
        <div className='my-6 flex w-[990px] h-[125px] justify-evenly'>
        {
            player1Pick.type ?
                <Card type={player1Pick.type} value={player1Pick.value} turn={battle} power={player1Pick.power} look={battle} />
            :
                <></>
        }
        {
            player2Pick.type ? 
                <Card type={player2Pick.type} value={player2Pick.value} turn={battle} power={player2Pick.power} look={battle} />
            :
                <></>
        }
    </div>
    )
}

export default Battle