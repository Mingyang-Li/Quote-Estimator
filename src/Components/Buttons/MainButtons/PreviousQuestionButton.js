import { Button } from "@material-ui/core";

const PreviousQuestionButton = (props) => {
  return (
    <Button color="secondary" variant="contained" onClick={props.prevQuestion}>
      Prev
    </Button>
  );
};

export default PreviousQuestionButton;
