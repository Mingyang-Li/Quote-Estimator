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

  const getAnswers = () => {
    let allAnswers = [];
    for (let i = 0; i < currQuestion.answerOptions.length; i++) {
      allAnswers.push({
        optionIndex: i,
        questionIndex: currQuestion.questionIndex,
        questionNumber: currQuestion.questionNumber,
        questionTopic: currQuestion.questionTopic,
        questiontext: currQuestion.questionText,
        userResponse: {
          optionText: currQuestion.answerOptions[i].answerText,
          optionPrice: currQuestion.answerOptions[i].price,
        },
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
    <div>
      <FormControl component="fieldset">
        <FormGroup aria-label="users" name="users">
          {answers.map(({ optionIndex, userResponse }) => (
            <FormControlLabel
              key={userResponse.optionText}
              value={userResponse.optionText}
              control={<Checkbox />}
              label={
                userResponse.optionText +
                ": $" +
                userResponse.optionPrice.toString()
              }
              price={userResponse.optionPrice}
              // onClick={() => updateAllResponses(currQuestion[optionIndex])}
            />
          ))}
        </FormGroup>
      </FormControl>
    </div>
  );
};

export default MultiSelectQuestions;
