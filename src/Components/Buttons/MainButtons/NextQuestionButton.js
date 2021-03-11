import { Button } from "@material-ui/core";
import { useContext } from "react";
import GlobalContext from "../../../Contexts/GlobalContext";
import QuestionData from "../../QuestionPageContents/QuestionData";

const NextQuestionButton = () => {
  const { questionIndex, nextQuestion } = useContext(GlobalContext);

  return (
    <Button 
      color="primary" 
      size="large" 
      fullWidth 
      variant="contained" 
      onClick={nextQuestion}
      >
      {questionIndex + 1 === QuestionData.length ? "Calculate Total" : "Next"}
    </Button>
  );
};

export default NextQuestionButton;
