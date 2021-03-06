function oldUpdateMultiSelect(response) {
  if (allResponses.length === 0) {
    setAllResponses([
      {
        questionNumber: response.questionNumber,
        questionTopic: response.questionTopic,
        selectionType: response.selectionType,
        questionText: response.questionText,
        userResponse: [response.userResponse],
      },
    ]);
  } else {
    let copiedAllResponses = allResponses.map((res) => ({ ...res }));
    const answeredQs = getAnsweredQs(copiedAllResponses);
    if (answeredQs.includes(response.questionNumber) === false) {
      for (let i = 0; i < copiedAllResponses.length; i++) {
        if (copiedAllResponses[i].questionNumber === response.questionNumber) {
          console.log("current qs: " + copiedAllResponses[i].questionNumber);
          let selectedCheckboxes = copiedAllResponses[i].userResponse;
          if (selectedCheckboxes.includes(response.userResponse) === false) {
            selectedCheckboxes = [...selectedCheckboxes, response.userResponse];
            selectedCheckboxes.splice(selectedCheckboxes.length - 1, 1);
          } else if (selectedCheckboxes.includes(response.userResponse)) {
            selectedCheckboxes.pop(
              selectedCheckboxes.indexOf(response.userResponse)
            );
          }
          copiedAllResponses[i].userResponse = selectedCheckboxes;
        }
      }
    } else {
      console.log("new question");
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
    }
    setAllResponses(copiedAllResponses);
  }
}

function updateMultiSelect(response) {
  // if allResponse is empty, add new response
  if (allResponses.length === 0) {
    setAllResponses([
      {
        questionNumber: response.questionNumber,
        questionTopic: response.questionTopic,
        selectionType: response.selectionType,
        questionText: response.questionText,
        userResponse: [response.userResponse],
      },
    ]);
  } else {
    let copiedAllResponses = allResponses.map((res) => ({ ...res }));
    const answeredQs = getAnsweredQs(copiedAllResponses);
    // if qs is new, add new response
    if (answeredQs.includes(response.questionNumber) === false) {
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
    } else {
      // if qs already answered, verify checkboxes -> add or remove checkboxes accordingly
      let selectedCheckboxes =
        copiedAllResponses[response.optionIndex].userResponse;
      if (selectedCheckboxes.includes(response.userResponse)) {
        selectedCheckboxes.pop(
          selectedCheckboxes.indexOf(response.userResponse)
        );
      } else {
        selectedCheckboxes = [...selectedCheckboxes, response.userResponse];
        selectedCheckboxes.splice(selectedCheckboxes.length - 1, 1);
      }
      copiedAllResponses[
        response.optionIndex
      ].userResponse = selectedCheckboxes;
      setAllResponses(copiedAllResponses);
    }
  }
}
