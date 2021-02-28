import QuestionData from "../QuestionData";
import React, { useContext, useState, useEffect } from "react";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import GlobalContext from "../../../Contexts/GlobalContext";

const SingleSelectOptions = () => {
  const { questionIndex } = useContext(GlobalContext);

  const currQuestion = QuestionData[questionIndex];

  const [value, setValue] = useState();
  const handleChange = (e) => {
    setValue(e.target.value);
    console.log("value: " + value);
  };

  return (
    <FormControl component="fieldset">
      <RadioGroup
        aria-label="users"
        name="users"
        // value={value}
        onChange={handleChange}
      >
        {currQuestion.answerOptions.map(
          ({ questionNumber, answerText, price }) => (
            <FormControlLabel
              value={answerText}
              control={<Radio />}
              label={answerText}
              price={price}
            />
          )
        )}
      </RadioGroup>
    </FormControl>
  );
};
export default SingleSelectOptions;
