import React, { useState, useEffect } from "react"
import Question from "./components/Question.jsx"
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { nanoid } from "nanoid";
import "./style.css"

export default function App() {

const [difficulty, setDifficulty] = useState("Easy")
const [questions, setQuestions] = useState([])
const [game, setGame] = useState(false)
const [score, setScore] = useState(0)

//fetches questions using api call
const handleClick = async () => { 
    try {
        const data = await (
            await fetch(`https://opentdb.com/api.php?amount=10&difficulty=${difficulty.toLowerCase()}&type=multiple`)
        ).json()
        setQuestions(data.results)
        setGame(prevGame => true)
        window.scrollTo(0, 0);
    } catch (err) {
        console.log(err.message)
    }
}

function handleDifficulty(difficulty) {
    setDifficulty(difficulty)
}

const renderQuestions =  questions.map((question,index) => (
        <Question 
            key={nanoid()}
            id={nanoid()}
            questionText={question.question.replace(/&quot;/g, "\"").replace(/&#039;/g, "\'")} //string manipulation 
            ans1={question.incorrect_answers[0].replace(/&quot;/g, "\"").replace(/&#039;/g, "\'")}
            ans2={question.incorrect_answers[1].replace(/&quot;/g, "\"").replace(/&#039;/g, "\'")}
            ans3={question.incorrect_answers[2].replace(/&quot;/g, "\"").replace(/&#039;/g, "\'")}
            correctAns={question.correct_answer.replace(/&quot;/g, "\"").replace(/&#039;/g, "\'")}
            isClicked={false}
        />
    ))

console.log(score)

    return (
        <main> 
            { !game 

            ?
            <div className="title--page">
                <h1 className="app--title">QUIZ GAME</h1>
                <h1 className="app--title">{difficulty}</h1>
                <DropdownButton id="dropdown-basic-button" title="Choose difficulty" variant="dark" data-bs-theme="dark"> 
                    <Dropdown.Item onClick={() => handleDifficulty("Easy")}>Easy</Dropdown.Item>
                    <Dropdown.Item onClick={() => handleDifficulty("Medium")}>Medium</Dropdown.Item>
                    <Dropdown.Item onClick={() => handleDifficulty("Hard")}>Hard</Dropdown.Item>
                </DropdownButton>
                <button onClick={handleClick} className="start--button">Start Game</button>
            </div>

            :
            <div>
                {renderQuestions}
                {game && <button onClick={handleClick} className="restart--button">Play Again</button>}
            </div>
            
        
            }
            
        </main>
    )
}