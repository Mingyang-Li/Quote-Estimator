import SingleSelectOptions from "./SelectionOptions/SingleSelectOptions";
import MultiSelectOptions from "./SelectionOptions/MultiSelectOptions";
import { useContext } from "react";
import GlobalContext from "../../Contexts/GlobalContext";
import QuestionData from "./QuestionData";

const QuestionOptions = () => {
  const { questionIndex } = useContext(GlobalContext);
  const selectionType = QuestionData[questionIndex].selectionType;
  
  switch (selectionType) {
    case "single-select":
      return <SingleSelectOptions />;
    case "multi-select":
      return <MultiSelectOptions />;
  }
};
export default QuestionOptions;
