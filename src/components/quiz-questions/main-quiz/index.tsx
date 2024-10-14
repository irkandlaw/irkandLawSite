import React, { useState } from 'react';
import Quiz from '../Quiz'; // Предполагается, что Quiz — это компонент с опросом
import { FaQuestionCircle } from 'react-icons/fa'; // Используем иконку вопроса
import GiftBox from './gift-box';

const MainQuiz: React.FC = () => {
  const [showModalQuiz, setShowModalQuiz] = useState(false);
  const [minimized, setMinimized] = useState(false);

  

  const handleStartQuiz = () => {
    setMinimized(false);
    
    setShowModalQuiz(true);
  };

  const handleCloseModal = () => {
   
    setMinimized(true); // Сворачиваем в иконку
  };

  const handleQuizComplete = () => {
    setShowModalQuiz(false);
    setMinimized(true); // Иконка появляется снова после закрытия опроса
  };

  return (
    <div className='absolute z-20 '>
      {/* Иконка на экране, когда модалка свернута */}
      {minimized && (
        <div
          onClick={handleStartQuiz}
          className="fixed  bottom-20 right-5 cursor-pointer"
        >
          <FaQuestionCircle size={40} color="#FF00FF" />
        </div>
      )}

      {/* Модальное окно с опросом */}
    <GiftBox handleStartQuiz={handleStartQuiz} handleCloseModal={handleCloseModal}/>
      {/* Компонент с опросом */}
      {showModalQuiz && <Quiz setShowModalQuiz={setShowModalQuiz} onQuizComplete={handleQuizComplete} />}
    </div>
  );
};

export default MainQuiz;
