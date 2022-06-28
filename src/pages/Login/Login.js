import React from 'react';
import './Login.css';
import logo from '../../assets/logo.png'
import { useNavigate } from 'react-router-dom';

const Login = () => {

    const navigate = useNavigate();

    return (
        <section className='login__page min-vh-100 d-flex justify-content-center align-items-center'>
            <div className="box mx-auto bg-white overflow-hidden d-flex">
                <div className="login__left">
                    <div className="top d-flex align-items-center">
                        <img src={logo} alt="" />
                        <h1>Teachers Portal</h1>
                    </div>

                    <div className="bottom">
                        <h2>Lorem Ipsum is simply dummy text of the printing and typesetting industry. </h2>
                    </div>
                </div>

                <div className="login__right p-5 d-flex flex-column justify-content-between">
                    <div className="top">
                        <h1>Login</h1>
                        <p>Enter your email address or phone number to receive the OTP</p>

                        <div className="input-group my-4 d-flex flex-column">
                            <label htmlFor="emailNumber">Email / Mobile Number</label>
                            <input type="text" id="emailNumber" />
                        </div>

                        <button className='btn-otp'>Get OTP</button>
                    </div>

                    <div className="bottom">
                        <h4 className='fw-bold text-dark'>
                            New Here?
                            <span
                                onClick={() => navigate('/register')}
                            >
                                {" "}Register Now
                            </span>
                        </h4>

                        <span className='text-secondary'>By requesting OTP, you agree to Quest Terms and Conditions</span>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Login;