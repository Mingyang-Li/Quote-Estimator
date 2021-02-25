import React, { useContext, useState } from 'react';
import GlobalContext from "./Contexts/GlobalContext"
import theme from "./theme";
import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles";
import QuestionPage from "./Pages/QuestionPage";
import ResponsesPage from "./Pages/ResponsesPage";
import QuestionData from "./Components/QuestionPageContents/QuestionData";

const App = () => {

  const [questionIndex, setQuestionIndex] = useState(0);
  const [selectionType, setSelectionType] = useState(
      QuestionData[questionIndex].selectionType
  );
  const [allResponses, setAllResponses] = useState([]);
  const [currSelectedOption, setCurrSelectedOption] = useState({});
  const [clickedCalculateCost, setClickedCalculateCost] = useState(false);
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

  const backToStart = () => {
    setQuestionIndex(0);
  }

  const clearCurrentSelection = () => {
    console.log("clearCurrentSelection fired")
  }

  const clearAll = () => {
    console.log("clearAll fired")
  }

  const updateCurrSelectedOption = (selectedResponse) => {
    console.log("updateCurrSelectedOption fired");
    let tempResponse = {};
    switch (selectedResponse.selectionType) {
      case "single-select":
        if (allResponses.length === 0){
          // add item into allResponses straightaway
          tempResponse = {
            questionIndex: selectedResponse.questionIndex,
            questionNumber: selectedResponse.questionNumber,
            selectedAnswer: selectedResponse.selectedAnswer
          }
        }
        else {
          break;
        }
      case "multi-select":
        break;
    }
    setCurrSelectedOption({});
  }

  const updateAllResponses = () => {
    console.log("updateAllResponses fired");
    setAllResponses([]) // sort response objs by qs number!
  }

  const calculateTotalPrice = () => {
    let newTotal = 0;
    allResponses.forEach((response) => {
      switch (response.selectionType) {
        case "single-select":
          newTotal += response.estimatedCost;
        case "multi-select":
          response.selectedAnswers.forEach((checkbox) => {
            newTotal += checkbox.estimatedCost;
          });
      }   
    });
    setTotalPrice(newTotal);
  };

  const tools = {
    questionIndex, 
    selectionType, 
    allResponses, 
    totalPrice, 
    nextQuestion, 
    prevQuestion, 
    backToStart, 
    clearCurrentSelection, 
    clearAll, 
    updateCurrSelectedOption, 
    updateAllResponses,
    setClickedCalculateCost,
    calculateTotalPrice
  }

  switch (clickedCalculateCost) {
    case false:
      return (
        <GlobalContext.Provider value={tools}>
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
