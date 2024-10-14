import React from 'react';
import CardBackground from './images/grain.gif'; 

interface CardProps {
  title: string;
  description: string;
}

const Card: React.FC<CardProps> = ({ title, description }) => {
  return (
    <div className="relative w-72 h-96">
      <div
        className="flex flex-col justify-between rounded-lg border border-platinum bg-cover bg-center shadow-lg p-4"
        style={{ backgroundImage: `url(${CardBackground})` }} 
      >
        <div>
          <h5 className="text-xl font-semibold mb-2 text-platinum">
            {title}
          </h5>
          <p className="text-sm text-platinum line-clamp-4"> 
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Card;
