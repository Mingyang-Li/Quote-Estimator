import React, { useState } from "react";
import GlobalContext from "./Contexts/GlobalContext";
import theme from "./theme";
import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles";
import QuestionPage from "./Pages/QuestionPage";
import ResponsesPage from "./Pages/ResponsesPage";
import QuestionData from "./Components/QuestionPageContents/QuestionData";
import TestingData from "./Components/QuestionPageContents/TestingData";

const App = () => {
  const [questionIndex, setQuestionIndex] = useState(4);
  const [selectionType, setSelectionType] = useState(
    QuestionData[questionIndex].selectionType
  );
  const [allResponses, setAllResponses] = useState([]);
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

  // Responsible for add, swap or delete and sorting the responses array
  const updateAllResponses = (selectedResponse) => {
    // check & update allAesponses (flow)
    switch (selectionType) {
      case "single-select":
        updateSingleSelect(selectedResponse);
        break;

      case "multi-select":
        updateMultiSelect(selectedResponse);
        break;
    }
  };

  function updateSingleSelect(response) {
    if (allResponses.length === 0) {
      setAllResponses({
        questionIndex: response.questionIndex,
        questionNumber: response.questionNumber,
        questionTopic: response.questionTopic,
        questiontext: response.questionText,
        userResponse: response.userResponse,
      });
    } else {
      // make a copy of original responses array
      const copiedAllResponses = TestingData;

      const answeredQs = getAnsweredQs(copiedAllResponses);

      if (answeredQs.includes(response.questionNumber)) {
        for (let i = 0; i < copiedAllResponses.length; i++) {
          if (
            copiedAllResponses[i].questionNumber === response.questionNumber
          ) {
            copiedAllResponses[i].userResponse = response.userResponse;
          }
        }
        // no need to sort responses, as they're already sorted, we're only updating user responses
      } else {
        copiedAllResponses.push({
          questionIndex: response.questionIndex,
          questionNumber: response.questionNumber,
          questionTopic: response.questionTopic,
          questiontext: response.questionText,
          userResponse: response.userResponse,
        });
        sortTempResponses(copiedAllResponses);
      }
      // Updating allResponses with copiedAllResponses
      setAllResponses(copiedAllResponses);
    }
  }

  function updateMultiSelect(response) {
    if (allResponses.length === 0) {
      setAllResponses({
        questionIndex: response.questionIndex,
        questionNumber: response.questionNumber,
        questionTopic: response.questionTopic,
        questiontext: response.questionText,
        userResponse: [response.userResponse],
      });
    } else {
      // make a copy of original responses array
      const copiedAllResponses = TestingData;

      // initialise an array to be populated by question numbers for all answered questions
      const answeredQs = getAnsweredQs(copiedAllResponses);

      // if qs is already answered (qs number in answeredQs), we need to check if the checked box is already checked
      if (answeredQs.includes(response.questionNumber)) {
        // for all the anwered questions
        for (let i = 0; i < copiedAllResponses.length; i++) {
          // if the question number is the same as the qs num of the checked box
          if (
            copiedAllResponses[i].questionNumber === response.questionNumber
          ) {
            // we create an temoary array of its selected checkboxes,
            // (which includes both optionText AND optionPrice) - for updating the state
            let selectedCheckboxes = copiedAllResponses[i].userResponse;

            // we create another array which only has the optionText of selected checkboxes
            const selectedOptionTexts = selectedCheckboxes.map(
              (item) => item.optionText
            );

            // if optionText of the selected response doesn't exist in the array for the selected checkboxes of optionText
            // we add userResponse of the selected checkbox into selectedCheckboxes
            if (
              !selectedOptionTexts.includes(response.userResponse.optionText)
            ) {
              selectedCheckboxes.push(response.userResponse);
            } else {
              // if optionText of the selected response already exist in the array for the selected checkboxes of optionText
              // we remove the equivalent object from selectedCheckboxes by its index
              for (let j = 0; j < selectedCheckboxes.length; j++) {
                if (selectedCheckboxes[j].optionText === response.optionText) {
                  selectedCheckboxes.splice(j, 1);
                }
              }
            }

            // Once checkboxes have been updated, we set the updated selectedCheckboxes to be the userResponse of the current question
            copiedAllResponses[i].userResponse = selectedCheckboxes;
          }
        }
      } else {
        // if the question number of checked box is NOT in answeredQs,
        // we simply add a new object into copiedAllResponses
        // keep in mind that you'll need an ARRAY to store all checkbox responses
        copiedAllResponses.push({
          questionIndex: response.questionIndex,
          questionNumber: response.questionNumber,
          questionTopic: response.questionTopic,
          questiontext: response.questionText,
          userResponse: [response.userResponse],
        });

        // You need to sort copiedAllResponses once you've added a new object
        // This is because user might not be answering questions in order
        sortTempResponses(copiedAllResponses);
      }

      // Update the state for allResponses with the latest copiedAllResponses
      setAllResponses(copiedAllResponses);
    }
  }

  // Declare function to populate answeredQs
  function getAnsweredQs(answeredQuestions) {
    let tempArr = [];
    for (let i = 0; i < answeredQuestions.length; i++) {
      tempArr.push(answeredQuestions[i].questionNumber);
    }
    return tempArr;
  }

  // Sort allResponses by questionnNumber (ascending) when called
  function sortTempResponses(responses) {
    responses.sort((item1, item2) => {
      if (item1.questionNumber > item2.questionNumber) {
        return 1;
      } else {
        return -1;
      }
    });
  }

  const calculateTotalPrice = () => {
    let newTotal = 0;
    allResponses.forEach((response) => {
      switch (response.selectionType) {
        case "single-select":
          newTotal += response.userResponse.optionPrice;
        case "multi-select":
          response.userResponse.forEach((checkbox) => {
            newTotal += checkbox.optionPrice;
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
