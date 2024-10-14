// pages/EditFaq.tsx
import React from "react";
import FaqEditor from "../../../components/faq/FaqEditor";
import { Link } from "react-router-dom";

const EditFaq: React.FC = () => {
  return (
  <>
   {/* Кнопка "На главную" */}
   <Link
          to="/"
          className=" fixed top-4 right-20 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
        >
          На главную
        </Link>
  <FaqEditor />
  </>
  );
};

export default EditFaq;