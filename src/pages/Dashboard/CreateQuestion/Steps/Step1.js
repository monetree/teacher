import React from 'react';
import { curriculums } from '../../../../data';
import { grades } from '../../../../data';
import { subjects } from '../../../../data';
import { streams } from '../../../../data';
import { chapters } from '../../../../data';
import { useDispatch, useSelector } from "react-redux"
import { createQuestion1 } from '../../../../store/slices/questionSlice';


const Step1 = () => {

    // redux dispatch & selector
    const dispatch = useDispatch();
    const allData = useSelector(state => state.question.step1);

    // data states
    const [curriculum, setCurriculum] = React.useState(allData ? allData.curriculum : '');
    const [grade, setGrade] = React.useState(allData ? allData.grade : '');
    const [subject, setSubject] = React.useState(allData ? allData.subject : '');
    const [stream, setStream] = React.useState(allData ? allData.stream : '');
    const [chapter, setChapter] = React.useState(allData ? allData.chapter : '');


    // dropdown change handlers
    const [curriculumDropdown, setCurriculumDropdown] = React.useState(false);
    const [gradeDropdown, setGradeDropdown] = React.useState(false);
    const [subjectDropdown, setSubjectDropdown] = React.useState(false);
    const [streamDropdown, setStreamDropdown] = React.useState(false);
    const [chapterDropdown, setChapterDropdown] = React.useState(false);


    // data refs
    const curriculumRef = React.useRef();
    const gradeRef = React.useRef();
    const subjectRef = React.useRef();
    const streamRef = React.useRef();
    const chapterRef = React.useRef();


    // detect click outside of dropdown

    React.useEffect(() => {
        const handleClick = (event) => {
            if (curriculumRef.current && !curriculumRef.current.contains(event.target)) {
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
        }

        document.addEventListener("mousedown", handleClick);
        return () => {
            document.removeEventListener("mousedown", handleClick);
        };
    }, []);


    // set data on state change

    React.useEffect(() => {
        if (curriculum && grade && subject && stream && chapter) {
            dispatch(createQuestion1({
                curriculum,
                grade,
                subject,
                stream,
                chapter
            }));
        }
    }, [curriculum, grade, subject, stream, chapter]);



    return (
        <div className='question_step1'>
            <div className="question_input_group1 d-flex align-items-center">
                <div className="curriculums w-50 d-flex flex-column">
                    <label>Curriculum</label>

                    <div className="curriculums-dropdown" ref={curriculumRef}>
                        <div className="selected d-flex justify-content-between align-items-center" onClick={() => setCurriculumDropdown(!curriculumDropdown)}>
                            <span>
                                {
                                    allData ? allData.curriculum : curriculum ? curriculum : 'Select Curriculum'
                                }
                            </span>
                            <ion-icon name="chevron-down-outline"></ion-icon>
                        </div>

                        <ul className={curriculumDropdown ? "curriculum-items show" : "curriculum-items"}>
                            {
                                curriculums.map((curriculum, index) => {
                                    return (
                                        <li
                                            key={index}
                                            className="curriculum-item"
                                            onClick={() => {
                                                setCurriculum(curriculum.name);
                                                setCurriculumDropdown(false);
                                            }}
                                        >
                                            <span>{curriculum.name}</span>
                                        </li>
                                    )
                                })
                            }
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
                                {
                                    allData ? allData.grade : grade ? grade : 'Select Grade'
                                }
                            </span>
                            <ion-icon name="chevron-down-outline"></ion-icon>
                        </div>

                        <ul className={gradeDropdown ? "gradeItems show" : "gradeItems"}>
                            {
                                grades.map((grade, index) => {
                                    return (
                                        <li
                                            key={index}
                                            className="gradeItem"
                                            onClick={() => {
                                                setGrade(grade.name);
                                                setGradeDropdown(false);
                                            }}
                                        >
                                            <span>{grade.name}</span>
                                        </li>
                                    )
                                })
                            }
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
                                {
                                    allData ? allData.subject : subject ? subject : 'Select Subject'
                                }
                            </span>
                            <ion-icon name="chevron-down-outline"></ion-icon>
                        </div>

                        <ul className={subjectDropdown ? "subjectItems show" : "subjectItems"}>
                            {
                                subjects.map((subject, index) => {
                                    return (
                                        <li
                                            key={index}
                                            className="subjectItem"
                                            onClick={() => {
                                                setSubject(subject.name);
                                                setSubjectDropdown(false);
                                            }}
                                        >
                                            <span>{subject.name}</span>
                                        </li>
                                    )
                                })
                            }
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
                                {
                                    allData ? allData.stream : stream ? stream : 'Select Stream'
                                }
                            </span>
                            <ion-icon name="chevron-down-outline"></ion-icon>
                        </div>

                        <ul className={streamDropdown ? "streamItems show" : "streamItems"}>
                            {
                                streams.map((stream, index) => {
                                    return (
                                        <li
                                            key={index}
                                            className="streamItem"
                                            onClick={() => {
                                                setStream(stream.name);
                                                setStreamDropdown(false);
                                            }}
                                        >
                                            <span>{stream.name}</span>
                                        </li>
                                    )
                                })
                            }
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
                                {
                                    allData ? allData.chapter : chapter ? chapter : 'Select Chapter'
                                }
                            </span>
                            <ion-icon name="chevron-down-outline"></ion-icon>
                        </div>

                        <ul className={chapterDropdown ? "chapterItems show" : "chapterItems"}>
                            {
                                chapters.map((chapter, index) => {
                                    return (
                                        <li
                                            key={index}
                                            className="chapterItem"
                                            onClick={() => {
                                                setChapter(chapter.name);
                                                setChapterDropdown(false);
                                            }}
                                        >
                                            <span>{chapter.name}</span>
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    </div>
                </div>

                <div className="w-50 d-flex flex-column"></div>
            </div>
        </div >
    );
};

export default Step1;