import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import { AiOutlineClose } from "react-icons/ai"; // импорт иконок бургер-меню

const AdminMenu: React.FC = () => {
  const { user, logout } = useAuth();
 
  const [isExpanded, setIsExpanded] = useState<boolean>(true); // состояние для управления расширением меню



  const toggleMenu = () => {
    setIsExpanded(!isExpanded); // переключение состояния развернутости меню
  };

  return (
    <div className="flex">
      {/* Кнопка бургер-меню */}
      <button
        onClick={toggleMenu}
        className="fixed z-50 top-4 left-4 bg-gray-700 hover:bg-gray-800 text-white p-3 rounded-lg focus:outline-none"
      >
        {isExpanded ? <AiOutlineClose size={24} /> : "Меню администратора" }
      </button>

      {/* Меню */}
      <div
        className={`fixed z-30 top-0 left-0 h-screen bg-gray-900 text-white flex flex-col transition-all duration-300 ease-in-out ${
          isExpanded ? 'w-64' : 'w-0'
        }`}
      >
        {/* Видимость элементов меню при развернутом состоянии */}
        {isExpanded && (
          <>
            <div className="mt-16 p-2  border-b border-gray-700 flex items-center justify-between">
              <h2 className="text-xl font-bold">Панель администратора</h2>
              <button
                onClick={logout}
                className="bg-red-600 hover:bg-red-700 text-white py-1 px-2 rounded-lg"
              >
                Выйти
              </button>
            </div>

            <nav className="mt-4 flex-grow">
              <ul className="space-y-2">
                {[
                  { to: "/admin/edit-burger-menu", label: "Редактировать БургерМеню" },
                  { to: "/admin/site-settings", label: "Настройки сайта" },
                  { to: "/admin/add-yandex-metrica", label: "Добавить ЯндексМетрику" },
                  { to: "/admin/edit-robots-txt", label: "Изменить файл robots.txt" },
                  { to: "/admin/edit-quiz", label: "Редактировать QUIZ" },
                  { to: "/admin/edit-faq", label: "Редактировать FAQ" },
                  { to: "/admin/edit-main-image", label: "Редактировать Главное Изображение" }
                ].map((item) => (
                  <li key={item.to}>
                    <Link
                      to={item.to}
                      className="flex items-center px-4 py-2 hover:bg-gray-700 rounded-lg transition-colors"
                    >
                      <span>{item.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <footer className="p-4 border-t border-gray-700">
              <p className="text-sm">Вы вошли как: {user?.email}</p>
            </footer>
          </>
        )}
      </div>
    </div>
  );
};

export default AdminMenu;
