import Grid from '@material-ui/core/Grid';
import Paper from "@material-ui/core/Paper"
import NextQuestionButton from "../Buttons/MainButtons/NextQuestionButton";
import PreviousQuestionButton from "../Buttons/MainButtons/PreviousQuestionButton";
import { useContext } from "react";
import GlobalContext from "../../Contexts/GlobalContext";
import QuestionData from "../../Components/QuestionPageContents/QuestionData";

const MainButtonGroup = () => {
  const { questionIndex } = useContext(GlobalContext);
  return (
    <>
    <Grid container spacing={1} direction-lg-row-reverse>
      <Grid item xs={6} sm={12} lg={12}>
        <PreviousQuestionButton/>
      </Grid>
      {
        questionIndex + 1 < QuestionData.length ? 
        (
          <Grid item xs={6} sm={12} lg={12}> 
            <NextQuestionButton/>
          </Grid>
        ) : (
          <div></div>
        )
      }
      
    </Grid>
      <br></br>
    </>
  );
};
export default MainButtonGroup;
