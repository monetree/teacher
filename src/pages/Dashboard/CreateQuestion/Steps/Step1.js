import React, { useContext } from "react";
import QuestionContext from "../../../../context/QuestionContext";

const Step1 = ({ data }) => {
  // react context api
  const { questionData, setQuestionData } = useContext(QuestionContext);

  // data states
  const [curriculum, setCurriculum] = React.useState(
    questionData.step1 ? questionData.step1.curriculum : ""
  );
  const [grade, setGrade] = React.useState(
    questionData.step1 ? questionData.step1.grade : ""
  );
  const [subject, setSubject] = React.useState(
    questionData.step1 ? questionData.step1.subject : ""
  );
  const [stream, setStream] = React.useState(
    questionData.step1 ? questionData.step1.stream : ""
  );
  const [chapter, setChapter] = React.useState(
    questionData.step1 ? questionData.step1.chapter : ""
  );

  const [level, setLevel] = React.useState(
    questionData.step1 ? questionData.step1.level : ""
  );

  // dropdown change handlers
  const [curriculumDropdown, setCurriculumDropdown] = React.useState(false);
  const [gradeDropdown, setGradeDropdown] = React.useState(false);
  const [subjectDropdown, setSubjectDropdown] = React.useState(false);
  const [streamDropdown, setStreamDropdown] = React.useState(false);
  const [chapterDropdown, setChapterDropdown] = React.useState(false);
  const [levelDropdown, setLevelDropdown] = React.useState(false);

  // data refs
  const curriculumRef = React.useRef();
  const gradeRef = React.useRef();
  const subjectRef = React.useRef();
  const streamRef = React.useRef();
  const chapterRef = React.useRef();
  const levelRef = React.useRef();

  // detect click outside of dropdown

  React.useEffect(() => {
    const handleClick = (event) => {
      if (
        curriculumRef.current &&
        !curriculumRef.current.contains(event.target)
      ) {
        setCurriculumDropdown(false);
      }
      if (gradeRef.current && !gradeRef.current.contains(event.target)) {
        setGradeDropdown(false);
      }
      if (subjectRef.current && !subjectRef.current.contains(event.target)) {
        setSubjectDropdown(false);
      }
      if (streamRef.current && !streamRef.current.contains(event.target)) {
        setStreamDropdown(false);
      }
      if (chapterRef.current && !chapterRef.current.contains(event.target)) {
        setChapterDropdown(false);
      }

      if (levelRef.current && !levelRef.current.contains(event.target)) {
        setLevelDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClick);
    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, []);

  // set data on state change

  React.useEffect(() => {
    if (curriculum && grade && subject && stream && chapter && level) {
      setQuestionData({
        ...questionData,
        step1: {
          curriculum,
          grade,
          subject,
          stream,
          chapter,
          level,
        },
      });
    }
  }, [curriculum, grade, subject, stream, chapter, level]);

  return (
    <div className="question_step1">
      <div className="question_input_group1 d-flex align-items-center">
        <div className="curriculums w-50 d-flex flex-column">
          <label>Curriculum</label>

          <div className="curriculums-dropdown" ref={curriculumRef}>
            <div
              className="selected d-flex justify-content-between align-items-center"
              onClick={() => setCurriculumDropdown(!curriculumDropdown)}
            >
              <span>
                {curriculum && curriculum.id
                  ? curriculum.curriculum_shortname
                  : "Select Curriculum"}
              </span>
              <ion-icon name="chevron-down-outline"></ion-icon>
            </div>

            <ul
              className={
                curriculumDropdown
                  ? "curriculum-items show"
                  : "curriculum-items"
              }
            >
              {data.getCurriculums.map((curriculum, index) => {
                return (
                  <li
                    key={index}
                    className="curriculum-item"
                    onClick={() => {
                      setCurriculum(curriculum);
                      setCurriculumDropdown(false);
                    }}
                  >
                    <span>{curriculum.curriculum_shortname}</span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        <div className="grades w-50 d-flex flex-column">
          <label>Grade</label>

          <div className="grades-dropdown" ref={gradeRef}>
            <div
              className="selected d-flex justify-content-between align-items-center"
              onClick={() => setGradeDropdown(!gradeDropdown)}
            >
              <span>
                {grade && grade.id ? grade.grade_info : "Select Grade"}
              </span>
              <ion-icon name="chevron-down-outline"></ion-icon>
            </div>

            <ul className={gradeDropdown ? "gradeItems show" : "gradeItems"}>
              {data.getGrades.map((grade, index) => {
                return (
                  <li
                    key={index}
                    className="gradeItem"
                    onClick={() => {
                      setGrade(grade);
                      setGradeDropdown(false);
                    }}
                  >
                    <span>{grade.grade_info}</span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>

      <div className="question_input_group2 d-flex align-items-center">
        <div className="subjects w-50 d-flex flex-column">
          <label>Subject</label>

          <div className="subjects-dropdown" ref={subjectRef}>
            <div
              className="selected d-flex justify-content-between align-items-center"
              onClick={() => setSubjectDropdown(!subjectDropdown)}
            >
              <span>
                {subject && subject.id
                  ? subject.subject_info
                  : "Select Subject"}
              </span>
              <ion-icon name="chevron-down-outline"></ion-icon>
            </div>

            <ul
              className={subjectDropdown ? "subjectItems show" : "subjectItems"}
            >
              {data.getSubjects.map((subject, index) => {
                return (
                  <li
                    key={index}
                    className="subjectItem"
                    onClick={() => {
                      setSubject(subject);
                      setSubjectDropdown(false);
                    }}
                  >
                    <span>{subject.subject_info}</span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        <div className="streams w-50 d-flex flex-column">
          <label>Stream</label>

          <div className="streams-dropdown" ref={streamRef}>
            <div
              className="selected d-flex justify-content-between align-items-center"
              onClick={() => setStreamDropdown(!streamDropdown)}
            >
              <span>
                {stream && stream.id ? stream.stream_info : "Select Stream"}
              </span>
              <ion-icon name="chevron-down-outline"></ion-icon>
            </div>

            <ul className={streamDropdown ? "streamItems show" : "streamItems"}>
              {data.getStreams.map((stream, index) => {
                return (
                  <li
                    key={index}
                    className="streamItem"
                    onClick={() => {
                      setStream(stream);
                      setStreamDropdown(false);
                    }}
                  >
                    <span>{stream.stream_info}</span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>

      <div className="question_input_group3 d-flex align-items-center">
        <div className="chapters w-50 d-flex flex-column">
          <label>Chapter</label>

          <div className="chapters-dropdown" ref={chapterRef}>
            <div
              className="selected d-flex justify-content-between align-items-center"
              onClick={() => setChapterDropdown(!chapterDropdown)}
            >
              <span>
                {chapter && chapter.id
                  ? chapter.chapter_name
                  : "Select Chapter"}
              </span>
              <ion-icon name="chevron-down-outline"></ion-icon>
            </div>

            <ul
              className={chapterDropdown ? "chapterItems show" : "chapterItems"}
            >
              {data.getChapters.map((chapter, index) => {
                return (
                  <li
                    key={index}
                    className="chapterItem"
                    onClick={() => {
                      setChapter(chapter);
                      setChapterDropdown(false);
                    }}
                  >
                    <span>{chapter.chapter_name}</span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        <div className="chapters w-50 d-flex flex-column">
          <label>Difficulties</label>

          <div className="streams-dropdown" ref={levelRef}>
            <div
              className="selected d-flex justify-content-between align-items-center"
              onClick={() => setLevelDropdown(!streamDropdown)}
            >
              <span>
                {level && level.id ? level.level_info : "Select Difficultie"}
              </span>
              <ion-icon name="chevron-down-outline"></ion-icon>
            </div>

            <ul className={levelDropdown ? "streamItems show" : "streamItems"}>
              {data.getLevels.map((level, index) => {
                return (
                  <li
                    key={index}
                    className="streamItem"
                    onClick={() => {
                      setLevel(level);
                      setLevelDropdown(false);
                    }}
                  >
                    <span>{level.level_info}</span>
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

export default Step1;
