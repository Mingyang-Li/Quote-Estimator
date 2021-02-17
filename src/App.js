import { useState } from "react";
import theme from "./theme";
import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles";
import QuestionPage from "./Pages/QuestionPage";
import ResponsesPage from "./Pages/ResponsesPage";
import QuestionData from "./Components/QuestionPageContents/QuestionData";

const App = () => {
  const clickedCalculateCost = "none";
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selectionType, setSelectionType] = useState(
    QuestionData[questionIndex].selectionType
  );
  const [allResponses, setAllResponses] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  const nextQuestion = () => {
    if (questionIndex < QuestionData.length) {
      setQuestionIndex(questionIndex + 1);
    }
  };

  const prevQuestion = () => {
    if (questionIndex > 0) {
      setQuestionIndex(questionIndex - 1);
    }
  };

  switch (clickedCalculateCost) {
    case false:
      return (
        <MuiThemeProvider theme={theme}>
          <QuestionPage
            questionIndex={questionIndex}
            selectionType={selectionType}
            nextQuestion={nextQuestion}
            prevQuestion={prevQuestion}
          />
        </MuiThemeProvider>
      );
    case true:
      return (
        <MuiThemeProvider theme={theme}>
          <ResponsesPage />
        </MuiThemeProvider>
      );
  }
};

export default App;
