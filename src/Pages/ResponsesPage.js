import React, { useContext } from 'react';
import { Container } from "@material-ui/core";
import ResponsesGroup from "../Components/ResponsesPageContents/ResponsesGroup";
import TotalPriceCard from "../Components/ResponsesPageContents/TotalPriceCard";
import GlobalContext from '../Contexts/GlobalContext';

const ResponsesPage = () => {
  const { totalPrice, allResponses } = useContext(GlobalContext);
  return (
    <React.Fragment>
      <Container>
      {JSON.stringify(allResponses)}
      Total estimated cost: ${totalPrice}
        <ResponsesGroup />
        <TotalPriceCard />
      </Container>
    </React.Fragment>
  );
};

export default ResponsesPage;
