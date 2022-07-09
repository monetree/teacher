import React from "react";
import { useQuery, useMutation, gql } from "@apollo/client";

import "./CreateQuestion.css";
import Step1 from "./Steps/Step1";
import Step2 from "./Steps/Step2";
import Step3 from "./Steps/Step3";
import Step4 from "./Steps/Step4";
import Step5 from "./Steps/Step5";
import QuestionContext from "../../../context/QuestionContext";

const steps = [
  {
    title: "Start",
  },
  // {
  //   title: "Settings",
  // },
  {
    title: "Q&A",
  },
  {
    title: "Preview",
  },
  {
    title: "Done",
  },
];

const CreateQuestion = () => {
  const { questionData, setQuestionData } = React.useContext(QuestionContext);

  const [currentStep, setCurrentStep] = React.useState(0);

  const stepValidator = () => {
    if (currentStep === 0) {
      if (questionData.step1) {
        setCurrentStep(currentStep + 1);
      }
    }
    if (currentStep === 1) {
      setCurrentStep(currentStep + 1);
    }
    if (currentStep === 2) {
      if (questionData.step3) {
        setCurrentStep(currentStep + 1);
      }
    }
  };

  const QUERIES = gql`
    query {
      getStreams {
        id
        stream_info
      }

      getGrades {
        id
        grade_info
      }
      getCurriculums {
        id
        curriculum_shortname
      }

      getSubjects {
        id
        subject_info
      }

      getChapters {
        id
        chapter_name
      }

      getLevels {
        id
        level_info
      }
    }
  `;

  const MUTATIONS = gql`
    mutation createQuestion(
      $question_info: String!
      $question_type: String!
      $option_1: String!
      $option_2: String!
      $option_3: String!
      $option_4: String!
      $answer: String!
      $published: Boolean!
      $subjectRef: String!
      $gradeRef: String!
      $chapterRef: String!
      $levelRef: String!
      $streamRef: String!
      $curriculumRef: String!
    ) {
      createQuestion(
        question_info: $question_info
        question_type: $question_type
        option_1: $option_1
        option_2: $option_2
        option_3: $option_3
        option_4: $option_4
        answer: $answer
        published: $published
        subjectRef: $subjectRef
        gradeRef: $gradeRef
        chapterRef: $chapterRef
        levelRef: $levelRef
        streamRef: $streamRef
        curriculumRef: $curriculumRef
      ) {
        question_info
        question_type
        published
      }
    }
  `;

  const { loading, error, data } = useQuery(QUERIES);
  const [createQuestion, { loading: _loading, error: _error, data: _data }] =
    useMutation(MUTATIONS);

  const handleSubmit = (published_) => {
    const data = {
      ...questionData.step1,
      ...questionData.step2,
      ...questionData.step3,
    };

    const question_info = data.question;
    const question_type = "MULTIPLE CHOICE";
    const option_1 = data.options[0];
    const option_2 = data.options[1];
    const option_3 = data.options[2];
    const option_4 = data.options[3];
    const answer = data.answer.toString();
    const published = published_;
    const subjectRef = data.subject.id;
    const gradeRef = data.grade.id;
    const chapterRef = data.chapter.id;
    const levelRef = data.level.id;
    const streamRef = data.stream.id;
    const curriculumRef = data.curriculum.id;

    createQuestion({
      variables: {
        question_info,
        question_type,
        option_1,
        option_2,
        option_3,
        option_4,
        answer,
        published,
        subjectRef,
        gradeRef,
        chapterRef,
        levelRef,
        streamRef,
        curriculumRef,
      },
    });

    // dispatch(clearQuestion());
    setQuestionData({
      step1: null,
      step2: null,
      step3: null,
    });
    setCurrentStep(currentStep + 1);
  };

  return (
    <div className="createQuestion">
      <div className="create__steps">
        {steps.map((step, index) => {
          return (
            <div
              className={
                currentStep === index
                  ? "create__step current"
                  : currentStep > index
                  ? "create__step done"
                  : "create__step"
              }
              key={index}
            >
              <div
                className={
                  index === 3 ? "step-indicator done" : "step-indicator"
                }
              >
                {index === 3 ? (
                  <ion-icon name="checkmark-outline"></ion-icon>
                ) : (
                  index + 1
                )}
              </div>
              <div className="step-title">{step.title}</div>
            </div>
          );
        })}
      </div>

      {/*---------------------- this is step content ----------------------*/}

      {data && data.getCurriculums ? (
        <div className="step__content">
          {currentStep === 0 && <Step1 data={data} />}
          {/* {currentStep === 1 && <Step2 data={data} />} */}
          {currentStep === 1 && <Step3 />}
          {currentStep === 2 && <Step4 goto={setCurrentStep} />}
          {currentStep === 3 && <Step5 goto={setCurrentStep} />}
        </div>
      ) : (
        <div className="step__content"></div>
      )}

      {/* ------------------ this is step navigation ---------------------- */}

      <div className="step__navigation">
        {currentStep > 0 ? (
          currentStep <= steps.length - 2 && (
            <button
              className="step__back"
              onClick={() => setCurrentStep(currentStep - 1)}
            >
              {`Prev: ${steps[currentStep - 1]?.title}`}
            </button>
          )
        ) : (
          <span></span>
        )}

        {currentStep === steps.length - 1 ? (
          <span></span>
        ) : (
          <>
            <button
              className="step__next"
              onClick={() => {
                if (currentStep === 2) {
                  handleSubmit(true);
                } else {
                  stepValidator();
                }
              }}
              disabled={
                (currentStep === 0 && !questionData.step1) ||
                (currentStep === 2 && !questionData.step3)
              }
            >
              {currentStep === steps.length - 3
                ? "Next: Preview"
                : currentStep === steps.length - 2
                ? "Submit"
                : `Next: ${steps[currentStep + 1]?.title}`}
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default CreateQuestion;
