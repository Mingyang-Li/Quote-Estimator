import QuestionData from "../QuestionData";
import React, { useContext, useState, useEffect } from "react";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import GlobalContext from "../../../Contexts/GlobalContext";

const SingleSelectOptions = () => {
  const { questionIndex, updateAllResponses } = useContext(GlobalContext);
  const currQuestion = QuestionData[questionIndex];

  const getSingleSelectAnswerDetails = () => {
    let allAnswers = [];
    for (let i = 0; i < currQuestion.answerOptions.length; i++) {
      allAnswers.push({
        optionIndex: i,
        questionIndex: questionIndex,
        questionNumber: currQuestion.questionNumber,
        questionTopic: currQuestion.questionTopic,
        selectionType: currQuestion.selectionType,
        questionText: currQuestion.questionText,
        userResponse: {
          optionText: currQuestion.answerOptions[i].answerText,
          optionPrice: currQuestion.answerOptions[i].price,
        },
      });
    }
    return allAnswers;
  };

  const answers = getSingleSelectAnswerDetails();
  // console.table(answers);

  return (
    <FormControl component="fieldset">
      <RadioGroup
        aria-label={currQuestion.questionTopic}
        name={currQuestion.questionTopic}
      >
        {answers.map(({ optionIndex, userResponse }) => (
          <FormControlLabel
            key={userResponse.optionText}
            value={userResponse.optionText}
            price={userResponse.optionPrice}
            control={<Radio />}
            label={
              userResponse.optionText +
              ": $" +
              userResponse.optionPrice.toString()
            }
            onClick={() => updateAllResponses(answers[optionIndex])}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
};
export default SingleSelectOptions;
