import React, { useEffect, useState } from "react";
import "./Assessment.css";
import { useQuery, gql } from "@apollo/client";
import PieChart from "../charts/pieChart";
import DatatablePage from "../charts/dataTable";
import Avatar from "../../assets/image 10.png";
import QuestionsPage from "../charts/questionsTable";

const Assessment = ({ assessmentId, setAssessmentId, tab, setTab }) => {
  const QUERIES = gql`
    query {
      getStudents(assessment_id: "985241") {
        id
        name
        email
        number
        completed
        coin
      }
    }
  `;

  const ASSESSMENT_QUERIES = gql`
    query getAssessments($teacherRef: String!) {
      getAssessments(teacherRef: $teacherRef) {
        id
        subject
        name
        grade
        published
        assessment_name
        createdAt
      }
    }
  `;

  const { loading, error, data } = useQuery(ASSESSMENT_QUERIES, {
    variables: {
      teacherRef: localStorage.getItem("teacher"),
    },
  });

  const [assessmentIdQuestion, setAssessmentIdQuestion] = useState(null);

  useEffect(() => {
    if (assessmentId) {
      setTab(2);
    }
  }, [assessmentId]);

  useEffect(() => {
    if (assessmentIdQuestion) {
      setTab(3);
    }
  }, [assessmentIdQuestion]);

  return (
    <div>
      {tab === 1 ? (
        <h2 className="mb-4">All Assessments</h2>
      ) : tab === 2 ? (
        <h5 className="mb-4" style={{ color: "rgba(25, 25, 25, 0.8)" }}>
          All Assessments &#62; {assessmentId.assessment_name}
        </h5>
      ) : (
        <h5 className="mb-4" style={{ color: "rgba(25, 25, 25, 0.8)" }}>
          All Assessments &#62; {assessmentId.assessment_name} &#62;{" "}
          {assessmentIdQuestion.name}
        </h5>
      )}

      {tab === 1 ? (
        <table className="dataTable">
          <colgroup>
            <col style={{ width: "40%" }} />
            <col style={{ width: "25%" }} />
            <col style={{ width: "15%" }} />
            <col style={{ width: "20%" }} />
          </colgroup>

          <thead>
            <tr>
              <th scope="col">Assessment</th>
              <th scope="col">Subject</th>
              <th scope="col">Grade</th>
              <th scope="col">Status</th>
            </tr>
          </thead>
          {data && data.getAssessments ? (
            <tbody>
              {data.getAssessments.map((item) => {
                return (
                  <tr key={item.id} onClick={() => setAssessmentId(item)}>
                    <td>{item.assessment_name}</td>
                    <td>{item.subject}</td>
                    <td>{item.grade}</td>
                    <td className="status">
                      <button
                        className={
                          item.published ? "btn btn-success" : "btn btn-warning"
                        }
                      >
                        {item.published ? "Published" : "Draft"}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          ) : (
            <tbody></tbody>
          )}
        </table>
      ) : tab === 2 ? (
        <>
          <div className="assessment-card">
            <div className="row">
              <div className="col-sm-6">
                <h6>{assessmentId.assessment_name}</h6>
                <h6 className="mb-5">
                  {assessmentId.subject} | {assessmentId.grade} | 60 Mins
                </h6>

                <h6>
                  Published at:{" "}
                  {new Date(parseInt(assessmentId.createdAt)).toDateString()}
                  {" | "}
                  {new Date(
                    parseInt(assessmentId.createdAt)
                  ).toLocaleTimeString()}
                </h6>
                <h6>
                  Assessment is {assessmentId.published ? "Published" : "Draft"}
                </h6>
              </div>
              <div className="col-sm-6">
                <PieChart />
              </div>
            </div>
          </div>
          {assessmentId ? (
            <>
              <h5 className="mt-4">Scorecard </h5>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div>
                  <span>Show</span>
                  <select className="pagination-number">
                    <option>10</option>
                    <option>10</option>
                    <option>10</option>
                    <option>10</option>
                  </select>
                  <span>entries</span>
                </div>

                <div>
                  <input
                    className="form-control"
                    type={"text"}
                    placeholder="Search"
                  />
                </div>
              </div>

              <DatatablePage
                setAssessmentIdQuestion={setAssessmentIdQuestion}
                assessment={assessmentId}
              />

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginTop: "20px",
                }}
              >
                <div>
                  <span>Showing 10 of 20 questions</span>
                </div>

                <div className="pagination-num">
                  <span className="prev-page">&#60;</span>
                  <span className="active-page">1</span>
                  <span>2</span>
                  <span className="next-page">&#62;</span>
                </div>
              </div>
            </>
          ) : (
            ""
          )}
        </>
      ) : (
        <>
          <>
            <div className="row">
              <div className="col-sm-6">
                <div className="avatar-card">
                  <div className="row">
                    <div className="col-sm-4">
                      <img src={Avatar} />
                    </div>

                    <div className="col-sm-8">
                      <h6>
                        {assessmentIdQuestion ? assessmentIdQuestion.name : ""}
                      </h6>
                      <h6 className="mb-5">
                        {assessmentId ? assessmentId.subject : ""} |{" "}
                        {assessmentId ? assessmentId.grade : ""}
                      </h6>

                      <h4>Score: 20</h4>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-sm-6">
                <div className="avatar-card">
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <div>
                      <h6 className="mb-3">Time taken</h6>
                      <h6 className="mb-3">Correct Answers</h6>
                      <h6 className="mb-3">Wrong Answers</h6>
                      <h6 className="mb-2">Skipped Answers</h6>
                    </div>

                    <div>
                      <h6 className="mb-3">{assessmentIdQuestion.time} min</h6>
                      <h6 className="mb-3">{assessmentIdQuestion.passed}</h6>
                      <h6 className="mb-3">{assessmentIdQuestion.failed}</h6>
                      <h6 className="mb-2">{assessmentIdQuestion.skipped}</h6>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>

          <h5 className="mt-4">
            {assessmentId ? assessmentId.assessment_name : ""} - Assessment
            Performance
          </h5>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div>
              <span>Show</span>
              <select className="pagination-number">
                <option>10</option>
                <option>10</option>
                <option>10</option>
                <option>10</option>
              </select>
              <span>entries</span>
            </div>

            <div>
              <input
                className="form-control"
                type={"text"}
                placeholder="Search"
              />
            </div>
          </div>
          {assessmentIdQuestion && assessmentId ? (
            <QuestionsPage
              assessmentIdQuestion={assessmentIdQuestion}
              assessment={assessmentId}
            />
          ) : (
            ""
          )}

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "20px",
            }}
          >
            <div>
              <span>Showing 10 of 20 questions</span>
            </div>

            <div className="pagination-num">
              <span className="prev-page">&#60;</span>
              <span className="active-page">1</span>
              <span>2</span>
              <span className="next-page">&#62;</span>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Assessment;
