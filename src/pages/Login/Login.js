import React, { useEffect, useState } from "react";
import "./Login.css";
import logo from "../../assets/logo.png";
import { useMutation, gql } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import OtpInput from "react-otp-input";
import { Toaster } from "../../utils/toaster";

const Login = () => {
  const navigate = useNavigate();
  const [phone, setPhone] = useState(null);
  const [otp, setOtp] = useState(null);

  const PHONE_MUTATIONS = gql`
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

  const EMAIL_MUTATIONS = gql`
    mutation verifyEmail($email: String!) {
      verifyEmail(email: $email) {
        id
        email
        email_verified
        number_verified
        approved
      }
    }
  `;

  const LOGIN_MUTATIONS_PHONE = gql`
    mutation loginTeacher($phone: String!, $otp: String!) {
      loginTeacher(phone: $phone, otp: $otp) {
        id
      }
    }
  `;

  const LOGIN_MUTATIONS_EMAIL = gql`
    mutation loginTeacher($email: String!, $otp: String!) {
      loginTeacher(email: $email, otp: $otp) {
        id
      }
    }
  `;

  const handleChange = (otp) => setOtp(otp);

  const [verifyPhone, { loading: _loading, error: _error, data: _data }] =
    useMutation(PHONE_MUTATIONS);

  const [verifyEmail, { loading: _loading3, error: _error3, data: _data3 }] =
    useMutation(EMAIL_MUTATIONS);

  const [loginPhone, { loading: _loading2, error: _error2, data: _data2 }] =
    useMutation(LOGIN_MUTATIONS_PHONE);

  const [loginEmail, { loading: _loading4, error: _error4, data: _data4 }] =
    useMutation(LOGIN_MUTATIONS_EMAIL);

  useEffect(() => {
    if (_data && _data.verifyPhone) {
      if (!_data.verifyPhone.id) {
        Toaster(3, "Invalid mobile numner");
        return;
      }
    }
  }, [_data]);

  useEffect(() => {
    if (_data3 && _data3.verifyEmail) {
      if (!_data3.verifyEmail.id) {
        Toaster(3, "Invalid email");
        return;
      }
    }
  }, [_data3]);

  useEffect(() => {
    if (_data2 && _data2.loginTeacher) {
      if (_data2.loginTeacher.id) {
        localStorage.setItem("teacher", _data2.loginTeacher.id);
        window.location = "/dashboard";
      } else {
        Toaster(3, "Invalid mobile numner");
        return;
      }
    }
  }, [_data2]);

  useEffect(() => {
    if (_data4 && _data4.loginTeacher) {
      if (_data4.loginTeacher.id) {
        localStorage.setItem("teacher", _data4.loginTeacher.id);
        window.location = "/dashboard";
      } else {
        Toaster(3, "Invalid email");
        return;
      }
    }
  }, [_data4]);

  useEffect(() => {
    const teacher = localStorage.getItem("teacher");
    if (teacher) {
      window.location = "/dashboard";
    }
  }, []);

  const handleSubmit = () => {
    if (!phone) {
      Toaster(3, "Phone or Email required to login");
      return;
    }

    const email = phone;

    if (phone.includes("@")) {
      verifyEmail({
        variables: {
          email,
        },
      });
    } else {
      verifyPhone({
        variables: {
          phone,
        },
      });
    }
  };

  const handleLogin = (otp) => {
    const email = phone;

    if (phone.includes("@")) {
      loginEmail({
        variables: {
          email,
          otp,
        },
      });
    } else {
      loginPhone({
        variables: {
          phone,
          otp,
        },
      });
    }
  };

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
          {_loading2 && (
            <div className="loader">
              <div class="spinner-border text-success" role="status">
                <span class="visually-hidden">Verifying OTP</span>
              </div>
              <p>Verifying OTP</p>
            </div>
          )}

          <div className="top">
            {(_data && _data.verifyPhone && _data.verifyPhone.id) ||
            (_data3 && _data3.verifyEmail && _data3.verifyEmail.id) ? (
              <>
                <h1 className="otp-title">← Verify the OTP to Login</h1>
                <p className="otp-msg">Enter the OTP you recieved</p>

                <OtpInput
                  value={otp}
                  onChange={handleChange}
                  numInputs={4}
                  separator={<span></span>}
                />

                <button className="btn-otp" onClick={() => handleLogin(otp)}>
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

                <button className="btn-otp" onClick={handleSubmit}>
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
