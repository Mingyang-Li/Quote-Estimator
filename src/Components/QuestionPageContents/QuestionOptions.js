import SingleSelectOptions from "./SelectionOptions/SingleSelectOptions";
import MultiSelectOptions from "./SelectionOptions/MultiSelectOptions";

const QuestionOptions = props => {
    console.log("selectionType:", props.selectionType);
    switch (props.selectionType){
        case "single-select":
            return (<SingleSelectOptions/>);
        case "multi-select":
            return (<MultiSelectOptions/>);
        default:
            return (<SingleSelectOptions/>)
    }
}
export default QuestionOptions;