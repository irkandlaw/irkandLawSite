// utils/sendToTelegramCallToAction.ts
import axios from 'axios';
import appConfig from '../../../app/app-config.json';

interface UserData {
  name: string;
  phone: string;
  email: string;
  message: string;
}

const sendToTelegramCallToAction = async (userData: UserData) => {
  const { name, phone, email, message } = userData;

  const messageToSend = `
    Новый запрос на связь:
    Имя: ${name}
    Телефон: ${phone}
    Email: ${email}
    Сообщение: ${message}
  `;

  const url = `https://api.telegram.org/bot${appConfig.TOKEN_TELEGRAM}/sendMessage`;

  try {
    await axios.post(url, {
      chat_id: appConfig.CHAT_ID_TELEGRAM,
      text: messageToSend,
      parse_mode: 'HTML',
    });
  } catch (error) {
    console.error('Ошибка при отправке данных в Telegram:', error);
  }
};

export default sendToTelegramCallToAction;
