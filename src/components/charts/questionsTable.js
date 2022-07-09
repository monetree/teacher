import React from "react";
import { useQuery, gql } from "@apollo/client";

const QuestionsPage = ({ assessmentIdQuestion, assessment }) => {
  const STUDENT_SCORECARD_QUERIES = gql`
    query getStudentScorecard($assessmentRef: String!, $userRef: String!) {
      getStudentScorecard(assessmentRef: $assessmentRef, userRef: $userRef) {
        id
        status
        level
        question
        answer
      }
    }
  `;

  const { loading, error, data } = useQuery(STUDENT_SCORECARD_QUERIES, {
    variables: {
      assessmentRef: assessment.id,
      userRef: assessmentIdQuestion.userRef,
    },
  });

  return (
    <table className="dataTable">
      <colgroup>
        <col style={{ width: "20%" }} />
        <col style={{ width: "50%" }} />
        <col style={{ width: "20%" }} />
        <col style={{ width: "20%" }} />
        <col style={{ width: "20%" }} />
      </colgroup>

      <thead>
        <tr>
          <th scope="col">ID</th>
          <th scope="col">Question</th>
          <th scope="col">Difficultie</th>
          <th scope="col">Answer</th>
          <th scope="col">Status</th>
        </tr>
      </thead>
      {data && data.getStudentScorecard ? (
        <tbody>
          {data.getStudentScorecard.map((item, index) => {
            return (
              <tr key={item.id}>
                <td>{index + 1}</td>
                <td>{item.question.substring(0, 40)} ...</td>
                <td>{item.level}</td>
                <td>{item.answer}</td>
                <td>
                  <button
                    className={
                      item.status === "PASSED"
                        ? "btn btn-success"
                        : item.status === "FAILED"
                        ? "btn btn-danger"
                        : "btn btn-warning"
                    }
                  >
                    {item.status}
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
  );
};

export default QuestionsPage;
