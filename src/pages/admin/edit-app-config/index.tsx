import React from "react";
import EditAppConfig from "../../../app/EditAppConfig";
import { Link } from "react-router-dom";

const EditAppConfigPage: React.FC = () => {
  return (
  <div className="mt-12 p-6 bg-white rounded-lg shadow-md">
  <h1>Настройки сайта</h1>
  <EditAppConfig />

   {/* Кнопка "На главную" */}
   <Link
          to="/"
          className="fixed top-4 right-20 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
        >
          На главную
        </Link>
  </div>
  );
};

export default EditAppConfigPage;