import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Register.css";

import { useQuery, useMutation, gql } from "@apollo/client";

const Register = () => {
  const [firstName, setFirstname] = useState(null);
  const [lastName, setLastname] = useState(null);
  const [email, setEmail] = useState(null);
  const [phone, setPhone] = useState(null);
  const [grade, setGrade] = useState(null);
  const [subject, setSubject] = useState(null);
  const [school, setSchool] = useState(null);

  const navigate = useNavigate();

  const QUERIES = gql`
    query {
      getGrades {
        grade_info
        id
      }

      getSubjects {
        id
        subject_info
      }

      getSchools {
        school_name
        id
      }
    }
  `;

  const MUTATIONS = gql`
    mutation CreateTeacher(
      $firstName: String!
      $lastName: String!
      $phone: String!
      $email: String!
    ) {
      createTeacher(
        first_name: $firstName
        last_name: $lastName
        phone: $phone
        email: $email
        subjectRef: ["6287323efe0b204eee241cc5"]
        gradeRef: ["62872b8b0023e0dcc9c5a703"]
        schoolRef: "62ab59edde044d104f10e5a9"
      ) {
        id
        first_name
        last_name
        phone
        email
        email_verified
        approved
        number_verified
      }
    }
  `;

  const options = [
    { name: "Swedish", value: "sv" },
    { name: "English", value: "en" },
    { name: "Videshi", value: "vi" },
  ];

  const { loading, error, data } = useQuery(QUERIES);
  const [createTeacher, { loading: _loading, error: _error, data: _data }] =
    useMutation(MUTATIONS);

  /*
		on submission, call the function createTeacher({variables: {firstName, lastName}})
	*/

  return (
    <section className="register__page min-vh-100 d-flex justify-content-center align-items-center">
      <div className="box mx-auto bg-white overflow-hidden d-flex flex-column">
        <div className="register__top w-100 d-flex justify-content-between">
          <div className="left">
            <h3 className="d-flex align-items-center gap-2">
              <ion-icon
                onClick={() => navigate(-1)}
                name="arrow-back-outline"
              ></ion-icon>{" "}
              <span>Register as a Teacher</span>
            </h3>
            <p>Fill the below information to register as a teacher</p>
          </div>

          <div className="right">
            <p className="text-dark">
              Already registered?
              <span onClick={() => navigate("/login")}> Login Now</span>
            </p>
          </div>
        </div>

        <div className="register__form flex-grow-1 d-flex flex-column justify-content-between mt-2 mb-5">
          <div className="input-group1 d-flex align-items-center gap-5">
            <div className="w-50 d-flex flex-column">
              <label htmlFor="firstName">First Name</label>
              <input
                type="text"
                onChange={(e) => setFirstname(e.target.value)}
              />
            </div>

            <div className="w-50 d-flex flex-column">
              <label htmlFor="lastName">Last Name</label>
              <input
                type="text"
                onChange={(e) => setLastname(e.target.value)}
              />
            </div>
          </div>

          <div className="input-group2 mb-4">
            <label htmlFor="school">School</label>
            <div className="d-flex align-items-center">
              <ion-icon name="search-outline"></ion-icon>
              <input list="schools" type="text" id="schools" />
            </div>
          </div>

          <div className="input-group3 d-flex align-items-center gap-5">
            <div className="grades w-50 d-flex flex-column">
              <label htmlFor="grades">Grades</label>

              {data && data.getGrades ? (
                <select onChange={(e) => setGrade(e.target.value)}>
                  <option value="">Select</option>
                  {data.getGrades.map((grade, index) => (
                    <option value={grade.id} key={index}>
                      {grade.grade_info}
                    </option>
                  ))}
                </select>
              ) : (
                <select>
                  <option value="">Select</option>
                </select>
              )}
            </div>

            <div className="grades w-50 d-flex flex-column">
              <label htmlFor="grades">Subjects</label>

              {data && data.getSubjects ? (
                <select onChange={(e) => setSubject(e.target.value)}>
                  <option value="">Select</option>
                  {data.getSubjects.map((subject, index) => (
                    <option value={subject.id} key={index}>
                      {subject.subject_info}
                    </option>
                  ))}
                </select>
              ) : (
                <select>
                  <option value="">Select</option>
                </select>
              )}
            </div>
          </div>

          <div className="input-group4 d-flex align-items-center gap-5">
            <div className="email w-100 d-flex flex-column">
              <label htmlFor="email">Email</label>
              <input onChange={(e) => setEmail(e.target.value)} type="text" />
            </div>
            <div className="number w-100 d-flex flex-column">
              <label htmlFor="number">Contact Number</label>
              <input type="number" onChange={(e) => setPhone(e.target.value)} />
            </div>
          </div>
        </div>

        <div className="register__bottom w-100 d-flex justify-content-between align-items-center">
          <p className="m-0">
            By submitting the form, you agree to Quest Terms and Conditions.
          </p>
          <button
            className="btn-otp"
            onClick={() =>
              createTeacher({
                variables: {
                  firstName,
                  lastName,
                  phone,
                  email,
                  grade,
                  subject,
                  school,
                },
              })
            }
          >
            Continue & Review
          </button>
        </div>
      </div>
    </section>
  );
};

export default Register;
