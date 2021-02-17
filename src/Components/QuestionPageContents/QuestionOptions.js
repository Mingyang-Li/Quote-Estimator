import SingleSelectOptions from "./SelectionOptions/SingleSelectOptions";
import MultiSelectOptions from "./SelectionOptions/MultiSelectOptions";

const QuestionOptions = (props) => {
  // console.log("selectionType: " + props.selectionType);
  switch (props.selectionType) {
    case "single-select":
      return <SingleSelectOptions questionIndex={props.questionIndex} />;
    case "multi-select":
      return <MultiSelectOptions questionIndex={props.questionIndex} />;
  }
};
export default QuestionOptions;
