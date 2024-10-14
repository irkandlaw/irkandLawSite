// pages/EditRobotsTxt.tsx
import React from "react";
import EditRobotsTXT from "./EditRobotsTXT";
import { Link } from "react-router-dom";

const EditRobotsTxt: React.FC = () => {
  return (<>
  
  <EditRobotsTXT />
  <Link
          to="/"
          className="fixed top-4 right-20 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
        >
          На главную
        </Link>
  </>
  );
  
};

export default EditRobotsTxt;