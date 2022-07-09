import React, { useState, useRef, useEffect } from "react";

import AssessmentContext from "../../../../context/AssessmentContext";
import { useQuery, gql } from "@apollo/client";

const Step2 = () => {
  const { assessmentData, setAssessmentData } =
    React.useContext(AssessmentContext);

  const [modal, setModal] = React.useState(false);
  const [selected, setSelected] = React.useState(1);
  const [assessments, setAssessments] = React.useState(
    assessmentData.step2 || []
  );

  const handleDetails = (id) => {
    setSelected(id);
    setModal(true);
  };

  const handleAddQuestion = (id) => {
    const newItem = data.getQuestions.find((item) => item.id === id);
    setAssessments([...assessments, newItem]);

    setAssessmentData({
      ...assessmentData,
      step2: [...assessmentData.step2, newItem],
    });
    setModal(false);
  };

  const QUESTION_QUERIES = gql`
    query GetQuestions(
      $subjectRef: ID!
      $gradeRef: ID!
      $chapterRef: ID!
      $streamRef: ID!
      $curriculumRef: ID!
    ) {
      getQuestions(
        subjectRef: $subjectRef
        gradeRef: $gradeRef
        chapterRef: $chapterRef
        streamRef: $streamRef
        curriculumRef: $curriculumRef
      ) {
        question_info
        question_type
        question_type
        options
        level
        id
        answer
      }
    }
  `;

  const { loading, error, data } = useQuery(QUESTION_QUERIES, {
    variables: {
      subjectRef: assessmentData.step1.subject.id,
      gradeRef: assessmentData.step1.grade.id,
      chapterRef: assessmentData.step1.chapter.id,
      streamRef: assessmentData.step1.stream.id,
      curriculumRef: assessmentData.step1.curriculum.id,
    },
  });

  const [questions, setQuestions] = useState([]);
  const [selelctedQuestions, setSelelctedQuestions] = useState([]);

  useEffect(() => {
    if (data && data.getQuestions) {
      setQuestions(data.getQuestions);
    }
  }, [data]);

  const allowDrop = (ev) => {
    ev.preventDefault();
  };

  const drag = (ev) => {
    ev.dataTransfer.setData("text", ev.target.id);
  };

  const drop = (ev) => {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    for (let i of questions) {
      if (i.id === data) {
        setSelelctedQuestions([...selelctedQuestions, i]);
        setQuestions(questions.filter((item) => item.id !== data));
      }
    }
  };

  const drop2 = (ev) => {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    for (let i of selelctedQuestions) {
      if (i.id === data) {
        setQuestions([...questions, i]);
        setSelelctedQuestions(
          selelctedQuestions.filter((item) => item.id !== data)
        );
      }
    }
  };

  return (
    <>
      <div className="select_questions w-100 d-flex gap-5">
        <div
          className="question__bank bg-white w-50"
          onDragOver={(e) => allowDrop(e)}
          draggable
          onDrop={(e) => drop2(e)}
        >
          <div className="question__bank__header">
            <h4>Question Bank ({questions.length})</h4>
            <input type="text" placeholder="Search" />
          </div>

          {questions && questions.length ? (
            <div className="bank__questions">
              {questions.map((question, index) => (
                <div
                  className="question__item"
                  onClick={() => handleDetails(index + 1)}
                  key={index}
                  draggable
                  onDragOver={(e) => allowDrop(e)}
                  id={question.id}
                  onDragStart={(e) => drag(e)}
                >
                  <h5>{question.question_info}</h5>
                  <div className="question__item__info">
                    <p>Difficulty: {question.level}</p>
                    <p>Duration: 10</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="no-data">
              <h4 className="text-center fw-bold text-secondary mt-5">
                No Question Available
              </h4>
            </div>
          )}
        </div>

        <div
          className="assessment__question bg-white w-50"
          onDragOver={(e) => allowDrop(e)}
          draggable
          onDrop={(e) => drop(e)}
        >
          <div className="assessment__question__header">
            <h4>Assessment Questions ({selelctedQuestions.length})</h4>
            <p>Drag and drop question from question bank</p>
          </div>

          <div className="assessment__questions">
            {selelctedQuestions.length > 0 ? (
              selelctedQuestions.map((question) => (
                <div
                  className="question__item"
                  key={question.id}
                  id={question.id}
                  draggable
                  onDragOver={(e) => allowDrop(e)}
                  onDragStart={(e) => drag(e)}
                >
                  <h5>{question.question_info}</h5>
                  <div className="question__item__info">
                    <p>Difficulty: {question.level}</p>
                    <p>Duration: 60</p>
                  </div>
                </div>
              ))
            ) : (
              <div className="no-data">
                <h4 className="text-center fw-bold text-secondary mt-5">
                  No Question Added Yet
                </h4>
              </div>
            )}
          </div>
        </div>

        {questions && questions.length ? (
          <div className={modal ? "details__modal show" : "details__modal"}>
            <div className="details__modal__content d-flex flex-column">
              <button
                className="btn-close"
                onClick={() => {
                  setModal(false);
                  setSelected(0);
                }}
              >
                <ion-icon name="close-outline"></ion-icon>
              </button>

              <div className="modal_info flex-grow-1">
                <h4>Question</h4>
                <p className="question_title">
                  {selected !== 0 && questions[selected - 1].question_info}
                </p>

                <h4 className="mb-4">Options</h4>

                <div className="modal_options">
                  {selected !== 0 &&
                    questions[selected - 1].options.map((option, index) => (
                      <div
                        className={
                          parseInt(questions[selected - 1].answer) === index + 1
                            ? "selected_option ans"
                            : "selected_option"
                        }
                        key={index}
                      >
                        <p>
                          Option {index + 1}
                          {parseInt(questions[selected - 1].answer) ===
                          index + 1
                            ? ": Marked as Answer"
                            : ""}
                        </p>
                        <h6>{option}</h6>
                      </div>
                    ))}
                </div>
              </div>

              <div className="modal__button d-flex justify-content-between align-items-center">
                <button
                  className="btn-addAssessment"
                  onClick={() => handleAddQuestion(questions[selected - 1].id)}
                >
                  Add To Assessment
                </button>

                <button
                  className="btn-close2"
                  onClick={() => {
                    setModal(false);
                    setSelected(0);
                  }}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </>
  );
};

export default Step2;
