import React from 'react';
import { Container } from "@material-ui/core";
import ResponsesGroup from "../Components/ResponsesPageContents/ResponsesGroup";
import TotalPriceCard from "../Components/ResponsesPageContents/TotalPriceCard";

const ResponsesPage = () => {
  return (
    <React.Fragment>
      <Container>
        <ResponsesGroup />
        <TotalPriceCard />
      </Container>
    </React.Fragment>
  );
};

export default ResponsesPage;
