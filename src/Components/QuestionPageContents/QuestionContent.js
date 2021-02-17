import QuestionOptions from "./QuestionOptions";
import QuestionData from "./QuestionData";

const QuestionContent = (props) => {
  // console.log("qs index - QuestionContent: " + props.questionIndex);
  const selectionType = QuestionData[props.questionIndex].selectionType;
  return (
    <QuestionOptions
      questionIndex={props.questionIndex}
      selectionType={selectionType}
    />
  );
};

export default QuestionContent;
