import { create } from 'zustand'
import { Question } from '../types'
import conffeti from 'canvas-confetti'
import { persist } from 'zustand/middleware'

interface State {
    questions: Question[]
    currentQuestion: number,
    fetchQuestions: (limit: number) => Promise<void>
    selectAnswer: (questionId: number, answersIndex: number) => void
    goNextQuestion: () => void
    goPreviousQuestion: () => void
    reset: () => void
    answeredQuestions: number[]
    setAnsweredQuestion: (id:number) => void
}


export const useQuestionsStore = create<State>()(persist((set, get) => {
    return {
        questions: [],
        currentQuestion: 0,
        answeredQuestions: [],
        fetchQuestions: async (limit: number) => {
            const res = await fetch('/data.json')
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
            if(isCorrectUserAnswer) conffeti()
            newQuestion[questionIndex] = {
                ...questionInfo,
                isCorrectUserAnswer,
                userSelectedAnswer: answersIndex
            }

            set({questions: newQuestion})
            
        },
        goNextQuestion: () => {
            const { currentQuestion, questions } = get()
            const nextQuestion = currentQuestion + 1

            if (nextQuestion < questions.length) {
                set({ currentQuestion: nextQuestion })
            }
        },
        goPreviousQuestion: () => {
            const { currentQuestion } = get()
            const previousQuestion = currentQuestion - 1
      
            if (previousQuestion >= 0) {
              set({ currentQuestion: previousQuestion })
            }
          },
        reset: () => {
            set({ currentQuestion: 0, questions: [], answeredQuestions: [] })
            localStorage.removeItem('questions')
        },
        setAnsweredQuestion: (id: number) => set((state) => ({
            answeredQuestions: [...state.answeredQuestions, id]
        }))
    }
}, {
    name: 'questions',
}))