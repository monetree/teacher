import React, { useState } from "react";
import "./Login.css";
import logo from "../../assets/logo.png";
import { useMutation, gql } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import OtpInput from "react-otp-input";

const Login = () => {
  const navigate = useNavigate();
  const [phone, setPhone] = useState(null);
  const [otp, setOtp] = useState(null);

  const MUTATIONS = gql`
    mutation verifyPhone($phone: String!) {
      verifyPhone(phone: $phone) {
        id
        phone
        email_verified
        number_verified
        approved
      }
    }
  `;

  const LOGIN_MUTATIONS = gql`
    mutation verifyPhone($phone: String!, $otp: String!) {
      verifyPhone(phone: $phone, otp: $otp) {
        id
        phone
        email_verified
        number_verified
        approved
      }
    }
  `;

  const handleChange = (otp) => setOtp(otp);

  const [verifyPhone, { loading: _loading, error: _error, data: _data }] =
    useMutation(MUTATIONS);

  const [login, { loading: _loading2, error: _error2, data: _data2 }] =
    useMutation(LOGIN_MUTATIONS);

  if (_data2 && _data2.verifyPhone && _data2.verifyPhone.id) {
    window.location = "/dashboard";
  }

  return (
    <section className="login__page min-vh-100 d-flex justify-content-center align-items-center">
      <div className="box mx-auto bg-white overflow-hidden d-flex">
        <div className="login__left">
          <div className="top d-flex align-items-center">
            <img src={logo} alt="" />
            <h1>Teachers Portal</h1>
          </div>

          <div className="bottom">
            <h2>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry.
            </h2>
          </div>
        </div>

        <div className="login__right p-5 d-flex flex-column justify-content-between">
          <div className="top">
            {_data && _data.verifyPhone && _data.verifyPhone.id ? (
              <>
                <h1 className="otp-title">← Verify the OTP to Login</h1>
                <p className="otp-msg">Enter the OTP you recieved</p>

                <OtpInput
                  value={otp}
                  onChange={handleChange}
                  numInputs={4}
                  separator={<span></span>}
                />

                <button
                  className="btn-otp"
                  onClick={() =>
                    login({
                      variables: {
                        phone,
                        otp,
                      },
                    })
                  }
                >
                  Verify & Continue
                </button>
              </>
            ) : (
              <>
                <h1>Login</h1>
                <p>
                  Enter your email address or phone number to receive the OTP
                </p>
                <div className="input-group my-4 d-flex flex-column">
                  <label htmlFor="emailNumber">Email / Mobile Number</label>
                  <input
                    type="text"
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>

                <button
                  className="btn-otp"
                  onClick={() =>
                    verifyPhone({
                      variables: {
                        phone,
                      },
                    })
                  }
                >
                  Get OTP
                </button>
              </>
            )}
          </div>

          <div className="bottom">
            <h4 className="fw-bold text-dark">
              New Here?
              <span onClick={() => navigate("/register")}> Register Now</span>
            </h4>

            <span className="text-secondary">
              By requesting OTP, you agree to Quest Terms and Conditions
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
