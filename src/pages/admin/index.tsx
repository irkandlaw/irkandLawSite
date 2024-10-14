import React from 'react';
import FileUploadAny from '../../components/api-github/file-upload-any';
import QuizEditor from '../../components/quiz-questions/QuizEditor';
import FaqEditor from '../../components/faq/FaqEditor';

const Admin: React.FC = () => {
  return (
    <div className="">
      <h1 className="text-4xl font-bold text-gray-800">Admin</h1>
    
      <FileUploadAny />
      <QuizEditor />
      <FaqEditor />
    </div>
  );
};

export default Admin;
