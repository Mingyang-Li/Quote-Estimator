import { Button } from "@material-ui/core";
import { useContext } from "react";
import GlobalContext from "../../../Contexts/GlobalContext";

const NextQuestionButton = () => {
  const { nextQuestion } = useContext(GlobalContext)

  return (
    <Button 
      color="primary" 
      size="large" 
      fullWidth 
      variant="contained" 
      onClick={nextQuestion}
      >
      Next
    </Button>
  );
};

export default NextQuestionButton;
