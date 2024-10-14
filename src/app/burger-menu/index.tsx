// BurgerMenu.tsx
import React, { useEffect, useRef, useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa'; // Импорт иконок из react-icons
import { FiPhone } from 'react-icons/fi';
import { LiaTelegram } from 'react-icons/lia';
import { IoLogoWhatsapp } from 'react-icons/io';
import textBurgerMenu from './burger-menu.json';
import { TfiEmail } from 'react-icons/tfi';

const BurgerMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [mouseInsideMenu, setMouseInsideMenu] = useState<boolean>(false);
  const menuRef = useRef<HTMLDivElement>(null); // Реф для отслеживания меню

  const toggleMenu = () => setIsOpen(!isOpen);

  useEffect(() => {
    if (!isOpen) return;

    const closeMenuAfterDelay = setTimeout(() => {
      if (!mouseInsideMenu) {
        setIsOpen(false);
      }
    }, 5000); // Закрытие через 5 секунд

    return () => clearTimeout(closeMenuAfterDelay);
  }, [isOpen, mouseInsideMenu]);

  const handleMouseEnter = () => setMouseInsideMenu(true);
  const handleMouseLeave = () => setMouseInsideMenu(false);

  return (
    <div>
      {/* Кнопка бургера */}
      <button
        onClick={toggleMenu}
        className="fixed z-50 top-4 right-4 p-3 text-gray-200 hover:text-gray-300 focus:outline-none"
      >
        {isOpen ? <FaTimes className="h-6 w-6" /> : <FaBars className="h-6 w-6" />}
      </button>

      {/* Меню */}
      {isOpen && (
          <div
          ref={menuRef}
          className="fixed top-0 right-0 w-64 bg-[url('/assets/images/grain.gif')] shadow-lg rounded-lg z-40 h-full p-4"
          onMouseEnter={handleMouseEnter} // Отслеживание, когда мышь входит в меню
          onMouseLeave={handleMouseLeave} // Отслеживание, когда мышь выходит из меню
        >
          <div className="flex flex-col items-center mt-4 space-y-4">
            <h2 className="mt-10 text-lg font-bold text-gray-100">{textBurgerMenu.BurgerMenu.title}</h2>
            <p className="text-sm text-gray-100">{textBurgerMenu.BurgerMenu.subtitle}</p>
            <div className="flex flex-col items-center space-y-4">
              <a
                href={`tel:${textBurgerMenu.BurgerMenu.phone}`}
                className="text-[#00FF00] transition-colors duration-300 hover:text-[#FF00FF] bg-gray-900 rounded-lg p-2 flex items-center space-x-2"
              >
                <FiPhone size={24} />
                <span >{textBurgerMenu.BurgerMenu.phone}</span> 
              </a>
              <a
                href={`https://t.me/$${textBurgerMenu.BurgerMenu.telegram_number}`}
                className="text-[#00FF00] transition-colors duration-300 hover:text-[#FF00FF] bg-gray-900 rounded-lg p-2  flex items-center space-x-2"
              >
                <LiaTelegram size={24} />
                <span >Telegram</span> 
              </a>
              <a
                href={`https://wa.me/${textBurgerMenu.BurgerMenu.whatsapp_number}`}
                className="text-[#00FF00] transition-colors duration-300 hover:text-[#FF00FF] bg-gray-900 rounded-lg p-2  flex items-center space-x-2"
              >
                <IoLogoWhatsapp size={24} />
                <span >WhatsApp</span> {/* Показать название WhatsApp */}
              </a>
              <a
                href={`mailto:${textBurgerMenu.BurgerMenu.email}`}
                className="text-[#00FF00] transition-colors duration-300 hover:text-[#FF00FF] bg-gray-900 rounded-lg p-2 flex items-center space-x-2"
              >
                <TfiEmail size={24} />
                <span>Email</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BurgerMenu;
