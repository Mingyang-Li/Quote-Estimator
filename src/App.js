import React, { useContext, useState } from 'react';
import GlobalContext from "./Contexts/GlobalContext"
import theme from "./theme";
import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles";
import QuestionPage from "./Pages/QuestionPage";
import ResponsesPage from "./Pages/ResponsesPage";
import QuestionData from "./Components/QuestionPageContents/QuestionData";

const App = () => {
  const clickedCalculateCost = false;

  const [questionIndex, setQuestionIndex] = useState(0);
  const [selectionType, setSelectionType] = useState(
      QuestionData[questionIndex].selectionType
  );
  const [allResponses, setAllResponses] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  const nextQuestion = () => {
      if (questionIndex < QuestionData.length-1) {
          setQuestionIndex(questionIndex + 1);
      }
  };

  const prevQuestion = () => {
    if (questionIndex > 0) {
        setQuestionIndex(questionIndex - 1);
    }
  };

  const backToStart = ()=>{
    setQuestionIndex(0);
  }

  const clearCurrentSelection = () => {
    console.log("clearCurrentSelection fired")
  }

  const clearAll = () => {
    console.log("clearAll fired")
  }

  const calculateTotalPrice = () => {
    let newTotal = 0;
    allResponses.forEach((question) => {
        if (question.selectionType === "single-select") {
        newTotal += question.estimatedCost;
        } else if (question.selectionType === "multi-select") {
        question.selectedAnswers.forEach((checkbox) => {
            newTotal += checkbox.estimatedCost;
        });
        }
    });
    setTotalPrice(newTotal);
  };

  const states = {
    questionIndex, nextQuestion, prevQuestion, selectionType, allResponses, totalPrice, backToStart, clearCurrentSelection, clearAll, calculateTotalPrice
  }

  switch (clickedCalculateCost) {
    case false:
      return (
        <GlobalContext.Provider value={states}>
          <MuiThemeProvider theme={theme}>
            <QuestionPage/>
          </MuiThemeProvider>
        </GlobalContext.Provider>
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
