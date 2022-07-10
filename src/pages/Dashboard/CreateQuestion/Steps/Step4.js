import React from "react";
import QuestionContext from "../../../../context/QuestionContext";
import { Interweave } from "interweave";

const Step4 = ({ goto }) => {
  const { questionData } = React.useContext(QuestionContext);

  return (
    <div className="preview d-flex flex-column gap-4">
      <div className="qst__info1 bg-white d-flex gap-5">
        <div className="info__data flex-grow-1 d-flex">
          <div className="left w-50">
            <div className="data_cr">
              <p>Curriculum</p>
              <h5>{questionData.step1.curriculum.curriculum_shortname}</h5>
            </div>
            <div className="data_sj">
              <p>Subject</p>
              <h5>{questionData.step1.subject.subject_info}</h5>
            </div>
            <div className="data_cp">
              <p>Chapter</p>
              <h5>{questionData.step1.chapter.chapter_name}</h5>
            </div>
          </div>

          <div className="right w-50">
            <div className="data_gr">
              <p>Grade</p>
              <h5>{questionData.step1.grade.grade_info}</h5>
            </div>
            <div className="data_str">
              <p>Stream</p>
              <h5>{questionData.step1.stream.stream_info}</h5>
            </div>
            <div className="data_str">
              <p>Stream</p>
              <h5>{questionData.step1.level.level_info}</h5>
            </div>
          </div>
        </div>
        <div className="edit_step ms-5">
          <button className="btn-edit" onClick={() => goto(0)}>
            Edit
          </button>
        </div>
      </div>
      {/* 
      <div className="qst__info2 bg-white d-flex gap-5">
        <div className="info__data d-flex flex-grow-1 gap-5">
          <div className="left w-50">
            <div className="data_df">
              <p>Difficulty</p>
              <h5>{questionData.step2.difficulty.level_info}</h5>
            </div>
          </div>

          <div className="right w-50">
            <div className="data_tm">
              <p>Time</p>
              <h5>{questionData.step2.time}</h5>
            </div>
          </div>
        </div>

        <div className="edit_step ms-5">
          <button className="btn-edit" onClick={() => goto(1)}>
            Edit
          </button>
        </div>
      </div> */}

      <div className="qst__title bg-white">
        <div className="info__data">
          <p>Question</p>
          <h5>
            <Interweave content={window.atob(questionData.step3.question)} />
          </h5>
        </div>

        <div className="edit_step ms-5">
          <button className="btn-edit" onClick={() => goto(2)}>
            Edit
          </button>
        </div>
      </div>

      <div className="qst__options bg-white">
        <div className="info__data">
          <p>Options</p>
          <div className="options d-flex flex-column">
            {questionData.step3.options.map((option, index) => (
              <div
                className={
                  parseInt(questionData.step3.answer) === index + 1
                    ? "option ans"
                    : "option"
                }
                key={index}
              >
                <p>
                  Option {index + 1}{" "}
                  {parseInt(questionData.step3.answer) === index + 1
                    ? ": Marked as Answer"
                    : ""}
                </p>
                <h5>{option}</h5>
              </div>
            ))}
          </div>
        </div>

        <div className="edit_step ms-5">
          <button className="btn-edit" onClick={() => goto(2)}>
            Edit
          </button>
        </div>
      </div>
    </div>
  );
};

export default Step4;
