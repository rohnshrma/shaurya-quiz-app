import React, { useReducer } from "react";
import { questions } from "../data/questions";

const quizReducer = (state, action) => {
  switch (action.type) {
    case "SUBMIT_ANSWER":
      const isCorrect =
        action.payload === questions[state.currentQuestionIndex].correctAnswer;
      return {
        ...state,
        score: isCorrect ? state.score + 1 : state.score,
        currentQuestionIndex: state.currentQuestionIndex + 1,
        showResults: state.currentQuestionIndex + 1 >= questions.length,
      };
    case "RESTART_QUIZ":
      return initialState;
    default:
      return state;
  }
};
const initialState = {
  currentQuestionIndex: 0,
  score: 0,
  showResults: false,
};

const QuizApp = () => {
  const [state, dispatch] = useReducer(quizReducer, initialState);

  if (state.showResults) {
    return (
      <div className="quiz-container container">
        <h2>Quiz Completed!</h2>
        <p>
          Your Score : {state.score} / {questions.length}
        </p>
        <button
          onClick={() => {
            dispatch({ type: "RESTART_QUIZ" });
          }}
        >
          Restart Quiz
        </button>
      </div>
    );
  }

  const currentQuestion = questions[state.currentQuestionIndex];

  const handleAnswerClick = (selectedOption) => {
    dispatch({ type: "SUBMIT_ANSWER", payload: selectedOption });
  };

  return (
    <div className="quiz-container">
      <h2>
        Question {state.currentQuestionIndex + 1} of {questions.length}
      </h2>
      <p>{currentQuestion.question}</p>
      <div className="options">
        {currentQuestion.options.map((option) => {
          return (
            <button
              key={option}
              onClick={() => {
                handleAnswerClick(option);
              }}
            >
              {option}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default QuizApp;
