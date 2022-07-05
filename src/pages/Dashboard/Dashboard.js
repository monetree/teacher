import React, { useEffect } from "react";
import logo from "../../assets/logo.png";
import questionIcon from '../../assets/question.png';
import assessmentIcon from '../../assets/assessment.png';
import "./Dashboard.css";
import { Navigate, NavLink, Route, Routes, useNavigate } from "react-router-dom";
import Assessment from "../../components/Assessment/Assessment";
import { assessments } from "../../data";
import CreateQuestion from "./CreateQuestion/CreateQuestion";
import { QuestionProvider } from "../../context/QuestionContext";

const Dashboard = () => {

  const navigate = useNavigate();

  const searchRef = React.useRef();
  const [searched, setSearched] = React.useState([]);

  // search assessment by name

  const handleSearch = () => {
    const search = searchRef.current.value;

    if (search !== "") {
      const filtered = assessments.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
      setSearched(filtered);
      console.log(filtered);
    } else {
      setSearched([]);
    }
  };

  useEffect(() => {
    const teacher = localStorage.getItem("teacher");
    if (!teacher) {
      window.location = "/";
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("teacher");
    window.location = "/";
  };


  // close modal or open modal

  const [modal, setModal] = React.useState(false);
  const toggleModal = () => setModal(!modal);

  // navigate to create question or assessment page

  const handleCreateNavigate = (path) => {
    navigate(path);
    toggleModal();
  }

  return (
    <section className="dashboard__page">
      <div className="topbar py-3 px-5 d-flex align-items-center gap-5">
        <div className="logo d-flex align-items-center">
          <img src={logo} alt="" />
          <h2 className="m-0 ms-3 text-white">Teachers Portal</h2>
        </div>

        <div className="search flex-grow-1 d-flex align-items-center">
          <input
            ref={searchRef}
            onChange={handleSearch}
            type="text"
            placeholder="Search assessment or Student"
            className="w-100"
          />
          <ion-icon name="search-outline"></ion-icon>

          {searched.length > 0 && (
            <div className="search__result">
              <ul>
                {searched.map((item) => (
                  <li
                    key={item.id}
                    className="searched__item"
                    onClick={() => {
                      searchRef.current.value = item.name;
                      setSearched([]);
                    }}
                  >
                    <div className="info">
                      <h6 className="m-0">{item.name}</h6>
                      <div>
                        <span>{item.subject}</span> | <span>{item.grade}</span>
                      </div>
                    </div>
                    <div className="search_status">
                      <span>{item.status}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <button onClick={toggleModal} className="d-flex align-items-center py-2 px-5 text-white">
          <ion-icon name="add-outline"></ion-icon>
          <span>Create</span>
        </button>

        <div className="user d-flex align-items-center gap-5">
          <ion-icon name="notifications-outline"></ion-icon>
          <ion-icon name="person-outline"></ion-icon>
        </div>
      </div>

      <main className="dashboard w-100 d-flex">
        <aside className="sidebar">
          <ul>
            <li>
              <NavLink
                className={({ isActive }) => (isActive ? "active" : "")}
                to="/dashboard/assessments"
              >
                All Assessments
              </NavLink>
            </li>
            <li>
              <NavLink
                className={({ isActive }) => (isActive ? "active" : "")}
                to="/dashboard/profile"
              >
                Profile
              </NavLink>
            </li>
            <li onClick={logout}>
              <button>Logout</button>
            </li>
          </ul>
        </aside>

        <div className="content w-100 py-4 px-5">
          <Routes>
            <Route index element={<Navigate to={"assessments"} />} />
            <Route path="assessments" element={<Assessment />} />
            <Route path="profile" element={<h1>Profile Page</h1>} />
            <Route
              path="create/question"
              element={<QuestionProvider><CreateQuestion /></QuestionProvider>}
            />
          </Routes>
        </div>
        <div className={modal ? "create__modal show" : "create__modal"}>
          <div className="create__modal__content">
            <button onClick={toggleModal} className="modal-close">
              <ion-icon name="close-outline"></ion-icon>
            </button>

            <h3 className="m-0 mb-2">Create Question or Assessment</h3>
            <p>Please choose the option</p>

            <div className="create__modal__options">
              <button onClick={() => handleCreateNavigate('create/question')}>
                <img src={questionIcon} alt="" />
                <h5>Question</h5>
                <p>Create multiple choice question</p>
              </button>

              <button onClick={() => handleCreateNavigate('create/assessment')}>
                <img src={assessmentIcon} alt="" />
                <h5>Assessment</h5>
                <p>Create a question collection </p>
              </button>
            </div>
          </div>
        </div>
      </main>
    </section>
  );
};

export default Dashboard;
