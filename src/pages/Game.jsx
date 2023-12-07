import React, { useState } from "react";
import { useLoaderData } from "react-router-dom";
import { shuffle, htmlToText } from "../utils";

export async function loader({ request }) {
    const res = await fetch(`https://opentdb.com/api.php?amount=10&type=multiple`)
    if(!res.ok) {
        throw {
            message: "failed to load questions"
        }
    }
    const data = await res.json()
    return data.results
}

export default function Game() {
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
            console.log("finish")
        }
         
        if(isCorrect) {
            setScore(prevScore => prevScore + 1)
        }
    }

    return (
        <div>
            <h4>{finalQuestions[questionNumber].questionText}</h4>
            <div>
                {
                    finalQuestions[questionNumber].answers.map(answer => {
                        return <button onClick={() => handleClick(answer.isCorrect)}>{answer.answerText}</button>
                    })
                }
            </div>
            <h1>{score}</h1>
        </div>
    )
}