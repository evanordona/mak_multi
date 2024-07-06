import React from 'react';
import { motion } from 'framer-motion';
import Card from './Card'; // Adjust the import based on your file structure

const Battle = ({ player1Pick, player2Pick, battle }) => {
  // Function to determine if both players have picked a card
  const bothPicked = player1Pick.type && player2Pick.type;

  return (
    <div className='mt-6 flex w-[300px] lg:w-[490px] h-[80px] lg:h-[125px] justify-evenly mb-5'>

        {player1Pick.type && (
          <Card
            type={player1Pick.type}
            value={player1Pick.value}
            look={true}
            power={player1Pick.power}
          />
        )}


      {battle && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2 }}
          className="flex items-center justify-center text-4xl font-bold text-white"
        >
          VS
        </motion.div>
      )}

        {player2Pick.type && (
          <Card
            type={player2Pick.type}
            value={player2Pick.value}
            look={battle}
            power={player2Pick.power}
          />
        )}

    </div>
  );
};

export default Battle;
