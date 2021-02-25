import { useContext } from "react";
import QuestionHeader from "../Components/QuestionPageContents/QuestionHeader";
import QuestionContent from "../Components/QuestionPageContents//QuestionContent";
import MainButtonGroup from "../Components/ButtonGroups/MainButtonGroup";
import SecondaryButtonGroup from "../Components/ButtonGroups/SecondaryButtonGroup";

const QuestionPage = () => {
  return (
    <>
      <QuestionHeader/>
      <MainButtonGroup/>
      <SecondaryButtonGroup />
      <QuestionContent />
    </>
  );
};

export default QuestionPage;
