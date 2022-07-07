import React from "react";
import { useNavigate } from "react-router-dom";
import successImage from "../../../../assets/success.png";

const Step4 = ({ goto, data }) => {
  const navigate = useNavigate();

  const navigateDashboard = () => {
    navigate("/dashboard");
  };

  return (
    <div className="question_step5 d-flex flex-column align-items-center justify-content-center py-5">
      <img src={successImage} alt="" />
      <h1>Thank You</h1>
      <p>You have successfully created an assessment</p>
      {data && data.createAssessment && data.createAssessment.assessment_id ? (
        <p>Assessment ID: {data.createAssessment.assessment_id}</p>
      ) : (
        ""
      )}

      <div className="done-actions">
        <button onClick={navigateDashboard}>Dashboard</button>
        <button onClick={() => goto(0)}>Create a Question</button>
      </div>
    </div>
  );
};

export default Step4;
