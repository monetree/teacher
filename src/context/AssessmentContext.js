import { createContext, useState } from "react"


const AssessmentContext = createContext()


export const AssessmentProvider = ({ children }) => {

    const [assessment, setAssessment] = useState({
        step1: null,
        step2: [],
    });

    const contextData = {
        assessmentData: assessment,
        setAssessmentData: setAssessment,
    };

    return (
        <AssessmentContext.Provider value={contextData}>
            {children}
        </AssessmentContext.Provider>
    )
}


export default AssessmentContext;