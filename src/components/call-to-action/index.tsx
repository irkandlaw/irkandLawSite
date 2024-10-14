// components/ContactIcon.tsx
import React, { useState } from 'react';
import { FaPhone } from 'react-icons/fa';
import CalToActionForm from './form-call-to-action';

const CallToActionIcon: React.FC = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsFormOpen((prev) => !prev)}
        className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-500 text-white shadow-lg hover:bg-blue-600 transition-colors"
      >
        <FaPhone size={24} />
      </button>

      {isFormOpen && (
        <div className="absolute top-14 right-0">
          <CalToActionForm onClose={() => setIsFormOpen(false)} />
        </div>
      )}
    </div>
  );
};

export default CallToActionIcon;
