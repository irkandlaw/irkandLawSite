import React from 'react';

// Explicitly type the Layout component to accept children
const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex">
        {children}
      </div>
    
    </div>
  );
};

export default Layout;
