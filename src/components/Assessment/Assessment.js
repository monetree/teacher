import React, { useState } from "react";
import "./Assessment.css";
import { useQuery, gql } from "@apollo/client";
import PieChart from "../charts/pieChart";
import DatatablePage from "../charts/dataTable";

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
      }
    }
  `;

  const { loading, error, data } = useQuery(QUERIES);
  const [assessmentId, setAssessmentId] = useState(null);

  return (
    <div>
      <h2 className="mb-4">All Assessments</h2>

      {assessmentId ? (
        <>
          <div className="assessment-card">
            <div className="row">
              <div className="col-sm-6">
                <h6>Assessment 3</h6>
                <h6 className="mb-5">Biology | Grade 7 | 60 Mins</h6>

                <h6>Published at: 12:22 AM, 23 June 2022</h6>
                <h6>Assessment is in-progress</h6>
              </div>
              <div className="col-sm-6">
                <PieChart />
              </div>
            </div>
          </div>

          {data && data.getAssessmentScorecard ? (
            <DatatablePage data_={data.getAssessmentScorecard} />
          ) : (
            ""
          )}
        </>
      ) : (
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
                  <tr key={item.id} onClick={() => setAssessmentId(item.id)}>
                    <td>{item.name}</td>
                    <td>{item.subject}</td>
                    <td>{item.grade}</td>
                    <td className="status">
                      <span
                        className={
                          item.published
                            ? "rounded-pill py-1 complete"
                            : "draft"
                        }
                      >
                        {item.published ? "Completed" : "Draft"}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          ) : (
            <tbody></tbody>
          )}
        </table>
      )}
    </div>
  );
};

export default Assessment;
