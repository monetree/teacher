import React, { useState } from "react";
import Editor from "../../../../components/editor/editor";
import QuestionContext from "../../../../context/QuestionContext";

const Step3 = () => {
  const { questionData, setQuestionData } = React.useContext(QuestionContext);

  // data states
  const [question, setQuestion] = React.useState(
    questionData.step3 ? questionData.step3.question : ""
  );
  const [option1, setOption1] = React.useState(
    questionData.step3 ? questionData.step3.options[0] : ""
  );
  const [option2, setOption2] = React.useState(
    questionData.step3 ? questionData.step3.options[1] : ""
  );
  const [option3, setOption3] = React.useState(
    questionData.step3 ? questionData.step3.options[2] : ""
  );
  const [option4, setOption4] = React.useState(
    questionData.step3 ? questionData.step3.options[3] : ""
  );
  const [answer, setAnswer] = React.useState(
    questionData.step3 ? questionData.step3.answer : 0
  );

  // data refs
  const questionRef = React.useRef();
  const option1Ref = React.useRef();
  const option2Ref = React.useRef();
  const option3Ref = React.useRef();
  const option4Ref = React.useRef();

  // set data on state change
  React.useEffect(() => {
    if (question && option1 && option2 && option3 && option4 && answer) {
      setQuestionData({
        ...questionData,
        step3: {
          question,
          options: [option1, option2, option3, option4],
          answer,
        },
      });
    }
  }, [question, option1, option2, option3, option4, answer]);

  // select correct answer
  const selectAnswer = (answerIndex) => {
    setAnswer(answerIndex);
  };

  return (
    <div className="question_step3">
      <div className="step3__input1 d-flex flex-column">
        <label htmlFor="fullQuestion">Question</label>

        <Editor setdata={setQuestion} />
      </div>

      <div className="step3__input2 w-100 d-flex align-items-center gap-5 mt-4">
        <div className="left w-100 d-flex flex-column">
          <label htmlFor="option1">Option 1</label>

          <Editor setdata={setOption1} />

          <label className="markAs">
            <p
              className={
                questionData.step3 && questionData.step3.answer === 1
                  ? "active"
                  : answer === 1
                  ? "active"
                  : ""
              }
            >
              <ion-icon name="checkmark-outline"></ion-icon>
            </p>
            <input
              type="radio"
              name="correct"
              value="option1"
              onChange={() => selectAnswer(answer === 1 ? 0 : 1)}
              defaultChecked={
                questionData.step3 ? questionData.step3.answer === 1 : false
              }
            />
            <span>Mark as correct answer</span>
          </label>
        </div>

        <div className="right w-100 d-flex flex-column">
          <label htmlFor="option2">Option 2</label>

          <Editor setdata={setOption2} />

          <label className="markAs">
            <p
              className={
                questionData.step3 && questionData.step3.answer === 2
                  ? "active"
                  : answer === 2
                  ? "active"
                  : ""
              }
            >
              <ion-icon name="checkmark-outline"></ion-icon>
            </p>
            <input
              type="radio"
              name="correct"
              value="option2"
              onChange={() => selectAnswer(answer === 2 ? 0 : 2)}
              defaultChecked={
                questionData.step3 ? questionData.step3.answer === 2 : false
              }
            />
            <span>Mark as correct answer</span>
          </label>
        </div>
      </div>

      <div className="step3__input3 w-100 d-flex align-items-center gap-5 mt-4">
        <div className="left w-100 d-flex flex-column">
          <label htmlFor="option3">Option 3</label>

          <Editor setdata={setOption3} />

          <label className="markAs">
            <p
              className={
                questionData.step3 && questionData.step3.answer === 3
                  ? "active"
                  : answer === 3
                  ? "active"
                  : ""
              }
            >
              <ion-icon name="checkmark-outline"></ion-icon>
            </p>
            <input
              type="radio"
              name="correct"
              value="option3"
              onChange={() => selectAnswer(answer === 3 ? 0 : 3)}
              defaultChecked={
                questionData.step3 ? questionData.step3.answer === 3 : false
              }
            />
            <span>Mark as correct answer</span>
          </label>
        </div>

        <div className="right w-100 d-flex flex-column">
          <label htmlFor="option4">Option 4</label>

          <Editor setdata={setOption4} />

          <label className="markAs">
            <p
              className={
                questionData.step3 && questionData.step3.answer === 4
                  ? "active"
                  : answer === 4
                  ? "active"
                  : ""
              }
            >
              <ion-icon name="checkmark-outline"></ion-icon>
            </p>
            <input
              type="radio"
              name="correct"
              value="option4"
              onChange={() => selectAnswer(answer === 4 ? 0 : 4)}
              defaultChecked={
                questionData.step3 ? questionData.step3.answer === 4 : false
              }
            />
            <span>Mark as correct answer</span>
          </label>
        </div>
      </div>
    </div>
  );
};

export default Step3;
