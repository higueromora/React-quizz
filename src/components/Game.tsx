import { useQuestionsStore } from "../store/question"
import { type Question as QuestionType } from "../types"
import SyntaxHighlighter from 'react-syntax-highlighter';
import { twilight } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Footer } from "./Footer";

const getBackgroundColor = (info: QuestionType, index: number) => {
    const {userSelectedAnswer, correctAnswer}  = info
    if (userSelectedAnswer == null) return 'transparent'
    if(index !== correctAnswer && index !== userSelectedAnswer) return 'transparent'
    if(index === correctAnswer) return 'bg-green-500'
    if(index === userSelectedAnswer) return 'bg-red-500'
    return 'transparent'
}

const Question = ({ info }: { info: QuestionType }) => {
    const selectAnswer = useQuestionsStore(state => state.selectAnswer)
    const answeredQuestions = useQuestionsStore(state => state.answeredQuestions)
    const setAnsweredQuestion = useQuestionsStore(state => state.setAnsweredQuestion)

    const createHandleClick = (answersIndex: number) => () => {
        if (!answeredQuestions.includes(info.id)) {
            selectAnswer(info.id, answersIndex)
            setAnsweredQuestion(info.id)
        }
    }

    return (
        <div className="bg-gray-800 text-black p-1.5 rounded-2xl">
            <h5 className="text-white">
                {info.question}
            </h5>

            <SyntaxHighlighter language="javascript" style={twilight} >
                {info.code}
            </SyntaxHighlighter>

            <ul className="bg-gray-700 text-white p-2 rounded">
                {info.answers.map((answer, index) => (
                    <li 
                        onClick={createHandleClick(index)} 
                        key={index} 
                        className={`p-2 rounded transition-colors ${getBackgroundColor(info, index)} 
                            ${answeredQuestions.includes(info.id) ? 'cursor-not-allowed pointer-events-none' : 'hover:bg-gray-500 cursor-pointer'}`}
                    >
                        {answer}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export const Game = () => {

    const questions = useQuestionsStore(state => state.questions)
    const currentQuestion = useQuestionsStore(state => state.currentQuestion)
    const questionInfo = questions[currentQuestion]
    const goNextQuestion = useQuestionsStore(state => state.goNextQuestion)
    const goPreviousQuestion = useQuestionsStore(state => state.goPreviousQuestion)

  return (
    <>
        <Question info={questionInfo} />
        <div className="flex justify-center gap-6 mt-2">
            <button onClick={goPreviousQuestion} >
                anterior
            </button>
            <button onClick={goNextQuestion}>
                siguiente
            </button>
        </div>
        <Footer/>
    </>
  )
}