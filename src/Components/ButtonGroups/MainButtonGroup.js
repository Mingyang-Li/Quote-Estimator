import NextQuestionButton from "../Buttons/MainButtons/NextQuestionButton";
import PreviousQuestionButton from "../Buttons/MainButtons/PreviousQuestionButton";

const MainButtonGroup = (props) => {
  return (
    <>
      <PreviousQuestionButton prevQuestion={props.prevQuestion} />
      <NextQuestionButton nextQuestion={props.nextQuestion} />
    </>
  );
};
export default MainButtonGroup;
