import React, { useEffect, useState } from "react";
import "./Assessment.css";
import { useQuery, gql } from "@apollo/client";
import PieChart from "../charts/pieChart";
import DatatablePage from "../charts/dataTable";
import Avatar from "../../assets/image 10.png";
import QuestionsPage from "../charts/questionsTable";

const Assessment = () => {
  const QUERIES = gql`
    query {
      getAssessments(teacherRef: "62a827022ed38fb4323c53cd") {
        id
        subject
        name
        grade
        published
      }

      getAssessmentScorecard(assessmentRef: "62aee40f28539421a30a8664") {
        userRef
        id
        completed
        createdAt
        updatedAt
        failed
        passed
        skipped
        time
        score
      }
      getStudentScorecard(
        assessmentRef: "62aee40f28539421a30a8664"
        userRef: "62a4360fb009ea33976c040b"
      ) {
        id
        status
        level
        question
        answer
      }

      getStudents(assessment_id: "991671") {
        id
        name
        email
        number
        completed
        coin
      }
    }
  `;

  const { loading, error, data } = useQuery(QUERIES);
  const [assessmentId, setAssessmentId] = useState(null);
  const [assessmentIdQuestion, setAssessmentIdQuestion] = useState(null);

  const [tab, setTab] = useState(1);

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
          All Assessments &#62; Assessment 3
        </h5>
      ) : (
        <h5 className="mb-4" style={{ color: "rgba(25, 25, 25, 0.8)" }}>
          All Assessments &#62; Assessment 3 &#62; Ella johnson
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
                    <td>{item.name}</td>
                    <td>{item.subject}</td>
                    <td>{item.grade}</td>
                    <td className="status">
                      <button
                        className={
                          item.published ? "btn btn-success" : "btn btn-warning"
                        }
                      >
                        {item.published ? "Completed" : "Draft"}
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
                <h6>{assessmentId.name}</h6>
                <h6 className="mb-5">
                  {assessmentId.subject} | {assessmentId.grade} | 60 Mins
                </h6>

                <h6>Published at: 12:22 AM, 23 June 2022</h6>
                <h6>Assessment is in-progress</h6>
              </div>
              <div className="col-sm-6">
                <PieChart />
              </div>
            </div>
          </div>

          {data && data.getAssessmentScorecard ? (
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
                data={data.getAssessmentScorecard}
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
                      <h6>Ella johnson </h6>
                      <h6 className="mb-5">Biology | Grade 7</h6>

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
                      <h6 className="mb-3">37: 30 min</h6>
                      <h6 className="mb-3">10</h6>
                      <h6 className="mb-3">2</h6>
                      <h6 className="mb-2">3</h6>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>

          <h5 className="mt-4">Ella Johnson’s - Assessment Performance </h5>
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
          {data && data.getStudentScorecard ? (
            <QuestionsPage data={data.getStudentScorecard} />
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
