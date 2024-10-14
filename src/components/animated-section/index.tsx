import React from 'react';
import { motion } from 'framer-motion';

const FadeInOutHighlightCenter: React.FC = () => {
  return (
    <motion.div
      initial={{ 
        opacity: 0.3, 
        scale: 0.95
      }}
      animate={{ 
        opacity: [0.3, 1, 0.3], // Переход: от полупрозрачного к видимому и обратно к полупрозрачному
        scale: [0.95, 1.05, 0.95], // Переход масштабирования: уменьшение и увеличение
      }}
      transition={{ 
        duration: 3, // Длительность полного цикла анимации
        repeat: Infinity, // Цикличность анимации
        repeatType: "loop", // Тип повторения
        ease: "easeInOut" // Плавное изменение
      }}
      className="w-full h-screen flex items-center justify-center"
    >
      {/* Контент, который будет анимироваться */}
      <motion.h2
        initial={{ textShadow: "0px 0px 0px rgba(255, 255, 255, 0.5)" }} // Начальная тень
        animate={{ 
          textShadow: [
            "0px 0px 0px rgba(255, 255, 255, 0.5)", // Без тени
            "0px 0px 15px rgba(255, 255, 255, 0.8)", // Подсветка
            "0px 0px 0px rgba(255, 255, 255, 0.5)"  // Без тени
          ]
        }}
        transition={{ 
          duration: 3, // Длительность полного цикла анимации
          repeat: Infinity, // Цикличность анимации
          repeatType: "loop", // Тип повторения
          ease: "easeInOut" // Плавное изменение
        }}
        className="text-white text-4xl"
      >
        Право и защита
      </motion.h2>
    </motion.div>
  );
};

export default FadeInOutHighlightCenter;
