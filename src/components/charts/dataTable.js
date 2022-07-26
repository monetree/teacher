import React, { useEffect, useState } from "react";
import { useQuery, gql } from "@apollo/client";
import SortIcon from "../SortIcon/SortIcon";

const DatatablePage = ({ assessment, setAssessmentIdQuestion }) => {
  const ASSESSMENT_SCORECARD_QUERIES = gql`
    query getAssessmentScorecard($assessmentRef: String!) {
      getAssessmentScorecard(assessmentRef: $assessmentRef) {
        userRef
        id
        completed
        createdAt
        updatedAt
        failed
        passed
        skipped
        score
        name
        time
      }
    }
  `;

  const { loading, error, data } = useQuery(ASSESSMENT_SCORECARD_QUERIES, {
    variables: {
      assessmentRef: assessment.id,
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
    if (data && data.getAssessmentScorecard) {
      setScorecards(data.getAssessmentScorecard);
      setCurrentData(data.getAssessmentScorecard.slice(0, 1));
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
    if (!data || !data.getAssessmentScorecard) return;
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
      setScorecards(data.getAssessmentScorecard);
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
          <col style={{ width: "15%" }} />
          <col style={{ width: "40%" }} />
          <col style={{ width: "25%" }} />
          <col style={{ width: "20%" }} />
          <col style={{ width: "20%" }} />
          <col style={{ width: "20%" }} />
          <col style={{ width: "25%" }} />
        </colgroup>

        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col" onClick={() => sortData("name")}>
              <div className="d-flex align-items-center">
                <span className="flex-grow-1">Stundent Name</span> <SortIcon />
              </div>
            </th>
            <th scope="col" onClick={() => sortData("score")}>
              <div className="d-flex align-items-center">
                <span className="flex-grow-1">Score</span> <SortIcon />
              </div>
            </th>
            <th scope="col" onClick={() => sortData("time")}>
              <div className="d-flex align-items-center">
                <span className="flex-grow-1">Time</span> <SortIcon />
              </div>
            </th>
            <th scope="col" onClick={() => sortData("failed")}>
              <div className="d-flex align-items-center">
                <span className="flex-grow-1">Failed</span> <SortIcon />
              </div>
            </th>
            <th scope="col" onClick={() => sortData("passed")}>
              <div className="d-flex align-items-center">
                <span className="flex-grow-1">Passed</span> <SortIcon />
              </div>
            </th>
            <th scope="col" onClick={() => sortData("skipped")}>
              <div className="d-flex align-items-center">
                <span className="flex-grow-1">Skipped</span> <SortIcon />
              </div>
            </th>
          </tr>
        </thead>
        {scorecards && scorecards.length ? (
          <tbody>
            {scorecards.map((item, index) => {
              return (
                <tr key={item.id} onClick={() => setAssessmentIdQuestion(item)}>
                  <td>{index + 1}</td>
                  <td>{item.name}</td>
                  <td>{item.score}</td>
                  <td>{item.time}.mins</td>

                  <td>{item.failed}</td>
                  <td>{item.passed}</td>
                  <td>{item.skipped}</td>
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

export default DatatablePage;
