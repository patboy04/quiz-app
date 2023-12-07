import React, { useState } from "react";
import { useLoaderData } from "react-router-dom";
import { CircularProgressbar } from 'react-circular-progressbar';
import { shuffle, htmlToText } from "../utils";
import 'react-circular-progressbar/dist/styles.css';

export async function loader({ request }) {
    const res = await fetch(`https://opentdb.com/api.php?amount=10&type=multiple`)
    if(!res.ok) {
        throw {
            message: "Failed to load Questions"
        }
    }
    const data = await res.json()
    return data.results
}

export default function Game() {
    const [gameState, setGameState] = useState(true)
    const [questionNumber, setQuestionNumber] = useState(0)
    const [score, setScore] = useState(0)
    const questions = useLoaderData()
    
    //refactor data from api call
    const refactoredQuestions = questions.map(question => ({
        questionText: htmlToText(question.question),
        answers: [
            {answerText: htmlToText(question.incorrect_answers[0]), isCorrect: false},
            {answerText: htmlToText(question.incorrect_answers[1]), isCorrect: false},
            {answerText: htmlToText(question.incorrect_answers[2]), isCorrect: false},
            {answerText: htmlToText(question.correct_answer), isCorrect: true},
        ]
    }))

    //shuffle answers
    const finalQuestions = refactoredQuestions.map(question => ({
        ...question,
        answers: shuffle(question.answers)
    }))

    function handleClick(isCorrect) {
        if (questionNumber < finalQuestions.length-1) {
            setQuestionNumber(prevQNumber => prevQNumber + 1)
        } else {
            setGameState(false)
        }
         
        if(isCorrect) {
            setScore(prevScore => prevScore + 1)
        }
    }

    return (
        <div className="game--container">
            {
                gameState ? (
                    <>  
                        <div className="progress--bar">
                            <CircularProgressbar value={questionNumber*10} text={`${questionNumber*10}%`} />
                        </div>
                        <div className="question--container">
                            <h4 className="question--text">{finalQuestions[questionNumber].questionText}</h4>
                            <div className="answer--container">
                                {
                                    finalQuestions[questionNumber].answers.map(answer => {
                                        return <button 
                                            onClick={() => handleClick(answer.isCorrect)} 
                                            className="answer--button"
                                        >
                                            {answer.answerText}
                                        </button>
                                    })
                                }
                            </div>
                        </div>
                        
                    </>
                ) : <h1>GAME FINISH</h1>

            }
            
        </div>
        
    )
}