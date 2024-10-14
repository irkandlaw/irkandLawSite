import { FiPhone } from "react-icons/fi";
import { IoLogoWhatsapp } from "react-icons/io";
import { LiaTelegram } from "react-icons/lia";

const Footer = () => {
  const currentYear = new Date().getFullYear(); // Автоматически получает текущий год

  return (
    <div className="z-50 bg-black">
      <div className="px-4 pt-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8">
        <div className="flex flex-col justify-between pt-5 pb-10 border-t border-gray-800 sm:flex-row">
          <p className="text-sm text-[#FF00FF]"> {/* Неоново-розовый текст */}
            ©  {currentYear} Юридические услуги
            <br></br>
            <span className="text-white">Рег. номер: 38/1793</span>

          </p>
          <div className="z-50 flex items-center mt-4 space-x-4 sm:mt-0">
            <a
              href="tel:+79526166489" // Ссылка на телефон
              className="text-[#00FF00] transition-colors duration-300 hover:text-[#FF00FF]" // Неоново-зеленый, при наведении розовый
            >
              <FiPhone size={20} />
            </a>
            <a
              href="https://t.me/+79526166489" // Ссылка на Telegram
              className="text-[#00FF00] transition-colors duration-300 hover:text-[#FF00FF]"
            >
              <LiaTelegram size={20} />
            </a>
            <a
              href="https://wa.me/79526166489" // Ссылка на WhatsApp
              className="text-[#00FF00] transition-colors duration-300 hover:text-[#FF00FF]"
            >
              <IoLogoWhatsapp size={20} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
