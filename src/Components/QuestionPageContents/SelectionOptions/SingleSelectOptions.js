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

  const [value, setValue] = useState();

  const handleRadioChange = (event) => {
    event.preventDefault();
    setValue(event.target.value);
  };

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

      // console.log(
      //   `question ${currQuestion.questionNumber} option ${currQuestion.answerOptions[i].answerText} is mapped`
      // );
    }
    return allAnswers;
  };

  const answers = getAnswers();
  // console.table(answers);

  return (
    <FormControl component="fieldset">
      <RadioGroup
        aria-label={currQuestion.questionTopic}
        name={currQuestion.questionTopic}
        // onChange={handleRadioChange}
      >
        {answers.map(({ optionIndex, optionText, optionPrice }) => (
          <FormControlLabel
            key={optionText}
            value={optionText}
            price={optionPrice}
            control={<Radio />}
            label={optionText + ": $" + optionPrice.toString()}
            onChange={() => updateAllResponses(answers[optionIndex])}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
};
export default SingleSelectOptions;
