import React from "react";
import { Link } from "react-router-dom";
import BurgerMenuEditor from "../../../app/burger-menu/BurgerMenuEditor";

const EditBurgerMenu: React.FC = () => {
  return (
    <>
      <div className="mt-12 relative">
      
        
        {/* Кнопка "На главную" */}
        <Link
          to="/"
          className=" fixed top-4 right-20 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
        >
          На главную
        </Link>

        {/* Компонент редактора */}
        <BurgerMenuEditor />
      </div>
    </>
  );
};

export default EditBurgerMenu;
