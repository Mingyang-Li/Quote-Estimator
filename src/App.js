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
  // {placeholderText: "demo"}
  const [allResponses, setAllResponses] = useState([]); // initialise allResponses to be an array of objects, indeatd of an empty array
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
  const updateAllResponses = (selectedResponse) =>{
    // check & update allAesponses (flow)
    switch (selectionType) {
      case "single-select":
        // console.log("firing updateSingleSelect");
        updateSingleSelect(selectedResponse);
        break;
      case "multi-select":
        // console.log("firing updateMultiSelect");
        updateMultiSelect(selectedResponse);
    }
  };

  function updateSingleSelect(response) {
    console.table(response)
    if (allResponses.length === 0) {
      setAllResponses([{
        questionIndex: response.questionIndex,
        questionNumber: response.questionNumber,
        questionTopic: response.questionTopic,
        questiontext: response.questionText,
        userResponse: response.userResponse,
      }]);
    } else {
      // Make a copy of original allResponses, 
      // This is because we don't want to update the state too many times in one render
      // Optional: use allResponses state for production, or TestingData for dev
      const copiedAllResponses = allResponses.map(res => ({...res}));

      // console.log("copiedAllResponses.length: " + copiedAllResponses.length);

      const answeredQs = getAnsweredQs(copiedAllResponses);
      console.log("answeredQs: " + answeredQs);

      // if selected response belongs to one of the already answered question
      if (answeredQs.includes(response.questionNumber)) {
        for (let i = 0; i < copiedAllResponses.length; i++) {
          // we loop till we find the anwered question with the same qs number as the selected qs
          if (copiedAllResponses[i].questionNumber === response.questionNumber) {
            // We update the answer if the answers aren't the same, or leave it if they are the same  
            if (copiedAllResponses[i].userResponse !== response.userResponse){
              copiedAllResponses[i].userResponse = response.userResponse;
              // Once answer is updated, 
              // there's no need to sort responses, as they're already sorted, 
              // we're only updating user responses
            }
          }
        }
      } else {
        // if question hasn't been answered, just add the new response to copiedAllResponses
        copiedAllResponses.push({
          questionIndex: response.questionIndex,
          questionNumber: response.questionNumber,
          questionTopic: response.questionTopic,
          questiontext: response.questionText,
          userResponse: response.userResponse,
        });
        // Because we've just added a new response, it's a good idea to sort them by question number
        sortTempResponses(copiedAllResponses);
      }
      // Update allResponses with copiedAllResponses once sorting is completed
      setAllResponses(copiedAllResponses);
    }
  }

  function updateMultiSelect(response) {

    // First, reverse the checkedStatus of the checkbox whenever one is being clicked - regardless
    // response.checkedStatus = !response.checkedStatus;
    // console.log("response.checkedStatus: " + response.checkedStatus);
    // console.table(response);
    // console.table(response.userResponse);

    if (allResponses.length === 0) {
      setAllResponses([{
        questionIndex: response.questionIndex,
        questionNumber: response.questionNumber,
        questionTopic: response.questionTopic,
        questionText: response.questionText,
        userResponse: [response.userResponse],
      }]);
    } else {
      // Make a copy of original allResponses
      const copiedAllResponses = allResponses.map(res => ({...res})); 
      // console.table(copiedAllResponses);

      // initialise an array to be populated by question numbers for all answered questions
      const answeredQs = getAnsweredQs(copiedAllResponses);
      // console.log("answeredQs: " + answeredQs);

      // if qs is already answered (qs number in answeredQs), we need to check if the checked box is already checked
      if (answeredQs.includes(response.questionNumber)) {
        console.log("question already answered");
        // for all the anwered questions
        for (let i = 0; i < copiedAllResponses.length; i++) {
          if (copiedAllResponses[i].questionNumber === response.questionNumber) {
            // If the question number is the same as the qs num of the checked box (qs already answered),
            // We create an temporary array of its selected checkboxes,
            // (which includes both optionText AND optionPrice) - for updating the state
            let selectedCheckboxes = copiedAllResponses[i].userResponse;
            // console.table(selectedCheckboxes)

            // We create another array which only has the optionText of selected checkboxes
            let selectedOptionTexts = selectedCheckboxes.map(
              (checkbox) => checkbox.optionText
            );
            // console.log("selectedOptionTexts :" + selectedOptionTexts);

            // If optionText of the selected response doesn't exist in the array for the selected checkboxes of optionText,
            // we add userResponse of the selected checkbox into selectedCheckboxes
            if (selectedOptionTexts.includes(response.userResponse.optionText) === false) {
              console.log("need to add this checkbox");
              // console.log("need to CHECK " + response.userResponse.optionText)
              selectedCheckboxes.push(response.userResponse);
            } else {
              console.log("need to remove this checkbox");
              // console.log("need to uncheck " + response.userResponse.optionText)
              // If optionText of the selected response already exist in the array for the selected checkboxes of optionText
              // we remove the equivalent object from selectedCheckboxes by its index
              selectedCheckboxes.pop(selectedCheckboxes.indexOf(response.userResponse))
            }

            // Once checkboxes have been updated, we set the updated selectedCheckboxes to be the userResponse of the current question
            copiedAllResponses[i].userResponse = selectedCheckboxes;
          }
        }
      } else {
        console.log("new question");
        // If the question number of checked box is NOT in answeredQs,
        // we simply add a new object into copiedAllResponses
        // Keep in mind that you'll need an ARRAY to store all checkbox responses
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
    if (responses.length > 1){
      responses.sort((item1, item2) => {
        if (item1.questionNumber > item2.questionNumber) {
          return 1;
        } else {
          return -1;
        }
      });
    }
  }

  const calculateTotalPrice = () => {
    let newTotal = 0;
    allResponses.forEach((response) => {
      switch (response.selectionType) {
        case "single-select":
          newTotal += response.userResponse.optionPrice;
          break;
        case "multi-select":
          response.userResponse.forEach((checkbox) => {
            newTotal += checkbox.optionPrice;
          });
          break;
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
