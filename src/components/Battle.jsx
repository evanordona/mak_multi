import React from 'react'
import Card from './Card'

const Battle = ({ player1Pick, player2Pick, battle }) => {

    return (
        <div className='mt-6 flex w-[300px] lg:w-[490px] h-[80px] lg:h-[125px] justify-evenly mb-5'>
        
        {
            player1Pick.type ?
                <Card type={player1Pick.type} value={player1Pick.value} look={true} power={player1Pick.power} />
            :
                <></>
        }

        {
            player2Pick.type ? 
                <Card type={player2Pick.type} value={player2Pick.value} look={battle} power={player2Pick.power}/>
                
            :
                <></>
        }

    </div>
    )
}

export default Battle