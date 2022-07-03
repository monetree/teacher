import React from 'react';
import { useNavigate } from 'react-router-dom';
import successImage from '../../../../assets/success.png'

const Step5 = ({ goto }) => {

    const navigate = useNavigate();

    const navigateDashboard = () => {
        navigate('/dashboard');
    }

    return (
        <div className='question_step5 d-flex flex-column align-items-center justify-content-center py-5'>
            <img src={successImage} alt="" />
            <h1>Thank You</h1>
            <p>You have successfully added a multiple choice question to question bank.</p>
            <div className="done-actions">
                <button onClick={navigateDashboard}>Dashboard</button>
                <button onClick={() => goto(0)}>Create a Question</button>
            </div>
        </div>
    );
};

export default Step5;