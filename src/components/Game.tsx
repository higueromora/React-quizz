import { useQuestionsStore } from "../store/question"
import { type Question as QuestionType } from "../types"
import SyntaxHighlighter from 'react-syntax-highlighter';
import { twilight } from 'react-syntax-highlighter/dist/esm/styles/prism';





const Question = ({info} : {info: QuestionType}) => {
    const selectAnswer = useQuestionsStore(state => state.selectAnswer)

    const createHandleClick = (answersIndex: number) => () => {
        selectAnswer(info.id, answersIndex)
    }

    const getBackgroundColor = (index:number) => {
        
    }

    return (
        <div className="bg-gray-800 text-black p-1.5 rounded-2xl">
            <h5 className="text-white">
                {info.question}
            </h5>

            <SyntaxHighlighter language="javascript" style={twilight} >
                {info.code}
            </SyntaxHighlighter>
            <ul className="bg-gray-700 text-white p-2 rounded ">
                {info.answers.map((answer, index) => (
                    <li onClick={createHandleClick(index)} key={index} className="hover:bg-gray-500 cursor-pointer p-2 rounded transition-colors ">
                    {answer}
                    </li>
                ))}
            </ul>

        </div>
    )
}

export const Game = () => {

    const questions = useQuestionsStore(state => state.questions)
    const currentQuestion = useQuestionsStore(state => state.currentQuestion)

    const questionInfo = questions[currentQuestion]


  return (
    <>
        <Question info={questionInfo} />
    </>
  )
}