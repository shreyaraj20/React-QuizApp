import React from "react";
import quizData from "./QuizData";
import Dialog from "material-ui/Dialog";
import AppBar from "material-ui/AppBar";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import "./Quiz.css";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import CardContent from "@material-ui/core/CardContent";

class Quiz extends React.Component {
  state = {
    currentQuestion: 0,
    myAnswer: null,
    options: [],
    score: 0,
    disabled: true,
    isEnd: false,
    count: 10,
    time: 10000
  };

  loadQuizData = () => {
    this.setState(() => {
      return {
        questions: quizData[this.state.currentQuestion].question,
        answer: quizData[this.state.currentQuestion].answer,
        options: quizData[this.state.currentQuestion].options
      };
    });
  };

  componentDidMount() {
    this.loadQuizData();
    this.myInterval = setInterval(() => {
      if (this.state.count === 0) {
        this.setState({ count: 10 });
      } else {
        this.setState(prevState => ({
          count: prevState.count - 1
        }));
      }
    }, 1000);
    this.interval = setInterval(this.nextQuestion, this.state.time);
  }

  nextQuestion = () => {
    const { myAnswer, answer, score } = this.state;
    if (myAnswer === answer) {
      this.setState({ score: score + 1 });
    }
    this.setState({
      currentQuestion: this.state.currentQuestion + 1,
      time: 10000
    });
  };

  nextQuestionHandler = () => {
    const { myAnswer, answer, score } = this.state;
    if (myAnswer === answer) {
      this.setState({ score: score + 1 });
    }
    this.setState({
      currentQuestion: this.state.currentQuestion + 1,
      count: 10,
      time: 10000
    });
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.state.currentQuestion === quizData.length - 1) {
      clearInterval(this.interval);
      setTimeout(this.finishHandler, 10000);
    }
    if (this.state.currentQuestion !== prevState.currentQuestion) {
      this.setState(() => {
        return {
          disabled: true,
          questions: quizData[this.state.currentQuestion].question,
          options: quizData[this.state.currentQuestion].options,
          answer: quizData[this.state.currentQuestion].answer
        };
      });
    }
  }
  checkAnswer = answer => {
    const { myAnswer } = this.state;
    if (myAnswer === answer) {
      this.setState({ myAnswer: answer, disabled: false });
    } else {
      this.setState({ myAnswer: answer, disabled: false });
    }
  };

  finishHandler = () => {
    if (this.state.currentQuestion === quizData.length - 1) {
      this.setState({
        isEnd: true
      });
    }
  };

  render() {
    const { options, myAnswer, currentQuestion, isEnd, count } = this.state;

    if (isEnd) {
      return (
        <Card
          variant="outlined"
          className="card"
          style={{ background: "black" }}
        >
          <CardContent>
            <Typography color="textSecondary" gutterBottom>
              <h1>
                Your Final score is {this.state.score} out of {quizData.length}{" "}
                points.
              </h1>
            </Typography>
          </CardContent>
        </Card>

        /*            
                <p>
                  The correct answer's for the questions was
                  <dl>
                    {quizData.map((item, index) => (
                      <dl key={index}>
                        <dt>{item.currentQuestion}</dt>
                        <dd>{item.answer} </dd>
                      </dl>
                    ))}
                  </dl>
                </p> */
      );
    } else {
      return (
        <MuiThemeProvider>
          <React.Fragment>
            <Dialog
              open="true"
              fullWidth="true"
              maxWidth="sm"
              className="dialog"
              style={{
                backgroundColor: "transparent"
              }}
            >
              <AppBar
                title={`Questions ${currentQuestion + 1}  out of ${
                  quizData.length
                } remaining Count-${count}`}
                style={{
                  backgroundColor: "#373836",
                  color: "red"
                }}
              />
              <div className="Quiz">
                <h3>{this.state.questions}</h3>

                {options.map((option, i) => (
                  <p
                    key={option.id}
                    className={`options ${
                      myAnswer === option ? "selected" : null
                    }`}
                    onClick={() => this.checkAnswer(option)}
                  >
                    <Grid container spacing={1}>
                      <Avatar
                        style={{
                          backgroundColor: "#373836",
                          color: "white",
                          marginRight: "30px"
                        }}
                      >
                        {i + 1}
                      </Avatar>
                      {option}
                    </Grid>
                  </p>
                ))}

                {currentQuestion < quizData.length - 1 && (
                  <button
                    className="button"
                    disabled={this.state.disabled}
                    onClick={this.nextQuestionHandler}
                  >
                    Next
                  </button>
                )}

                {/* //adding a finish button */}
                {currentQuestion === quizData.length - 1 && (
                  <button className="button" onClick={this.finishHandler}>
                    Finish
                  </button>
                )}
              </div>
            </Dialog>
          </React.Fragment>
        </MuiThemeProvider>
      );
    }
  }
}

export default Quiz;
