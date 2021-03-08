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
  const updateAllResponses = (selectedResponse) => {
    // check & update allAesponses (flow)
    switch (selectedResponse.selectionType) {
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
    // console.table(response);
    if (allResponses.length === 0) {
      setAllResponses([
        {
          // questionIndex: response.questionIndex,
          questionNumber: response.questionNumber,
          questionTopic: response.questionTopic,
          selectionType: response.selectionType,
          questiontext: response.questionText,
          userResponse: response.userResponse,
        },
      ]);
    } else {
      // Make a copy of original allResponses,
      // This is because we don't want to update the state too many times in one render
      // Optional: use allResponses state for production, or TestingData for dev
      const copiedAllResponses = allResponses.map((res) => ({ ...res }));

      // console.log("copiedAllResponses.length: " + copiedAllResponses.length);

      const answeredQs = getAnsweredQs(copiedAllResponses);
      // console.log("answeredQs: " + answeredQs);

      // if selected response belongs to one of the already answered question
      if (answeredQs.includes(response.questionNumber)) {
        for (let i = 0; i < copiedAllResponses.length; i++) {
          // we loop till we find the anwered question with the same qs number as the selected qs
          if (
            copiedAllResponses[i].questionNumber === response.questionNumber
          ) {
            // We update the answer if the answers aren't the same, or leave it if they are the same
            if (copiedAllResponses[i].userResponse !== response.userResponse) {
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
          // questionIndex: response.questionIndex,
          questionNumber: response.questionNumber,
          questionTopic: response.questionTopic,
          selectionType: response.selectionType,
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
    // if allResponse is empty, add new response
    if (allResponses.length === 0) {
      console.log("allResponse is empty, need to add new response");
      setAllResponses([
        {
          questionNumber: response.questionNumber,
          questionTopic: response.questionTopic,
          selectionType: response.selectionType,
          questionText: response.questionText,
          userResponse: [response.userResponse],
        },
      ]);
      return null;
    } else {
      // console.table(response);
      let copiedAllResponses = allResponses.map((res) => ({ ...res }));
      const answeredQs = getAnsweredQs(copiedAllResponses);

      // if qs is new, (reaponse is also new), add new response
      if (answeredQs.includes(response.questionNumber) === false) {
        console.log(
          "allResponses is NOT empty, but this question hasn't been answered yet"
        );
        debugger;
        let newResponse = {
          questionNumber: response.questionNumber,
          questionTopic: response.questionTopic,
          selectionType: response.selectionType,
          questiontext: response.questionText,
          userResponse: [response.userResponse],
        };
        copiedAllResponses = [...copiedAllResponses, newResponse];
        copiedAllResponses.splice(copiedAllResponses.length - 1, 1);
        sortTempResponses(copiedAllResponses);
        setAllResponses(copiedAllResponses);
        //---------------------
        // need to add checker to identify whether copiedAllResponses is ACTUALLY UPDATED
        console.log("new response ADDED to allResponses");
        //---------------------
      } else {
        // debugger;
        // if qs already answered, verify checkboxes -> add or remove checkboxes accordingly
        // ---------------------------------------------------------------
        // Extract an array of selected options (selectedCheckboxes)
        let selectedCheckboxes = getSelectedCheckboxes(response);

        // If checkbox option already exists in the array of checkboxes, remove it from selectedCheckboxes
        if (selectedCheckboxes.includes(response.userResponse)) {
          selectedCheckboxes.pop(
            selectedCheckboxes.indexOf(response.userResponse)
          );
          // Assign selectedCheckboxes to the userResponse object of copiedAllResponses
          // First, get index of question to have its checkboxes obj replaced
          let i = getIndexOfQuestion(response);

          // Use the obtained index i to get the question to replace checkboxes from
          copiedAllResponses[i].userResponse = selectedCheckboxes;
          setAllResponses(copiedAllResponses);
          console.log("checkbox unchecked, data removed from allResponses");
        }
        // Else if checkbox option does not exists, add it to selectedCheckboxes
        else {
          selectedCheckboxes = [...selectedCheckboxes, response.userResponse];
          selectedCheckboxes.splice(selectedCheckboxes.length - 1, 1);
          // Assign selectedCheckboxes to the userResponse object of copiedAllResponses
          copiedAllResponses[
            response.optionIndex
          ].userResponse = selectedCheckboxes;
          setAllResponses(copiedAllResponses);
          console.log("new response added to allResponses");
        }
        // -----------------------------------------------------------------
      }
    }
  }
  // Function to populate answeredQs
  function getAnsweredQs(answeredQuestions) {
    let tempArr = [];
    for (let i = 0; i < answeredQuestions.length; i++) {
      tempArr.push(answeredQuestions[i].questionNumber);
    }
    return tempArr;
  }

  // Function to obtain an array of selected checkboxes of a selected question
  function getSelectedCheckboxes(currResponse) {
    let checkboxes = [];
    for (let i = 0; i < allResponses.length; i++) {
      if (allResponses[i].questionNumber === currResponse.questionNumber) {
        // console.log("match found!");
        checkboxes = allResponses[i].userResponse;
        break;
      }
    }
    return checkboxes;
  }

  function getIndexOfQuestion(currResponse) {
    for (let i = 0; i < allResponses.length; i++) {
      if (allResponses[i].questionNumber === currResponse.questionNumber) {
        return i;
      }
    }
  }

  // Sort allResponses by questionnNumber (ascending) when called
  function sortTempResponses(responses) {
    if (responses.length > 1) {
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
