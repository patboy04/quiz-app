import React, { useEffect, useState } from "react"

export default function Question(props) {

  const [isClicked, setIsClicked] = useState(props.isClicked)
  const [answeredCorrectly, setAnsweredCorrectly] = useState(false)

  let answers = [props.ans1, props.ans2, props.ans3, props.correctAns]
  
  const shuffle = (array) => { 
    for (let i = array.length - 1; i > 0; i--) { 
      const j = Math.floor(Math.random() * (i + 1)); 
      [array[i], array[j]] = [array[j], array[i]]; 
    } 
    return array; 
  }; 

  useEffect(() => {
    answers = shuffle(answers) 
  }, [])

  function handleClick(answer) {
    if(answer === props.correctAns && !isClicked) {
      setAnsweredCorrectly(true)
      setIsClicked(prevClicked => !prevClicked)

    } else if(answer !== props.correctAns && !isClicked) {
      setAnsweredCorrectly(false)
      setIsClicked(prevClicked => !prevClicked)
    }
  }

  const styles = {
    backgroundColor: 
      isClicked && answeredCorrectly 
        ? "#59E391" 
        : isClicked && !answeredCorrectly
        ? "red"
        : ""
  }
  
  const renderAnswers = answers.map(answer => (
    <>
      <button className="question--answerText" style={styles} onClick={() => handleClick(answer)}>{answer}</button>
    </>
  ))

  return (
      <div className="question--component">
        <h1 className="question--text">{props.questionText}</h1>
        <div className="question--answerContainer">
          {renderAnswers}
        </div>
      </div>
  )
}

//TODO create [] state to store answers ()
//