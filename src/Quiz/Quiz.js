import React, { Component } from "react";
import QuizData from "./QuizData";

class Quiz extends Component {
  state = {
    userAnswer: null,
    currentQuestion: 0,
    options: []
  };

  loadQuiz = () => {
    const { currentQuestion } = this.state;
    this.setState(() => {
      return {
        questions: QuizData[currentQuestion].question,
        options: QuizData[currentQuestion].options,
        answer: QuizData[currentQuestion].userAnswer,
        quizEnd: false,
        score: 0,
        disabled: true
      };
    });
  };

  componentDidMount() {
    this.loadQuiz();
  }

  nextQuestionHandler = () => {
    const { userAnswer, answers, score } = this.state;
    this.setState({
      currentQuestion: this.state.currentQuestion + 1
    });
    console.log(this.state.currentQuestion);

    if (userAnswer === answers) {
      this.setState({
        score: score + 1
      });
    }
  };

  componentDidUpdate(prevProps, prevState) {
    const { currentQuestion } = this.state;
    if (this.state.currentQuestion !== prevState.currentQuestion) {
      this.setState(() => {
        return {
          disabled: true,
          questions: QuizData[currentQuestion].question,
          options: QuizData[currentQuestion].options,
          answer: QuizData[currentQuestion].userAnswer
        };
      });
    }
  }

  checkAnswer = answer => {
    this.setState({
      userAnswer: answer,
      disabled: false
    });
  };

  finishHandler = () => {
    if (this.state.currentQuestion === QuizData.length - 1) {
      this.setState({
        quizEnd: true
      });
    }
  };
  render() {
    const {
      questions,
      options,
      currentQuestion,
      userAnswer,
      quizEnd
    } = this.state;

    if (quizEnd) {
      return (
        <div>
          <h2>You score is {this.state.score} points. </h2>
          <p>The correct Answer's for he Questions was:</p>
          <ul>
            {QuizData.map((item, index) => (
              <li className="ui floating message options" key={index}>
                {item.answer}
              </li>
            ))}
          </ul>
        </div>
      );
    }
    return (
      <div className="App">
        <h2>{questions}</h2>
        <h6>
          <span>{`questions ${currentQuestion} out of ${QuizData.length -
            1}`}</span>
        </h6>
        {options.map(option => (
          <p
            key={option.id}
            className={`ui floating messgage options ${
              userAnswer === option ? "selected" : null
            }`}
            onClick={() => this.nextQuestionHandler}
          >
            {option}
          </p>
        ))}
        {currentQuestion < QuizData.length - 1 && (
          <button
            disabled={this.state.disabled}
            onClick={this.nextQuestionHandler}
          >
            Next Question
          </button>
        )}
        {currentQuestion === QuizData.length - 1 && (
          <button onClick={this.finishHandler}>Finish</button>
        )}
      </div>
    );
  }
}
export default Quiz;
