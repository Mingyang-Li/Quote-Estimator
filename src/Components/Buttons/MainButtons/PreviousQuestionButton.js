import { Button } from "@material-ui/core";
import { useContext } from 'react'
import GlobalContext from "../../../Contexts/GlobalContext";

const PreviousQuestionButton = () => {
  const { prevQuestion } = useContext(GlobalContext);
  return (
    <Button color="secondary" variant="contained" onClick={prevQuestion}>
      Prev
    </Button>
  );
};

export default PreviousQuestionButton;
