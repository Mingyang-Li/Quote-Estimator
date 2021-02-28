import React, { useContext } from "react";
import GlobalContext from "../../Contexts/GlobalContext";
import ResponsesCard from "./ResponsesCard";

const ResponseGroup = () => {
  const { allResponses } = useContext(GlobalContext);
  return (
    <>
      <h1>ResponseGroup</h1>
      <h2>allResponses: {allResponses}</h2>
      {allResponses.map((response) => {
        <ResponsesCard
          questionNumber={response.questionNumber}
          questionTopic={response.questionTopic}
          userResponse={response.userResponse}
        />;
      })}
    </>
  );
};

export default ResponseGroup;
