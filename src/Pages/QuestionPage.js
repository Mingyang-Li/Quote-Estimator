import {useState}  from 'react';
import QuestionHeader from '../Components/QuestionPageContents/QuestionHeader';
import QuestionContent from '../Components/QuestionPageContents//QuestionContent';
import MainButtonGroup from "../Components/ButtonGroups/MainButtonGroup"
import SecondaryButtonGroup from "../Components/ButtonGroups/SecondaryButtonGroup";

const QuestionPage = props => {

    const [selectionType, setSelectionType] = useState("single-select");
    
    return (
        <>

            <QuestionHeader questionIndex={props.questionIndex}/>
            <QuestionContent 
                questionIndex={props.questionIndex} 
                
            />
            <MainButtonGroup/>
            <SecondaryButtonGroup/>
        </>
    )
}

export default QuestionPage;