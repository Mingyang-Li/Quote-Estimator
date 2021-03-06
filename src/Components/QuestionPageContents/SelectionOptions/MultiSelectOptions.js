import React, { useContext } from "react";
import QuestionData from "../QuestionData";
import Checkbox from "@material-ui/core/Checkbox";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import GlobalContext from "../../../Contexts/GlobalContext";

const MultiSelectQuestions = () => {
  const { questionIndex, updateAllResponses } = useContext(GlobalContext);
  const currQuestion = QuestionData[questionIndex];

  // We need to get the details of each option,
  // because whenever a checkbox is clicked,
  // the fired onClick event handler needs to know exactly which option was selected,
  // along with the data for the current question
  // This is why we pass an unique optionIndex for each optiontext,
  // just so that we can capture the selected option in jsx mapping
  const getMultiSelectOptionDetails = () => {
    let allAnswers = [];
    for (let i = 0; i < currQuestion.answerOptions.length; i++) {
      allAnswers.push({
        optionIndex: i, // VERY IMPORTANT!
        questionIndex: questionIndex,
        questionNumber: currQuestion.questionNumber,
        questionTopic: currQuestion.questionTopic,
        selectionType: currQuestion.selectionType,
        questionText: currQuestion.questionText,
        userResponse: {
          optionText: currQuestion.answerOptions[i].answerText,
          optionPrice: currQuestion.answerOptions[i].price,
        },
        checkedStatus: false,
        // need to work on how to make checkedStatus truly dynamic
        // checkedStatus from needs to get upated LOCALLY when
        // global method updateMultiSelect from App.js is triggered
      });
    }
    return allAnswers;
  };

  // Function call to obtain the option details
  const answers = getMultiSelectOptionDetails();
  // console.table(answers);

  return (
    <FormControl component="fieldset">
      <FormGroup aria-label="users" name="users">
        {answers.map(({ optionIndex, userResponse, checkedStatus }) => (
          <FormControlLabel
            // checked={checkedStatus}
            key={userResponse.optionText}
            value={userResponse.optionText}
            control={<Checkbox />}
            label={
              userResponse.optionText +
              ": $" +
              userResponse.optionPrice.toString()
            }
            price={userResponse.optionPrice}
            onClick={() => updateAllResponses(answers[optionIndex])}
          />
        ))}
      </FormGroup>
    </FormControl>
  );
};
export default MultiSelectQuestions;
