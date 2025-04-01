import { useQuestionsStore } from "../store/question"


export const Footer = () => {
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
      const reset = useQuestionsStore(state => state.reset)
  return (
    <footer className='mt-4'>
      <strong>{`✅ ${correct} correctas - ❌ ${incorrect} incorrectas - ❓ ${unanswered} sin responder`}</strong>
      <div className='mt-4'>
        <button onClick={() => reset()}>
          Resetear juego
        </button >
      </div>
    </footer>
  )
}