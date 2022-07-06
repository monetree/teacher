import React from 'react';
import AssessmentContext from '../../../../context/AssessmentContext';

const Step3 = ({ goto }) => {

    const { assessmentData } = React.useContext(AssessmentContext);


    return (
        <div className='preview w-100 d-flex flex-column gap-4'>
            <div className="qst__info1 bg-white d-flex gap-5">
                <div className="info__data flex-grow-1 d-flex">
                    <div className="left w-50">
                        <div className="data_cr">
                            <p>Curriculum</p>
                            <h5>{assessmentData.step1.curriculum.name}</h5>
                        </div>
                        <div className="data_sj">
                            <p>Subject</p>
                            <h5>{assessmentData.step1.subject.name}</h5>
                        </div>
                    </div>

                    <div className="right w-50">
                        <div className="data_gr">
                            <p>Grade</p>
                            <h5>{assessmentData.step1.grade.name}</h5>
                        </div>
                        <div className="data_str">
                            <p>Stream</p>
                            <h5>{assessmentData.step1.chapter.name}</h5>
                        </div>
                    </div>
                </div>
                <div className="edit_step ms-5">
                    <button className="btn-edit" onClick={() => goto(0)}>
                        Edit
                    </button>
                </div>
            </div>


            <div className="assessQuestions bg-white">
                <div className="assesQuestions__header d-flex justify-content-between align-items-center mb-4">
                    <h5 className='fw-bold text-secondary'>
                        Questions ({assessmentData.step2.length})
                    </h5>
                    <h5 className='fw-bold text-secondary'>
                        Duration: {
                            assessmentData.step2.map(question => parseInt(question.duration.split(' ')[0])).reduce((a, b) => a + b, 0)
                        } Mins
                    </h5>
                </div>

                <div className="assessQuestions__body">
                    {
                        assessmentData.step2.map((question) => (
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
                    }
                </div>
            </div>
        </div>
    );
};

export default Step3;