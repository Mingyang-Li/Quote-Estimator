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
  const [currSelectedOption, setCurrSelectedOption] = useState({});
  const [clickedCalculateCost, setClickedCalculateCost] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);

  const nextQuestion = () => {
    if (questionIndex < QuestionData.length - 1) {
      setQuestionIndex(questionIndex + 1);
    } else {
      setClickedCalculateCost(true);
    }
  };

  const prevQuestion = () => {
    if (questionIndex > 0) {
      setQuestionIndex(questionIndex - 1);
    }
  };

  const backToStart = () => {
    setQuestionIndex(0);
  };

  const clearCurrentSelection = () => {
    // first we clear the state (logic)
    setCurrSelectedOption({});

    // then we update the UI (unchecking radio and checkboxes)
  };

  const clearAll = () => {
    // first clearing the state then clear the checked status of all radios and checkboxes
    setAllResponses([]);
  };

  // Only updates the responses for the current question, not dealing with allResponses
  const updateCurrSelectedOption = (selectedResponse) => {
    console.log("updateCurrSelectedOption fired");
    let tempResponse = {};
    switch (selectedResponse.selectionType) {
      case "single-select":
        // when it's the first response, add item into allResponses straightaway
        if (allResponses.length === 0) {
          tempResponse = {
            questionIndex: selectedResponse.questionIndex,
            questionNumber: selectedResponse.questionNumber,
            questionTopic: selectedResponse.questionTopic,
            questiontext: selectedResponse.questiontext,
            userResponse: selectedResponse.selectedAnswer,
          };
        } else {
          break;
        }
      case "multi-select":
        if (allResponses.length === 0) {
          // when it's the first response, add item into allResponses straightaway
          // wrap anawers in [] becos it's multi-select
          tempResponse = {
            questionIndex: selectedResponse.questionIndex,
            questionNumber: selectedResponse.questionNumber,
            questionTopic: selectedResponse.questionTopic,
            questiontext: selectedResponse.questiontext,
            userResponse: [selectedResponse.selectedAnswer],
          };
        } else {
          break;
        }
    }
    setCurrSelectedOption(tempResponse);
  };

  // Responsible for add, swap or delete and sorting the responses array
  const updateAllResponses = (selectedResponse) => {
    console.log("updateAllResponses fired");

    // first, focus on updating currSelectedOption
    updateCurrSelectedOption(selectedResponse);

    // declare a temporary array of responses to replace allResponses state
    let newResponses = JSON.parse(JSON.stringify(allResponses));

    // declare an array of question numbers for all answered questions
    let answeredQs = allResponses.map((response) => response.questionNumber);

    // check & update allAesponses (flow)
    switch (selectionType) {
      case "single-select":
        if (allResponses.length === 0) {
          newResponses.push(currSelectedOption);
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
            newResponses.push(currSelectedOption);
          }
        }
      case "multi-select":
        if (allResponses.length === 0) {
          newResponses.push(currSelectedOption);
        } else {
          // if qs is already answered (qs number in answeredQs)
          // if the clicked checkbox is new (answertext not in any of the selectedAnswers array), we add currSelectedOption into selected checkboxes array of matching qs
          // if the clicked checkbox is not new (answertext already in selectedAnswers array), we delete the item from selectedAnswers (becos it's unchecked when clicked on)
          // ==========
          // if qs is not answered at all, simply add currSelectedOption into newResponses
          break;
        }
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
    currSelectedOption,
    clickedCalculateCost,
    totalPrice,
    nextQuestion,
    prevQuestion,
    backToStart,
    clearCurrentSelection,
    clearAll,
    updateCurrSelectedOption,
    updateAllResponses,
    setClickedCalculateCost,
    calculateTotalPrice,
  };

  switch (clickedCalculateCost) {
    case false:
      return (
        <GlobalContext.Provider value={tools}>
          <MuiThemeProvider theme={theme}>
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
