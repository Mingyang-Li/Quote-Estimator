import React, { useContext } from "react";
import QuestionData from "../QuestionData";
import Checkbox from "@material-ui/core/Checkbox";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import GlobalContext from "../../../Contexts/GlobalContext";

const MultiSelectQuestions = () => {
  const { questionIndex } = useContext(GlobalContext);

  const [checked, setChecked] = React.useState(true);

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  const currQuestion = QuestionData[questionIndex];

  return (
    <div>
      <FormControl component="fieldset">
        <FormGroup aria-label="users" name="users" onChange={handleChange}>
          {currQuestion.answerOptions.map(({ answerText, price }) => (
            <FormControlLabel
              value={answerText}
              control={<Checkbox />}
              label={answerText + ": " + price.toString()}
              price={price}
            />
          ))}
        </FormGroup>
      </FormControl>
    </div>
  );
};

export default MultiSelectQuestions;
