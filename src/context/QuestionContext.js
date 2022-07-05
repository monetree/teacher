import { createContext, useState } from "react"


const QuestionContext = createContext()


export const QuestionProvider = ({ children }) => {

    const [question, setQuestion] = useState({
        step1: null,
        step2: null,
        step3: null,
    });

    const contextData = {
        questionData: question,
        setQuestionData: setQuestion,
    };

    return (
        <QuestionContext.Provider value={contextData}>
            {children}
        </QuestionContext.Provider>
    )
}


export default QuestionContext;