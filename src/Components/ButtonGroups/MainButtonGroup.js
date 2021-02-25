import Grid from '@material-ui/core/Grid';
import Paper from "@material-ui/core/Paper"
import NextQuestionButton from "../Buttons/MainButtons/NextQuestionButton";
import PreviousQuestionButton from "../Buttons/MainButtons/PreviousQuestionButton";

const MainButtonGroup = (props) => {
  return (
    <>
      <Grid container spacing={24}>
        <Grid item xs={5}>
          <PreviousQuestionButton/>
        </Grid>
        <Grid item xs={5}>
          <NextQuestionButton/>
        </Grid>
      </Grid>
    </>
  );
};
export default MainButtonGroup;
