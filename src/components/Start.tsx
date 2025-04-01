import { useQuestionsStore } from "../store/question"




const LIMIT_QUESTION = 10

export const Start = () => {
  const fetchQuestions = useQuestionsStore(state => state.fetchQuestions)

  const handleClick = () => {
    fetchQuestions(LIMIT_QUESTION)
  }
  return (
    <button onClick={handleClick} >
        Empezar
    </button>
  )
}
