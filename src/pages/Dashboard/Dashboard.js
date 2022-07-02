import React, { useEffect } from "react";
import logo from "../../assets/logo.png";
import "./Dashboard.css";
import { Navigate, NavLink, Route, Routes } from "react-router-dom";
import Assessment from "../../components/Assessment/Assessment";
import { assessments } from "../../data";

const Dashboard = () => {
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

        <button className="d-flex align-items-center py-2 px-4 text-white">
          <ion-icon name="add-outline"></ion-icon>
          <span>Create Assessment</span>
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
          </Routes>
        </div>
      </main>
    </section>
  );
};

export default Dashboard;
