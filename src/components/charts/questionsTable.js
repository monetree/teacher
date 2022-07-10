import React, { useEffect, useState } from "react";
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

  const [scorecards, setScorecards] = useState([]);
  const [currentData, setCurrentData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortField, setSortField] = useState(null);
  const [sortType, setSortType] = useState(null);
  const [inputText, setInputText] = useState("");

  const nextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    if (currentPage === 1) return;
    setCurrentPage(currentPage - 1);
  };

  useEffect(() => {
    setCurrentData(scorecards.slice(currentPage - 1, currentPage));
  }, [currentPage]);

  useEffect(() => {
    if (data && data.getStudentScorecard) {
      setScorecards(data.getStudentScorecard);
      setCurrentData(data.getStudentScorecard.slice(0, 1));
    }
  }, [data]);

  const sortData = (field) => {
    setSortField(field);

    const arrayForSort = [...scorecards];

    if (sortField === sortField && sortType === "asc") {
      setSortType("desc");
      let posts_ = arrayForSort.sort((a, b) => (a[field] < b[field] ? 1 : -1));
      setScorecards(posts_);
      setCurrentData(posts_.slice(0, 1));
    } else {
      setSortType("asc");
      let posts_ = arrayForSort.sort((a, b) => (a[field] > b[field] ? 1 : -1));
      setScorecards(posts_);
      setCurrentData(posts_.slice(0, 1));
    }
  };

  useEffect(() => {
    if (!data || !data.getStudentScorecard) return;
    setCurrentPage(1);
    const arrayForSort = [...scorecards];

    if (inputText) {
      var newAr = arrayForSort.filter(function (applicant) {
        return applicant.name
          .toLocaleLowerCase()
          .includes(inputText.toLocaleLowerCase());
      });

      setScorecards(newAr);
    } else {
      setCurrentData(arrayForSort.slice(0, 1));
      setScorecards(data.getStudentScorecard);
    }
  }, [inputText]);

  return (
    <>
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
            onChange={(e) => setInputText(e.target.value)}
          />
        </div>
      </div>
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
            <th scope="col" onClick={() => sortData("question")}>
              Question
            </th>
            <th scope="col" onClick={() => sortData("level")}>
              Difficultie
            </th>
            <th scope="col" onClick={() => sortData("answer")}>
              Answer
            </th>
            <th scope="col" onClick={() => sortData("status")}>
              Status
            </th>
          </tr>
        </thead>
        {scorecards && scorecards.length ? (
          <tbody>
            {scorecards.map((item, index) => {
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
          <span className="prev-page" onClick={() => prevPage()}>
            &#60;
          </span>
          <span className="active-page">1</span>
          <span>2</span>
          <span className="next-page" onClick={() => nextPage()}>
            &#62;
          </span>
        </div>
      </div>
    </>
  );
};

export default QuestionsPage;
