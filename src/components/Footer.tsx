import { useQuestionsData } from "../hooks/useQuestionData"
import { useQuestionsStore } from "../store/question"


export const Footer = () => {
  const { correct, incorrect, unanswered } = useQuestionsData()
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