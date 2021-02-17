import Grid from '@material-ui/core/Grid';
import NextQuestionButton from "../Buttons/MainButtons/NextQuestionButton";
import PreviousQuestionButton from "../Buttons/MainButtons/PreviousQuestionButton";

const MainButtonGroup = (props) => {
  return (
    <>
        <Grid item xs={12} sm={6}>
          <PreviousQuestionButton prevQuestion={props.prevQuestion} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <NextQuestionButton nextQuestion={props.nextQuestion} />
        </Grid>
    </>
  );
};
export default MainButtonGroup;
