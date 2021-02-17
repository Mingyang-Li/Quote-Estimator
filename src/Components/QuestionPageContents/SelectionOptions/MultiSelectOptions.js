import React from "react";
import QuestionData from "../QuestionData";
import Checkbox from "@material-ui/core/Checkbox";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";

const MultiSelectQuestions = (props) => {
  const [checked, setChecked] = React.useState(true);

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  const currQuestion = QuestionData[props.questionIndex];

  return (
    <div>
      <FormControl component="fieldset">
        <RadioGroup aria-label="users" name="users" onChange={handleChange}>
          {currQuestion.answerOptions.map(({ answerText, price }) => (
            <FormControlLabel
              value={answerText}
              control={
                <Checkbox
                  inputProps={{ "aria-label": "uncontrolled-checkbox" }}
                />
              }
              label={answerText}
              price={price}
            />
          ))}
        </RadioGroup>
      </FormControl>
    </div>
  );
};

export default MultiSelectQuestions;
