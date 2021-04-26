import React, {useState} from 'react';
import {fetchQuizQuestions} from './API'

//components
import QuestionCard from './components/QuestionCard'
//types
import {QuestionsState, Difficulty} from './API'

type AnswerObject = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
}

const TOTAL_QUESTIONS = 10

const App = () => {

  const [loading, setLoading] = useState(false)
  const [questions, setQuestions] = useState<QuestionsState[]>([])
  const [number, setNumber] = useState(0)
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([])
  const [score, setScore] = useState(0)
  const [gameOver, setGameOver] = useState(true)

  // console.log(questions)

  const startTrivia = async () => {
    setLoading(true)
    setGameOver(false)

    // grabs new questions
    const newQuestions = await fetchQuizQuestions(TOTAL_QUESTIONS, Difficulty.EASY)

    // resets game
    setQuestions(newQuestions)
    setScore(0)
    setUserAnswers([])
    setNumber(0)
    // will let the questions go through
    setLoading(false)
  }

  const checkAnswer = (e: any) => {
    if (!gameOver) {
      // User's answer
      const answer = e.currentTarget.value

      // Check answer against correct answer
      const correct = questions[number].correct_answer === answer

      // Add score if answer is correct
      if (correct) setScore((prev) => prev + 1)

      // Save the answer in the answerObject
      const answerObject = {
        question: questions[number].question, 
        answer, 
        correct, 
        correctAnswer: questions[number].correct_answer
      };
      setUserAnswers((prev) => [...prev, answerObject])
    }
  }

  const nextQuestion = () => {
    // move to next question
    const nextQ = number + 1

    if (nextQ === TOTAL_QUESTIONS) {
      setGameOver(true)
    } else {
      setNumber(nextQ)
    }
  }


  return (
    <div className="App">
      <h1>QUIZ</h1>
      {gameOver || userAnswers.length === TOTAL_QUESTIONS ? (
        <button className="start" onClick={startTrivia}>
          Start
        </button>
      ) : null}

      {/* show score and loading questions */}
      {!gameOver ? <p className="score">Score: {score}</p> : null }
      {loading ? <p>Loading Questions ...</p> : null}

      {/* show answers */}
      {!loading && !gameOver && (
        <QuestionCard questionNum={number + 1} totalQuestions={TOTAL_QUESTIONS}
          question={questions[number].question} answers={questions[number].answers}
          userAnswer={userAnswers ? userAnswers[number] : undefined} callback={checkAnswer} />
      )}

      {/* show next button */}
      {!gameOver && !loading && userAnswers.length === number + 1 && number !== TOTAL_QUESTIONS - 1 ? (
        <button className='next' onClick={nextQuestion}>
          Next Question
        </button>
      ) : null }
    </div>
  );
}

export default App;
