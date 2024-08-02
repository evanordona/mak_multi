import React from 'react';
import { motion } from 'framer-motion';
import Card from './Card'; // Adjust the import based on your file structure
import { Sword, Target, Wand2 } from 'lucide-react';

const Battle = ({ player1Pick, player2Pick, battle, winner }) => {
  const bothPicked = player1Pick.type && player2Pick.type;

  const cardVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0 },
  };

  const resultVariants = {
    hidden: { scale: 0, rotate: -180 },
    visible: { scale: 1, rotate: 0 },
  };

  const getWinningCardIcon = () => {
    const winningCard = winner === 'player1' ? player1Pick : player2Pick;
    switch (winningCard.type) {
      case 'Knight':
        return <Sword size={40} className="text-white" />;
      case 'Archer':
        return <Target size={40} className="text-white" />;
      case 'Mage':
        return <Wand2 size={40} className="text-white" />;
      default:
        return null;
    }
  };

  const getResultBackgroundColor = () => {
    if (!battle || !winner) return 'bg-gray-600';
    return winner === 'player1' ? 'bg-green-600' : 'bg-red-600';
  };

  return (
    <motion.div 
      className='mt-6 flex flex-col items-center w-[70%] max-w-[490px] mx-auto'
      initial="hidden"
      animate="visible"
    >
      <div className='flex justify-between w-full mb-4'>
        <motion.div variants={cardVariants} transition={{ duration: 0.5 }}>
          {player1Pick.type && (
            <Card
              type={player1Pick.type}
              value={player1Pick.value}
              look={true}
              power={player1Pick.power}
            />
          )}
        </motion.div>
        <motion.div variants={cardVariants} transition={{ duration: 0.5, delay: 0.2 }}>
          {player2Pick.type && (
            <Card
              type={player2Pick.type}
              value={player2Pick.value}
              look={battle}
              power={player2Pick.power}
            />
          )}
        </motion.div>
      </div>
      
      {battle && bothPicked && (
        <motion.div
          variants={resultVariants}
          transition={{ duration: 0.5, delay: 0.4 }}
          className={`flex items-center justify-center p-4 rounded-full shadow-lg ${getResultBackgroundColor()}`}
        >
          {getWinningCardIcon()}
        </motion.div>
      )}
      
      {!battle && bothPicked && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-4 text-2xl font-bold text-white"
        >
          Ready for Battle!
        </motion.div>
      )}
    </motion.div>
  );
};

export default Battle;