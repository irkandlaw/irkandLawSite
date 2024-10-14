import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Импортируем useNavigate
import CalToActionForm from "../../components/call-to-action/form-call-to-action";

const CallToActionPage: React.FC = () => {
    const [isFormOpen, setIsFormOpen] = useState(true);
    const navigate = useNavigate(); // Инициализируем navigate

    const handleClose = () => {
        setIsFormOpen(false);
        navigate('/'); // Замените '/desired-route' на нужный путь
    };

    return (
        <div className="flex items-center justify-center min-h-screen relative">
            {isFormOpen && (
                <div className="w-full max-w-md">
                    <CalToActionForm onClose={handleClose} />
                </div>
            )}
        </div>
    );
}

export default CallToActionPage;
