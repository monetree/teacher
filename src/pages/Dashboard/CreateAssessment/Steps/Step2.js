import React from 'react';
import AssessmentContext from '../../../../context/AssessmentContext';


const dummyQuestions = [
    {
        id: 1,
        title: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever.",
        difficulty: "Hard",
        duration: "30 min",
        options: [
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever.",
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever.",
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever.",
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever."
        ],
        answer: 3
    },
    {
        id: 2,
        title: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever.",
        difficulty: "Easy",
        duration: "10 min",
        options: [
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever.",
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever.",
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever.",
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever."
        ],
        answer: 2
    },
    {
        id: 3,
        title: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever.",
        difficulty: "Medium",
        duration: "20 min",
        options: [
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever.",
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever.",
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever.",
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever."
        ],
        answer: 1
    },
    {
        id: 4,
        title: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever.",
        difficulty: "Hard",
        duration: "30 min",
        options: [
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever.",
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever.",
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever.",
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever."
        ],
        answer: 3
    },
    {
        id: 5,
        title: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever.",
        difficulty: "Easy",
        duration: "10 min",
        options: [
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever.",
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever.",
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever.",
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever."
        ],
        answer: 3
    },
    {
        id: 6,
        title: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever.",
        difficulty: "Medium",
        duration: "20 min",
        options: [
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever.",
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever.",
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever.",
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever."
        ],
        answer: 2
    },
    {
        id: 7,
        title: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever.",
        difficulty: "Hard",
        duration: "30 min",
        options: [
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever.",
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever.",
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever.",
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever."
        ],
        answer: 3
    },
    {
        id: 8,
        title: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever.",
        difficulty: "Easy",
        duration: "10 min",
        options: [
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever.",
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever.",
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever.",
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever."
        ],
        answer: 0
    },
    {
        id: 9,
        title: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever.",
        difficulty: "Medium",
        duration: "20 min",
        options: [
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever.",
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever.",
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever.",
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever."
        ],
        answer: 1
    },
    {
        id: 10,
        title: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever.",
        difficulty: "Hard",
        duration: "30 min",
        options: [
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever.",
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever.",
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever.",
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever."
        ],
        answer: 2
    }
]


const Step2 = () => {

    const { assessmentData, setAssessmentData } = React.useContext(AssessmentContext);


    const [modal, setModal] = React.useState(false);
    const [selected, setSelected] = React.useState(1);
    const [assessments, setAssessments] = React.useState(assessmentData.step2 || []);

    const handleDetails = (id) => {
        setSelected(id);
        setModal(true);
    }

    const handleAddQuestion = (id) => {
        const newItem = dummyQuestions.find(item => item.id === id);
        setAssessments([...assessments, newItem]);

        setAssessmentData({
            ...assessmentData,
            step2: [...assessmentData.step2, newItem]
        })
        setModal(false);
    }

    return (
        <div className='select_questions w-100 d-flex gap-5'>
            <div className="question__bank bg-white w-50">
                <div className="question__bank__header">
                    <h4>Question Bank ({dummyQuestions.length})</h4>
                    <input type="text" placeholder='Search' />
                </div>

                <div className="bank__questions">
                    {
                        dummyQuestions.map(question => (
                            <div
                                className="question__item"
                                onClick={() => handleDetails(question.id)}
                                key={question.id}
                            >
                                <h5>{question.title}</h5>
                                <div className="question__item__info">
                                    <p>Difficulty: {question.difficulty}</p>
                                    <p>Duration: {question.duration}</p>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>


            <div className="assessment__question bg-white w-50">
                <div className="assessment__question__header">
                    <h4>Assessment Questions (4)</h4>
                    <p>Drag and drop question from question bank</p>
                </div>


                <div className="assessment__questions">
                    {
                        assessments.length > 0 ? (
                            assessments.map(question => (
                                <div
                                    className="question__item"
                                    key={question.id}
                                >
                                    <h5>{question.title}</h5>
                                    <div className="question__item__info">
                                        <p>Difficulty: {question.difficulty}</p>
                                        <p>Duration: {question.duration}</p>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="no-data">
                                <h4 className='text-center fw-bold text-secondary mt-5'>No Question Added Yet</h4>
                            </div>
                        )
                    }
                </div>
            </div>


            <div className={modal ? "details__modal show" : "details__modal"}>
                <div className="details__modal__content d-flex flex-column">
                    <button className="btn-close" onClick={() => { setModal(false); setSelected(0) }}>
                        <ion-icon name="close-outline"></ion-icon>
                    </button>

                    <div className="modal_info flex-grow-1">
                        <h4>Question</h4>
                        <p className='question_title'>
                            {selected !== 0 && dummyQuestions[selected - 1].title}
                        </p>

                        <h4 className='mb-4'>Options</h4>

                        <div className="modal_options">
                            {
                                selected !== 0 && dummyQuestions[selected - 1].options.map((option, index) => (
                                    <div
                                        className={
                                            dummyQuestions[selected - 1].answer === index + 1 ? "selected_option ans" : "selected_option"
                                        }
                                        key={index}
                                    >
                                        <p>
                                            Option {index + 1}{" "}
                                            {dummyQuestions[selected - 1].answer === index + 1
                                                ? ": Marked as Answer"
                                                : ""}
                                        </p>
                                        <h6>{option}</h6>
                                    </div>
                                ))
                            }
                        </div>
                    </div>


                    <div className="modal__button d-flex justify-content-between align-items-center">
                        <button className="btn-addAssessment" onClick={() => handleAddQuestion(selected)}>
                            Add To Assessment
                        </button>

                        <button className="btn-close2" onClick={() => { setModal(false); setSelected(0) }}>
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Step2;