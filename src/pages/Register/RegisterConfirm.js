import React from 'react';
import successImage from '../../assets/success.png'

const RegisterConfirm = () => {
    return (
        <section className='register__page min-vh-100 d-flex justify-content-center align-items-center'>
            <div className="box confirm mx-auto bg-white overflow-hidden d-flex flex-column justify-content-center align-items-center">
                <img src={successImage} alt="" />
                <h1 className='mt-4'>Thank You</h1>
                <p>You have successfully submitted your information, and you will be notified via email/sms when your account is active.</p>
                <button className="btn-otp">
                    Got it
                </button>
            </div>
        </section>
    );
};

export default RegisterConfirm;