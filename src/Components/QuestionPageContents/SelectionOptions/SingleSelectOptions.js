import QuestionData from "../QuestionData";
import React from "react";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";

const SingleSelectOptions = (props) => {
  const [value, setValue] = React.useState("0 users");
  // console.log("questionIndex - SingleSelectOptions: " + props.questionIndex);
  // console.table(QuestionData[props.questionIndex]);

  const currQuestion = QuestionData[props.questionIndex];

  const handleChange = (event) => {
    setValue(event.target.value);
  };
  /*
  console.log(currQuestion.answerOptions);
  */

  return (
    <FormControl component="fieldset">
      <RadioGroup
        aria-label="users"
        name="users"
        value={value}
        onChange={handleChange}
      >
        {currQuestion.answerOptions.map(({ answerText, price }) => (
          <FormControlLabel
            value={answerText}
            control={<Radio />}
            label={answerText}
            price={price}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
};

export default SingleSelectOptions;
