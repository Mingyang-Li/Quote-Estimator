import React from 'react';
import QuestionHeader from "../Components/QuestionPageContents/QuestionHeader";
import QuestionContent from "../Components/QuestionPageContents//QuestionContent";
import MainButtonGroup from "../Components/ButtonGroups/MainButtonGroup";
import SecondaryButtonGroup from "../Components/ButtonGroups/SecondaryButtonGroup";
import { useContext } from "react";
import GlobalContext from "../Contexts/GlobalContext";
import { Container } from "@material-ui/core";

const QuestionPage = () => {
  const { allResponses, totalPrice } = useContext(GlobalContext);
  return (
    <React.Fragment>
      {/* <code>{JSON.stringify(allResponses)}</code> */}
      <Container>
        <QuestionHeader />
        <QuestionContent />
        <MainButtonGroup />
        <SecondaryButtonGroup />
      </Container>
    </React.Fragment>
  );
};

export default QuestionPage;
