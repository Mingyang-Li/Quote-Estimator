import QuestionData from "../QuestionData";
import React, { useContext } from "react";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import GlobalContext from "../../../Contexts/GlobalContext";

const SingleSelectOptions = () => {
  const {questionIndex} = useContext(GlobalContext);

  const currQuestion = QuestionData[questionIndex];

  // const handleChange = (event) => {
  //   setValue(event.target.value);
  // };
  
  // console.log('SingleSelectOptions: Q' + QuestionData[questionIndex].questionNumber);
  

  return (
    <FormControl component="fieldset">
      <RadioGroup
        aria-label="users"
        name="users"
        // value={value}
        // onChange={}
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
