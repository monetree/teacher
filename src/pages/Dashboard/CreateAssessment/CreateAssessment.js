import React from 'react';
import AssessmentContext from '../../../context/AssessmentContext';
import Step1 from './Steps/Step1';
import Step2 from './Steps/Step2';
import './CreateAssessment.css'
import Step3 from './Steps/Step3';
import Step4 from './Steps/Step4';



const steps = [
    {
        title: "Start",
    },
    {
        title: "Choose Question",
    },
    {
        title: "Preview",
    },
    {
        title: "Done",
    },
];


const CreateAssessment = () => {

    const { assessmentData, setAssessmentData } = React.useContext(AssessmentContext);

    const [currentStep, setCurrentStep] = React.useState(0);


    const stepValidator = () => {
        if (currentStep === 0) {
            if (assessmentData.step1) {
                setCurrentStep(currentStep + 1);
            }
        }
        if (currentStep === 1) {
            if (assessmentData.step2) {
                setCurrentStep(currentStep + 1);
            }
        }
    }


    const handleSubmit = () => {
        const data = {
            ...assessmentData.step1,
            questions: [...assessmentData.step2]
        }
        console.log(data);

        setAssessmentData({
            step1: null,
            step2: null,
        });
        setCurrentStep(currentStep + 1);
    }

    return (
        <div className='createAssessment'>
            <div className="create__steps">
                {
                    steps.map((step, index) => {
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
                    })
                }
            </div>


            {/*---------------------- this is step content ----------------------*/}


            <div className="step__content">
                {
                    currentStep === 0 && <Step1 />
                }
                {
                    currentStep === 1 && <Step2 />
                }
                {
                    currentStep === 2 && <Step3 goto={setCurrentStep} />
                }
                {
                    currentStep === 3 && <Step4 goto={setCurrentStep} />
                }
            </div>


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
                            (currentStep === 0 && !assessmentData.step1) ||
                            (currentStep === 1 && !(assessmentData.step2.length > 0))
                        }
                    >
                        {currentStep === 1
                            ? "Next: Preview"
                            : currentStep === 2
                                ? "Submit"
                                : `Next: ${steps[currentStep + 1]?.title}`}
                    </button>
                )}
            </div>
        </div>
    );
};

export default CreateAssessment;