import React, { Component, useState } from 'react'
import './Quiz.css'
import QuizQuestion from '../core/QuizQuestion';
import QuizCore from '../core/QuizCore';

interface QuizState {
  question: QuizQuestion | null
  selectedAnswer: string | null
  score: number
}

const quiz = new QuizCore();

const Quiz: React.FC = () => {
  const initialQuestions: QuizQuestion | null = quiz.getCurrentQuestion();
  const [state, setState] = useState<QuizState>({
    question: initialQuestions,
    selectedAnswer: null,  // Initialize the selected answer.
    score: 0,  // Initialize the score.
  });

  const handleOptionSelect = (option: string): void => {
    setState((prevState) => ({ ...prevState, selectedAnswer: option }));
  }


  const handleButtonClick = (): void => {
    // Task3: Implement the logic for button click, such as moving to the next question.
    if(selectedAnswer === null) return;
    quiz.answerQuestion(selectedAnswer);
    quiz.nextQuestion();
    console.log(quiz.getIndex());
    setState(() => ({selectedAnswer: null, question: quiz.getCurrentQuestion(), score: quiz.getScore()}));
  } 

  const { question, selectedAnswer, score } = state;
  const currentQuestion = question;

  if (!currentQuestion) {
    return (
      <div>
        <h2>Quiz Completed</h2>
        <p>Final Score: {score} out of {quiz.getQuestionLength()}</p>
      </div>
    );
  }

  return (
    <div>
      <h2>Quiz Question:</h2>
      <p>{currentQuestion.question}</p>
    
      <h3>Answer Options:</h3>
      <ul>
        {currentQuestion.options.map((option) => (
          <li
            key={option}
            onClick={() => handleOptionSelect(option)}
            className={selectedAnswer === option ? 'selected' : ''}
          >
            {option}
          </li>
        ))}
      </ul>

      <h3>Selected Answer:</h3>
      <p>{selectedAnswer ?? 'No answer selected'}</p>

      <button onClick={() => handleButtonClick()}>{quiz.hasNextQuestion() === false ? "Submit" : "Next Question"}</button>
    </div>
  );
};

export default Quiz;