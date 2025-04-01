import { create } from 'zustand'
import { Question } from '../types'

interface State {
    questions: Question[]
    currentQuestion: number,
    fetchQuestions: (limit: number) => Promise<void>
    selectAnswer: (questionId: number, answersIndex: number) => void
}


export const useQuestionsStore = create<State>((set, get) => {
    return {
        questions: [],
        currentQuestion: 0,
        fetchQuestions: async (limit: number) => {
            const res = await fetch('http://localhost:5173/data.json')
            const json = await res.json()
            
            const questions = json.sort(() => { return Math.random() - 0.5 }).slice(0 , limit)
            set({questions})
        },
        selectAnswer: (questionId: number, answersIndex: number) => {
            const {questions} = get()

            const newQuestion = structuredClone(questions)
            const questionIndex = newQuestion.findIndex(q => q.id === questionId)
            const questionInfo = newQuestion[questionIndex]
            const isCorrectUserAnswer = questionInfo.correctAnswer === answersIndex

            newQuestion[questionIndex] = {
                ...questionInfo,
                isCorrectUserAnswer,
                useSelectedAnswer: answersIndex
            }

            set({questions: newQuestion})
            
        }
    }
})
