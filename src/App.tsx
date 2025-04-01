import reactLogo from './assets/react.svg'
import './App.css'
import { Start } from './components/Start'
import { useQuestionsStore } from './store/question'
import { Game } from './components/Game'


function App() {

  const questions = useQuestionsStore(state => state.questions)
  console.log(questions)
  return (
    <main>
      <header className='flex items-center'>
        <img src={reactLogo} className="logo react" alt="React logo" />
        <h1>React Quiz</h1>
      </header>
      {questions.length === 0 && <Start/> }
      {questions.length > 0 &&  
        <>
          <p>{questions.length}</p>
          <Game />
        </> 
      }
    </main>
  )
}

export default App
