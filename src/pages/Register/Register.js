import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Register.css";

import { useQuery, useMutation, gql } from "@apollo/client";

const Register = () => {
  // form value's state

  const [firstName, setFirstname] = useState(null);
  const [lastName, setLastname] = useState(null);
  const [email, setEmail] = useState(null);
  const [phone, setPhone] = useState(null);
  const [grade, setGrade] = useState(null);
  const [subject, setSubject] = useState(null);
  const [school, setSchool] = useState(null);

  // search school states and refs
  const schoolRef = React.useRef();
  const [showSchools, setShowSchools] = useState(false);
  const [searchSchool, setSearchSchool] = useState([]);

  // dropdown
  const [selectedGrade, setSelectedGrade] = useState([]);
  const [gradeDropdown, setGradeDropdown] = useState(false);

  const [selectedSubject, setSelectedSubject] = useState([]);
  const [subjectDropdown, setSubjectDropdown] = useState(false);

  // navigator
  const navigate = useNavigate();

  const handleGradeCheck = (event) => {
    if (event.target.checked) {
      const newSelectedGrade = selectedGrade.concat(event.target.value);
      setSelectedGrade(newSelectedGrade);
    } else {
      const newSelectedGrade = selectedGrade.filter(
        (item) => item !== event.target.value
      );
      setSelectedGrade(newSelectedGrade);
    }
  };

  const handleSubjectCheck = (event) => {
    if (event.target.checked) {
      const newSelectedSubject = selectedSubject.concat(event.target.value);
      setSelectedSubject(newSelectedSubject);
    } else {
      const newSelectedSubject = selectedSubject.filter(
        (item) => item !== event.target.value
      );
      setSelectedSubject(newSelectedSubject);
    }
  };

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

  // search school by name
  const handleSchoolSearch = () => {
    const search = schoolRef.current.value;

    if (search !== "") {
      const filtered = data.getSchools.filter((item) =>
        item.school_name.toLowerCase().includes(search.toLowerCase())
      );

      setSearchSchool(filtered);
      setShowSchools(true);
      console.log(data.getSchools);
    } else {
      setSearchSchool([]);
    }
  };

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
              <input
                ref={schoolRef}
                onChange={handleSchoolSearch}
                list="schools"
                type="text"
                id="schools"
              />
              {showSchools && searchSchool.length > 0 && (
                <div className="school-list">
                  <ul>
                    {data.getSchools.map((item) => (
                      <li
                        key={item.id}
                        onClick={() => {
                          schoolRef.current.value = item.school_name;
                          setShowSchools(false);
                        }}
                      >
                        {item.school_name}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          <div className="input-group3 d-flex align-items-center gap-5">
            <div className="grades w-50 d-flex flex-column">
              <label htmlFor="grades">Grades</label>

              <div className="grade-dropdown">
                <div
                  className="selected d-flex justify-content-between align-items-center"
                  onClick={() => setGradeDropdown(!gradeDropdown)}
                >
                  <span
                    title={
                      selectedGrade.length > 0
                        ? selectedGrade.length > 3
                          ? selectedGrade.join(", ")
                          : ""
                        : ""
                    }
                  >
                    {selectedGrade.length > 0
                      ? selectedGrade.length > 3
                        ? selectedGrade.slice(0, 3).join(", ") +
                        `, +${selectedGrade.length - 3} more`
                        : selectedGrade.join(", ")
                      : "Select"}
                  </span>
                  <ion-icon name="chevron-down-outline"></ion-icon>
                </div>
                <ul
                  className={gradeDropdown ? "grade-items show" : "grade-items"}
                >
                  {data && data.getGrades ? (
                    data.getGrades.map((grade, index) => (
                      <li key={index} className="grade-item">
                        <input
                          type="checkbox"
                          id={`gradeID${grade.id}`}
                          value={grade.grade_info}
                          onChange={handleGradeCheck}
                        />
                        <label htmlFor={`gradeID${grade.id}`}>
                          {grade.grade_info}
                        </label>
                      </li>
                    ))
                  ) : (
                    <li>Select</li>
                  )}
                </ul>
              </div>
            </div>

            <div className="grades w-50 d-flex flex-column">
              <label htmlFor="grades">Subjects</label>

              <div className="subject-dropdown">
                <div
                  className="selected d-flex justify-content-between align-items-center"
                  onClick={() => setSubjectDropdown(!subjectDropdown)}
                >
                  <span
                    title={
                      selectedSubject.length > 0
                        ? selectedSubject.length > 3
                          ? selectedSubject.join(", ")
                          : ""
                        : ""
                    }
                  >
                    {selectedSubject.length > 0
                      ? selectedSubject.length > 3
                        ? selectedSubject.slice(0, 3).join(", ") +
                        `, +${selectedSubject.length - 3} more`
                        : selectedSubject.join(", ")
                      : "Select"}
                  </span>
                  <ion-icon name="chevron-down-outline"></ion-icon>
                </div>

                <ul
                  className={
                    subjectDropdown ? "subject-items show" : "subject-items"
                  }
                >
                  {data && data.getSubjects ? (
                    data.getSubjects.map((subject, index) => (
                      <li key={index} className="subject-item">
                        <input
                          type="checkbox"
                          id={`subjectID${subject.id}`}
                          value={subject.subject_info}
                          onChange={handleSubjectCheck}
                        />
                        <label htmlFor={`subjectID${subject.id}`}>
                          {subject.subject_info}
                        </label>
                      </li>
                    ))
                  ) : (
                    <li>Select</li>
                  )}
                </ul>
              </div>
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
