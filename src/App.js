import React, { useState } from "react";
import GlobalContext from "./Contexts/GlobalContext";
import theme from "./theme";
import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles";
import QuestionPage from "./Pages/QuestionPage";
import ResponsesPage from "./Pages/ResponsesPage";
import QuestionData from "./Components/QuestionPageContents/QuestionData";
import TestingData from "./Components/QuestionPageContents/TestingData";

const App = () => {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selectionType, setSelectionType] = useState(
    QuestionData[questionIndex].selectionType
  );
  const [allResponses, setAllResponses] = useState(TestingData);
  const [clickedCalculateCost, setClickedCalculateCost] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);

  const nextQuestion = () => {
    if (questionIndex < QuestionData.length - 1) {
      setQuestionIndex(questionIndex + 1);
    } else {
      setClickedCalculateCost(!clickedCalculateCost);
    }
  };

  const prevQuestion = () => {
    if (questionIndex > 0) {
      setQuestionIndex(questionIndex - 1);
    } else if (questionIndex === QuestionData.length - 1) {
      setQuestionIndex(questionIndex - 1);
      setClickedCalculateCost(!clickedCalculateCost);
    }
  };

  const backToStart = () => {
    setQuestionIndex(0);
  };

  const clearAll = () => {
    // first clearing the state then clear the checked status of all radios and checkboxes
    setAllResponses([]);
  };

  // declare an array of question numbers for all answered questions
  const answeredQs = allResponses.map((response) => response.questionNumber);

  // Responsible for add, swap or delete and sorting the responses array
  const updateAllResponses = (selectedResponse) => {
    // declare a temporary array of responses to replace allResponses state
    let newResponses = JSON.parse(JSON.stringify(allResponses));
    console.table(selectedResponse);

    // check & update allAesponses (flow)
    switch (selectionType) {
      case "single-select":
        if (allResponses.length === 0) {
          newResponses.push(selectedResponse);
        } else {
          // if qs is already answered, update ans, else add new ans
          if (answeredQs.includes(selectedResponse.questionNumber)) {
            for (let i = 0; i < allResponses.length; i++) {
              if (
                allResponses[i].questionNumber ===
                selectedResponse.questionNumber
              ) {
                break;
              } else {
                break;
              }
            }
          } else {
            newResponses.push(selectedResponse);
          }
        }
        break;
      case "multi-select":
        console.log("multi-select!");
        // if (allResponses.length === 0) {
        //   newResponses.push(selectedResponse);
        // } else {
        //   // if qs is already answered (qs number in answeredQs)
        //   if (answeredQs.includes(selectedResponse.questionNumber)) {
        //     // if the clicked checkbox is new (answertext not in any of the selectedAnswers array),
        //     // we add currSelectedOption into selected checkboxes array of matching qs

        //     // else if the clicked checkbox is not new (answertext already in selectedAnswers array),
        //     // we delete the item from selectedAnswers (becos it's unchecked when clicked on)
        //     break;
        //   } else {
        //     // if qs is not answered at all, simply add currSelectedOption into newResponses
        //     break;
        //   }
        // }
        break;
    }

    // Sort allResponses by questionnNumber (ascending)
    newResponses.sort((item1, item2) => {
      if (item1.questionNumber > item2.questionNumber) {
        return 1;
      } else {
        return -1;
      }
    });

    // Updating allResponses with newResponses
    setAllResponses(newResponses);
  };

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
    clickedCalculateCost,
    totalPrice,
    nextQuestion,
    prevQuestion,
    backToStart,
    clearAll,
    updateAllResponses,
    setClickedCalculateCost,
    calculateTotalPrice,
  };

  switch (clickedCalculateCost) {
    case false:
      return (
        <GlobalContext.Provider value={tools}>
          <MuiThemeProvider theme={theme}>
            <h2>Total price: {totalPrice}</h2>
            <QuestionPage />
          </MuiThemeProvider>
        </GlobalContext.Provider>
      );
    case true:
      return (
        <GlobalContext.Provider value={tools}>
          <MuiThemeProvider theme={theme}>
            <ResponsesPage />
          </MuiThemeProvider>
        </GlobalContext.Provider>
      );
  }
};
export default App;
