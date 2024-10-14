import React, { useState } from 'react';
import sendToTelegramCallToAction from '../utils/sendToTelegramCallToAction';
import ModalCallToAction from '../modal-call-to-action';
import InputMask from 'react-input-mask'; // Импортируем InputMask
import { IoClose } from 'react-icons/io5'; // Импортируем иконку крестика

interface UserData {
  name: string;
  phone: string;
  email: string;
  message: string; // Поле для сообщения
}

interface ContactFormProps {
  onClose: () => void;
}

const CalToActionForm: React.FC<ContactFormProps> = ({ onClose }) => {
  const [userData, setUserData] = useState<UserData>({
    name: '',
    phone: '',
    email: '',
    message: '', // Инициализируем новое поле
  });

  const [modalOpen, setModalOpen] = useState(false); // Состояние для модального окна
  const [modalMessage, setModalMessage] = useState(''); // Сообщение для модального окна

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await sendToTelegramCallToAction(userData);

      // Установите сообщение для модального окна
      setModalMessage('Ваше сообщение успешно отправлено!');
      setModalOpen(true); // Открываем модальное окно

      // Очистка формы после отправки
      setUserData({ name: '', phone: '', email: '', message: '' });
      onClose(); // Закрываем форму после отправки
    } catch (error) {
      setModalMessage('Ошибка при отправке сообщения. Попробуйте еще раз.');
      setModalOpen(true); // Открываем модальное окно при ошибке
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md w-80 relative">
      <button
        onClick={onClose}
        className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
      >
        <IoClose size={24} /> {/* Иконка крестика */}
      </button>
      <h2 className="text-lg font-bold mb-2">Связаться с нами</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={userData.name}
          placeholder="Ваше имя"
          onChange={handleInputChange}
          className="block w-full p-2 mb-2 border rounded"
          required
        />
        <InputMask
          mask="+7 (999) 999-99-99" // Указываем маску для телефона
          name="phone"
          value={userData.phone}
          placeholder="Ваш телефон"
          onChange={handleInputChange}
          className="block w-full p-2 mb-2 border rounded"
          required
        />
        <input
          type="email"
          name="email"
          value={userData.email}
          placeholder="Ваш email"
          onChange={handleInputChange}
          className="block w-full p-2 mb-2 border rounded"
          required
        />
        <textarea
          name="message"
          value={userData.message}
          placeholder="Ваше сообщение"
          onChange={handleInputChange}
          className="block w-full p-2 mb-2 border rounded"
          required
          rows={4}
        />
        <button
          type="submit"
          className="mt-2 w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Отправить
        </button>
      </form>
      
      {/* Модальное окно для подтверждения */}
      <ModalCallToAction
        open={modalOpen}
        onClose={() => setModalOpen(false)} // Закрыть модальное окно
        message={modalMessage}
      />
    </div>
  );
};

export default CalToActionForm;
