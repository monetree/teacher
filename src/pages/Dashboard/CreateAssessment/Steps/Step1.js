import React from 'react';
import { curriculums, chapters, grades, subjects } from '../../../../data';
import AssessmentContext from '../../../../context/AssessmentContext';

const Step1 = () => {

    // react context api
    const { assessmentData, setAssessmentData } = React.useContext(AssessmentContext);


    // data states
    const [curriculum, setCurriculum] = React.useState(assessmentData.step1 ? assessmentData.step1.curriculum : "");
    const [grade, setGrade] = React.useState(assessmentData.step1 ? assessmentData.step1.grade : "");
    const [subject, setSubject] = React.useState(assessmentData.step1 ? assessmentData.step1.subject : "");
    const [chapter, setChapter] = React.useState(assessmentData.step1 ? assessmentData.step1.chapter : "");


    // dropdown change handlers
    const [curriculumDropdown, setCurriculumDropdown] = React.useState(false);
    const [gradeDropdown, setGradeDropdown] = React.useState(false);
    const [subjectDropdown, setSubjectDropdown] = React.useState(false);
    const [chapterDropdown, setChapterDropdown] = React.useState(false);


    // data refs
    const curriculumRef = React.useRef();
    const gradeRef = React.useRef();
    const subjectRef = React.useRef();
    const chapterRef = React.useRef();


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
            if (chapterRef.current && !chapterRef.current.contains(event.target)) {
                setChapterDropdown(false);
            }
        };

        document.addEventListener("mousedown", handleClick);
        return () => {
            document.removeEventListener("mousedown", handleClick);
        };
    }, []);


    // set data on state change

    React.useEffect(() => {
        if (curriculum && grade && subject && chapter) {
            setAssessmentData({
                ...assessmentData,
                step1: {
                    curriculum,
                    grade,
                    subject,
                    chapter,
                }
            });
        }
    }, [curriculum, grade, subject, chapter]);


    return (
        <div className='question_step1'>
            <div className="question_input_group1 d-flex align-items-center">
                <div className="curriculums w-50 d-flex flex-column">
                    <label>Curriculum</label>

                    <div className="curriculums-dropdown" ref={curriculumRef}>
                        <div
                            className="selected d-flex justify-content-between align-items-center"
                            onClick={() => setCurriculumDropdown(!curriculumDropdown)}
                        >
                            <span>
                                {curriculum ? curriculum.name : "Select Curriculum"}
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
                            {curriculums.map((curriculum, index) => {
                                return (
                                    <li
                                        key={index}
                                        className="curriculum-item"
                                        onClick={() => {
                                            setCurriculum(curriculum);
                                            setCurriculumDropdown(false);
                                        }}
                                    >
                                        <span>{curriculum.name}</span>
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
                                {grade ? grade.name : "Select Grade"}
                            </span>
                            <ion-icon name="chevron-down-outline"></ion-icon>
                        </div>

                        <ul className={gradeDropdown ? "gradeItems show" : "gradeItems"}>
                            {grades.map((grade, index) => {
                                return (
                                    <li
                                        key={index}
                                        className="gradeItem"
                                        onClick={() => {
                                            setGrade(grade);
                                            setGradeDropdown(false);
                                        }}
                                    >
                                        <span>{grade.name}</span>
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
                                {subject ? subject.name : "Select Subject"}
                            </span>
                            <ion-icon name="chevron-down-outline"></ion-icon>
                        </div>

                        <ul
                            className={subjectDropdown ? "subjectItems show" : "subjectItems"}
                        >
                            {subjects.map((subject, index) => {
                                return (
                                    <li
                                        key={index}
                                        className="subjectItem"
                                        onClick={() => {
                                            setSubject(subject);
                                            setSubjectDropdown(false);
                                        }}
                                    >
                                        <span>{subject.name}</span>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                </div>

                <div className="chapters w-50 d-flex flex-column">
                    <label>Chapter</label>

                    <div className="chapters-dropdown" ref={chapterRef}>
                        <div
                            className="selected d-flex justify-content-between align-items-center"
                            onClick={() => setChapterDropdown(!chapterDropdown)}
                        >
                            <span>
                                {chapter ? chapter.name : "Select Chapter"}
                            </span>
                            <ion-icon name="chevron-down-outline"></ion-icon>
                        </div>

                        <ul
                            className={chapterDropdown ? "chapterItems show" : "chapterItems"}
                        >
                            {chapters.map((chapter, index) => {
                                return (
                                    <li
                                        key={index}
                                        className="chapterItem"
                                        onClick={() => {
                                            setChapter(chapter);
                                            setChapterDropdown(false);
                                        }}
                                    >
                                        <span>{chapter.name}</span>
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