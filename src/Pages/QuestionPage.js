import QuestionHeader from "../Components/QuestionPageContents/QuestionHeader";
import QuestionContent from "../Components/QuestionPageContents//QuestionContent";
import MainButtonGroup from "../Components/ButtonGroups/MainButtonGroup";
import SecondaryButtonGroup from "../Components/ButtonGroups/SecondaryButtonGroup";
import { useContext } from "react";
import GlobalContext from "../Contexts/GlobalContext";

const QuestionPage = () => {
  const { allResponses, totalPrice } = useContext(GlobalContext);
  return (
    <>
      <code>{JSON.stringify(allResponses)}</code>
      <QuestionHeader />
      <MainButtonGroup />
      <SecondaryButtonGroup />
      <QuestionContent />
    </>
  );
};

export default QuestionPage;
