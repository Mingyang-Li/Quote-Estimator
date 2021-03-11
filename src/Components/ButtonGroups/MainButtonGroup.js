import Grid from '@material-ui/core/Grid';
import Paper from "@material-ui/core/Paper"
import NextQuestionButton from "../Buttons/MainButtons/NextQuestionButton";
import PreviousQuestionButton from "../Buttons/MainButtons/PreviousQuestionButton";

const MainButtonGroup = () => {
  return (
    <>
      <Grid container spacing={1}>
        <Grid item xs={6} sm={12} lg={12}> 
          <PreviousQuestionButton/>
        </Grid>
        <Grid item xs={6} sm={12} lg={12}>
          <NextQuestionButton/>
        </Grid>
      </Grid>
      <br></br>
    </>
  );
};
export default MainButtonGroup;
