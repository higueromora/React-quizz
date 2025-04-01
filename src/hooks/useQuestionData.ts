import { useQuestionsStore } from "../store/question" 

export const useQuestionsData = () => {
  const questions = useQuestionsStore(state => state.questions)

  let correct = 0
  let incorrect = 0
  let unanswered = 0

  questions.forEach(question => {
    const { useSelectedAnswer, correctAnswer } = question
    if (useSelectedAnswer == null) unanswered++
    else if (useSelectedAnswer === correctAnswer) correct++
    else incorrect++
  })

  return { correct, incorrect, unanswered }
}