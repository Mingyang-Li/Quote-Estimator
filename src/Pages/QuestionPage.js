import { useState } from "react";
import QuestionHeader from "../Components/QuestionPageContents/QuestionHeader";
import QuestionContent from "../Components/QuestionPageContents//QuestionContent";
import MainButtonGroup from "../Components/ButtonGroups/MainButtonGroup";
import SecondaryButtonGroup from "../Components/ButtonGroups/SecondaryButtonGroup";

const QuestionPage = (props) => {

  return (
    <>
      <QuestionHeader questionIndex={props.questionIndex} />
      <QuestionContent questionIndex={props.questionIndex} />
      <div>
        <MainButtonGroup
          nextQuestion={props.nextQuestion}
          prevQuestion={props.prevQuestion}
        />
      </div>
      <br></br>
      <SecondaryButtonGroup />
    </>
  );
};

export default QuestionPage;
