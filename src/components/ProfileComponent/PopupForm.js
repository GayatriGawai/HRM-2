import React, { useState } from 'react';
import AddEducation from './AddEducation';
import AddExperience from './AddExperience';

const PopupForm = ({ isOpen, onClose, formType, onSubmit }) => {
    const [showPopup, setShowPopup] = useState(isOpen);
    const [formData, setFormData] = useState({});

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
        setFormData({});
        onClose();
    };

    const handleClose = () => {
        setShowPopup(false);
        onClose();
    };

    const renderForm = () => {
        switch (formType) {
            case 'education':
                return (
                    <AddEducation
                        formData={formData}
                        onChange={handleChange}
                        onSubmit={handleSubmit}
                    />
                );
            case 'experience':
                return (
                    <AddExperience
                        formData={formData}
                        onChange={handleChange}
                        onSubmit={handleSubmit}
                    />
                );
            default:
                return null;
        }
    };

    return (
        <>
            {showPopup && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
                    <div className="bg-white p-8 w-96 rounded-lg shadow-lg">
                        <button
                            onClick={handleClose}
                            className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
                        >
                            X
                        </button>
                        {renderForm()}
                    </div>
                </div>
            )}
        </>
    );
};

export default PopupForm;
