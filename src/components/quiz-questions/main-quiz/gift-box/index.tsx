import { useEffect, useState } from 'react';
import { FaWindowClose } from 'react-icons/fa';
import FadeInWrapper from '../../../fade-In-wrapper';

interface GiftBoxProps {
  handleStartQuiz: () => void;
  handleCloseModal: () => void;
}

const GiftBox = ({ handleStartQuiz, handleCloseModal }: GiftBoxProps) => {
  const [showModal, setShowModal] = useState(false);
  const [showModalDesktop, setShowModalDesktop] = useState(false);
  const [showModalMobile, setShowModalMobile] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 640);




  const handleCloseModalWindow = () => {
    handleCloseModal();
    setShowModal(false);
    setShowModalDesktop(false);
    setShowModalMobile(false);

  };

  const handleStartQuizWindow = () => {
    handleStartQuiz();
    setShowModal(false);
  };

  const handleToggleModal = () => {
    setShowModal(!showModal);
    
  };

  // Автоматическое появление через 10 секунд
  useEffect(() => {
    const timer = setTimeout(() => {
        setShowModalDesktop(true);
        setShowModalMobile(true);
    }, 10000); // 10000 миллисекунд = 10 секунд

    return () => clearTimeout(timer);
  }, []);


  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 640);
    };

    window.addEventListener('resize', handleResize);

    // Очистка слушателя при размонтировании компонента
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    
      <div className="fixed  top-[180px] right-10 z-20">
        {/* Иконка для мобильных устройств */}
       {showModalMobile && <FadeInWrapper>
        <div className="md:hidden">
          <button onClick={handleToggleModal} className="text-3xl">
            🎁
          </button>
        </div>
        
        </FadeInWrapper>}

        {/* Полный модальный блок для десктопа и мобильных устройств */}
        {showModal && isMobile && (<FadeInWrapper>
           
          <div className="fixed  top-[70px] right-10 w-60 p-5 ">
            <div className="relative cursor-pointer">
              <span className="absolute top-0 left-0 w-full h-full mt-1 ml-1 bg-[#00FF00] rounded-lg dark:bg-gray-200"></span>
              <div className="relative p-6 bg-white dark:bg-gray-800 border-2 border-[#00FF00] dark:border-gray-300 rounded-lg hover:scale-105 transition duration-500">
                <div className="flex items-center">
                  <span className="text-xl">🎁</span>
                  <h3 className="my-2 ml-3 text-lg font-bold text-gray-800 ">Заявка</h3>
                </div>

                {/* Кнопка закрытия */}
                <button
                  className="absolute  top-2 right-2 p-1 bg-red-500 rounded-full hover:bg-red-600"
                  onClick={handleCloseModalWindow}
                >
                  <FaWindowClose />
                </button>

                <p className="mt-5 text-gray-800">Заполните вопросы, чтобы помочь нам лучше понять вашу ситуацию.</p>
                <div>
                  <button
                    onClick={handleStartQuizWindow}
                    className="mt-2 p-2 bg-indigo-500 text-white rounded-lg hover:bg-green-600"
                  >
                    Отправить
                  </button>
                </div>
              </div>
            </div>
          </div>
       </FadeInWrapper> )}

        {/* Обычный режим для десктопа */}
        <div className={!showModalDesktop ? 'hidden':'hidden md:block'}>
        <FadeInWrapper>
          <div
            className={` fixed top-10 right-10 w-60 p-5 `}
          >
            <div
              className="relative top-[70px] cursor-pointer "
              onClick={handleToggleModal} // Открытие модального окна при клике на блок
            >
              <span className="absolute top-0 left-0 w-full h-full mt-1 ml-1 bg-[#00FF00] rounded-lg dark:bg-gray-200"></span>
              <div className="relative p-6 bg-white dark:bg-gray-800 border-2 border-[#00FF00] dark:border-gray-300 rounded-lg hover:scale-105 transition duration-500">
                <div className="flex items-center">
                  <span className="text-xl">🎁</span>
                  <h3 className="my-2 ml-3 text-lg font-bold text-gray-800" >Заявка</h3>
                </div>
                <p className="mt-5 text-gray-800">Заполните вопросы, чтобы помочь нам лучше понять вашу ситуацию.</p>
                <div>
                  <button
                    onClick={handleStartQuizWindow}
                    className="mt-2 p-2 bg-indigo-500 text-white rounded-lg hover:bg-green-600"
                  >
                    Отправить
                  </button>
                </div>

                {/* Кнопка закрытия */}
                <button
                  className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                  onClick={handleCloseModalWindow}
                >
                  <FaWindowClose />
                </button>
              </div>
            </div>
          </div>
          </FadeInWrapper>
        </div>
      </div>
    
  );
};

export default GiftBox;
