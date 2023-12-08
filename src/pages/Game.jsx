import React, { useState } from "react";
import { useLoaderData, Link } from "react-router-dom";
import { CircularProgressbar } from 'react-circular-progressbar';
import ReactLoading from 'react-loading';
import { shuffle, htmlToText, sleep } from "../utils";
import 'react-circular-progressbar/dist/styles.css';

export async function loader({ request }) {
    const difficulty = new URL(request.url).searchParams.get("difficulty") 
   
    const res = difficulty 
        ? await fetch(`https://opentdb.com/api.php?amount=10&difficulty=${difficulty}&type=multiple`)
        : await fetch(`https://opentdb.com/api.php?amount=10&type=multiple`)
    if(!res.ok) {
        throw {
            message: "Failed to load Questions"
        }
    }
    const data = await res.json()

    //refactor data from api call
    const refactoredQuestions = data.results.map(question => ({
        questionText: htmlToText(question.question),
        answers: [
            {answerText: htmlToText(question.incorrect_answers[0]), isCorrect: false},
            {answerText: htmlToText(question.incorrect_answers[1]), isCorrect: false},
            {answerText: htmlToText(question.incorrect_answers[2]), isCorrect: false},
            {answerText: htmlToText(question.correct_answer), isCorrect: true},
        ]
    }))

    //shuffle answer
    const finalQuestions = refactoredQuestions.map(question => ({
        ...question,
        answers: shuffle(question.answers)
    }))

    //return the data
    return finalQuestions
}

export default function Game() {
    const [gameState, setGameState] = useState(true)
    const [questionState, setQuestionState] = useState(false)
    const [loadingProgress, setLoadingProgress] = useState(0)
    const [questionNumber, setQuestionNumber] = useState(0)
    const [score, setScore] = useState(0)
    const questions = useLoaderData()
    
    

    async function handleClick(isCorrect) {
        if (questionNumber < questions.length-1) {
            setQuestionState(true)
            await sleep(1500)
            setQuestionNumber(prevQNumber => prevQNumber + 1)
            setQuestionState(false)
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
                    <>  <div className="question--progress">
                            <CircularProgressbar value={questionNumber*10} text={`${questionNumber*10}%`} />
                        </div>
                        <div className="question--container">
                            <h4 className="question--text">{questions[questionNumber].questionText}</h4>
                            <div className="answer--container">
                                {
                                    questions[questionNumber].answers.map(answer => {
                                        return <button 
                                            onClick={() => handleClick(answer.isCorrect)} 
                                            className="answer--button"
                                            style={{
                                                border: "solid",
                                                borderRadius: "18px",
                                                borderColor: answer.isCorrect && questionState 
                                                    ? "#14FF00" 
                                                    : !answer.isCorrect && questionState 
                                                    ? "red"
                                                    : ""
                                            }}
                                            disabled={questionState}
                                        >
                                            {answer.answerText}
                                        </button>
                                    })
                                }
                            </div>
                        </div>
                        <div className="progress--bar">
                            {questionState && <ReactLoading color={"#5B1CAE"}  width={"5vw"} />}
                        </div>
                    </>
                ) : (
                        <>
                            <h4 className="big--text">{`You Scored ${score}/10`}</h4>
                            <Link to=".."><button className="button">Play Again</button></Link>
                        </>
                )

            }
        </div>
        
    )
}