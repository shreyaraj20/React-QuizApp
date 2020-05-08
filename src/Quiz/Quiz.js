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
    isEnd: false
  };

  loadQuizData = () => {
    // console.log(quizData[0].question)
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
  }

  nextQuestionHandler = () => {
    // console.log('test')
    const { myAnswer, answer, score } = this.state;
    if (myAnswer === answer) {
      this.setState({ score: score + 1 });
    }
    this.setState({
      currentQuestion: this.state.currentQuestion + 1
    });
    console.log(this.state.currentQuestion);
  };

  componentDidUpdate(prevProps, prevState) {
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
  //check answer

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
    const { options, myAnswer, currentQuestion, isEnd } = this.state;

    if (isEnd) {
      return (
        <div className="result">
          <Card variant="outlined" className="card">
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                <h1>
                  Your Final score is {this.state.score} out of{" "}
                  {quizData.length} points.
                </h1>
              </Typography>
            </CardContent>
          </Card>

          {/*            
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
                </p> */}
        </div>
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
                } remaining `}
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
                      myAnswer === option ? "selected" : "wrong"
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
                    style={{
                      backgroundColor: "#1d1d1f"
                    }}
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
