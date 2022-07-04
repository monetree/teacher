import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearQuestion } from "../../../store/slices/questionSlice";
import { useQuery, useMutation, gql } from "@apollo/client";

import "./CreateQuestion.css";
import Step1 from "./Steps/Step1";
import Step2 from "./Steps/Step2";
import Step3 from "./Steps/Step3";
import Step4 from "./Steps/Step4";
import Step5 from "./Steps/Step5";

const steps = [
  {
    title: "Start",
  },
  {
    title: "Settings",
  },
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
  const dispatch = useDispatch();

  const step1Data = useSelector((state) => state.question.step1);
  const step2Data = useSelector((state) => state.question.step2);
  const step3Data = useSelector((state) => state.question.step3);

  const [currentStep, setCurrentStep] = React.useState(0);

  const stepValidator = () => {
    if (currentStep === 0) {
      if (step1Data) {
        setCurrentStep(currentStep + 1);
      }
    }
    if (currentStep === 1) {
      if (step2Data) {
        setCurrentStep(currentStep + 1);
      }
    }
    if (currentStep === 2) {
      if (step3Data) {
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

  const handleSubmit = () => {
    const data = {
      ...step1Data,
      ...step2Data,
      ...step3Data,
    };
    console.log(data);

    const question_info = data.question;
    const question_type = "MULTIPLE CHOICE";
    const option_1 = data.options[0];
    const option_2 = data.options[1];
    const option_3 = data.options[2];
    const option_4 = data.options[3];
    const answer = data.answer.toString();
    const published = true;
    const subjectRef = data.subject.id;
    const gradeRef = data.grade.id;
    const chapterRef = data.chapter.id;
    const levelRef = data.difficulty.id;
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

    dispatch(clearQuestion());
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
                  index === 4 ? "step-indicator done" : "step-indicator"
                }
              >
                {index === 4 ? (
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
          {currentStep === 1 && <Step2 data={data} />}
          {currentStep === 2 && <Step3 />}
          {currentStep === 3 && <Step4 goto={setCurrentStep} />}
          {currentStep === 4 && <Step5 goto={setCurrentStep} />}
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
          <button
            className="step__next"
            onClick={() => {
              if (currentStep === steps.length - 2) {
                handleSubmit();
              } else {
                stepValidator();
              }
            }}
            disabled={
              (currentStep === 0 && !step1Data) ||
              (currentStep === 1 && !step2Data) ||
              (currentStep === 2 && !step3Data)
            }
          >
            {currentStep === steps.length - 3
              ? "Next: Preview"
              : currentStep === steps.length - 2
              ? "Submit"
              : `Next: ${steps[currentStep + 1]?.title}`}
          </button>
        )}
      </div>
    </div>
  );
};

export default CreateQuestion;