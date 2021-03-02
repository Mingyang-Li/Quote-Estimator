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

  const getAnswers = () => {
    let allAnswers = [];
    for (let i = 0; i < currQuestion.answerOptions.length; i++) {
      allAnswers.push({
        optionIndex: i,
        questionIndex: questionIndex,
        questionNumber: currQuestion.questionNumber,
        questionTopic: currQuestion.questionTopic,
        questiontext: currQuestion.questionText,
        optionText: currQuestion.answerOptions[i].answerText,
        optionPrice: currQuestion.answerOptions[i].price,
      });
    }
    return allAnswers;
  };

  const answers = getAnswers();
  console.table(answers);

  return (
    <FormControl component="fieldset">
      <RadioGroup aria-label="users" name="users">
        {answers.map(({ optionIndex, optionText, optionPrice }) => (
          <FormControlLabel
            key={optionText}
            value={optionText}
            price={optionPrice}
            control={<Radio />}
            label={optionText + ": " + optionPrice.toString()}
            // onClick={updateAllResponses(answers[optionIndex])}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
};
export default SingleSelectOptions;
