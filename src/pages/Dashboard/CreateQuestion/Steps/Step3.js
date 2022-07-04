import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { createQuestion3 } from "../../../../store/slices/questionSlice";

const Step3 = () => {
  // redux
  const dispatch = useDispatch();
  const allData = useSelector((state) => state.question.step3);

  // data states
  const [question, setQuestion] = React.useState(
    allData ? allData.question : ""
  );
  const [option1, setOption1] = React.useState(
    allData ? allData.options[0] : ""
  );
  const [option2, setOption2] = React.useState(
    allData ? allData.options[1] : ""
  );
  const [option3, setOption3] = React.useState(
    allData ? allData.options[2] : ""
  );
  const [option4, setOption4] = React.useState(
    allData ? allData.options[3] : ""
  );
  const [answer, setAnswer] = React.useState(allData ? allData.answer : 0);

  // data refs
  const questionRef = React.useRef();
  const option1Ref = React.useRef();
  const option2Ref = React.useRef();
  const option3Ref = React.useRef();
  const option4Ref = React.useRef();

  // set data on state change
  React.useEffect(() => {
    if (question && option1 && option2 && option3 && option4 && answer) {
      dispatch(
        createQuestion3({
          question,
          options: [option1, option2, option3, option4],
          answer,
        })
      );
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

        <textarea
          ref={questionRef}
          onChange={() => setQuestion(questionRef.current.value)}
          id="fullQuestion"
          name="fullQuestion"
          rows="10"
          cols="50"
          defaultValue={allData ? allData.question : ""}
        ></textarea>
      </div>

      <div className="step3__input2 w-100 d-flex align-items-center gap-5 mt-4">
        <div className="left w-100 d-flex flex-column">
          <label htmlFor="option1">Option 1</label>

          <textarea
            ref={option1Ref}
            onChange={() => setOption1(option1Ref.current.value)}
            id="option1"
            name="option1"
            defaultValue={allData ? allData.options[0] : ""}
          ></textarea>

          <label className="markAs">
            <p
              className={
                allData && allData.answer === 1
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
              defaultChecked={allData ? allData.answer === 1 : false}
            />
            <span>Mark as correct answer</span>
          </label>
        </div>

        <div className="right w-100 d-flex flex-column">
          <label htmlFor="option2">Option 2</label>

          <textarea
            ref={option2Ref}
            onChange={() => setOption2(option2Ref.current.value)}
            id="option2"
            name="option2"
            defaultValue={allData ? allData.options[1] : ""}
          ></textarea>

          <label className="markAs">
            <p
              className={
                allData && allData.answer === 2
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
              defaultChecked={allData ? allData.answer === 2 : false}
            />
            <span>Mark as correct answer</span>
          </label>
        </div>
      </div>

      <div className="step3__input3 w-100 d-flex align-items-center gap-5 mt-4">
        <div className="left w-100 d-flex flex-column">
          <label htmlFor="option3">Option 3</label>

          <textarea
            ref={option3Ref}
            onChange={() => setOption3(option3Ref.current.value)}
            id="option3"
            name="option3"
            defaultValue={allData ? allData.options[2] : ""}
          ></textarea>

          <label className="markAs">
            <p
              className={
                allData && allData.answer === 3
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
              defaultChecked={allData ? allData.answer === 3 : false}
            />
            <span>Mark as correct answer</span>
          </label>
        </div>

        <div className="right w-100 d-flex flex-column">
          <label htmlFor="option4">Option 4</label>

          <textarea
            ref={option4Ref}
            onChange={() => setOption4(option4Ref.current.value)}
            id="option4"
            name="option4"
            defaultValue={allData ? allData.options[3] : ""}
          ></textarea>

          <label className="markAs">
            <p
              className={
                allData && allData.answer === 4
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
              defaultChecked={allData ? allData.answer === 4 : false}
            />
            <span>Mark as correct answer</span>
          </label>
        </div>
      </div>
    </div>
  );
};

export default Step3;
