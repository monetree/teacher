import React from "react";

const DatatablePage = ({ data, setAssessmentIdQuestion }) => {
  return (
    <table className="dataTable">
      <colgroup>
        <col style={{ width: "15%" }} />
        <col style={{ width: "40%" }} />
        <col style={{ width: "25%" }} />
        <col style={{ width: "15%" }} />
        <col style={{ width: "20%" }} />
        <col style={{ width: "20%" }} />
        <col style={{ width: "20%" }} />
      </colgroup>

      <thead>
        <tr>
          <th scope="col">ID</th>
          <th scope="col">Stundent Name</th>
          <th scope="col">Score</th>
          <th scope="col">Time</th>
          <th scope="col">Failed</th>
          <th scope="col">Passed</th>
          <th scope="col">Skipped</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => {
          return (
            <tr key={item.id} onClick={() => setAssessmentIdQuestion(item)}>
              <td>{index + 1}</td>
              <td>{item.name}</td>
              <td>{item.score}</td>
              <td>{item.time}</td>

              <td>{item.failed}</td>
              <td>{item.passed}</td>
              <td>{item.skipped}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default DatatablePage;
