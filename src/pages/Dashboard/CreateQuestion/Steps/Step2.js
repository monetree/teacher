import React from "react";
import { times } from "../../../../data";
import QuestionContext from "../../../../context/QuestionContext";

const Step2 = ({ data }) => {

  const { questionData, setQuestionData } = React.useContext(QuestionContext);

  // data states
  const [difficulty, setDifficulty] = React.useState(
    questionData.step2 ? questionData.step2.difficulty : ""
  );
  const [time, setTime] = React.useState(questionData.step2 ? questionData.step2.time : "");

  // dropdown states
  const [difficultyDropdown, setDifficultyDropdown] = React.useState(false);
  const [timeDropdown, setTimeDropdown] = React.useState(false);

  // data refs
  const difficultyRef = React.useRef();
  const timeRef = React.useRef();

  // detect click outside of dropdown

  React.useEffect(() => {
    const handleClick = (event) => {
      if (
        difficultyRef.current &&
        !difficultyRef.current.contains(event.target)
      ) {
        setDifficultyDropdown(false);
      }
      if (timeRef.current && !timeRef.current.contains(event.target)) {
        setTimeDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClick);
    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, []);

  // set data on state change

  React.useEffect(() => {
    if (difficulty && time) {
      setQuestionData({
        ...questionData,
        step2: {
          difficulty,
          time,
        },
      });
    }
  }, [difficulty, time]);

  return (
    <div className="question_step2">
      <div className="question_input_group1 d-flex align-items-center">
        <div className="curriculums w-50 d-flex flex-column">
          <label>Difficulties</label>

          <div className="curriculums-dropdown" ref={difficultyRef}>
            <div
              className="selected d-flex justify-content-between align-items-center"
              onClick={() => setDifficultyDropdown(!difficultyDropdown)}
            >
              <span>
                {difficulty && difficulty.id
                  ? difficulty.level_info
                  : "Select Difficulty"}
              </span>
              <ion-icon name="chevron-down-outline"></ion-icon>
            </div>

            <ul
              className={
                difficultyDropdown
                  ? "curriculum-items show"
                  : "curriculum-items"
              }
            >
              {data.getLevels.map((item, index) => {
                return (
                  <li
                    key={index}
                    className="curriculum-item"
                    onClick={() => {
                      setDifficulty(item);
                      setDifficultyDropdown(false);
                    }}
                  >
                    <span>{item.level_info}</span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        <div className="grades w-50 d-flex flex-column">
          <label>Times</label>

          <div className="grades-dropdown" ref={timeRef}>
            <div
              className="selected d-flex justify-content-between align-items-center"
              onClick={() => setTimeDropdown(!timeDropdown)}
            >
              <span>
                {questionData.step2 ? questionData.step2.time : time ? time : "Select Time"}
              </span>
              <ion-icon name="chevron-down-outline"></ion-icon>
            </div>

            <ul className={timeDropdown ? "gradeItems show" : "gradeItems"}>
              {times.map((item, index) => {
                return (
                  <li
                    key={index}
                    className="gradeItem"
                    onClick={() => {
                      setTime(item.name);
                      setTimeDropdown(false);
                    }}
                  >
                    <span>{item.name}</span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Step2;
