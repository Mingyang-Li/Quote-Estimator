import { Button } from "@material-ui/core";

const NextQuestionButton = (props) => {
  return (
    <Button color="primary" variant="contained" onClick={props.nextQuestion}>
      Next
    </Button>
  );
};

export default NextQuestionButton;
