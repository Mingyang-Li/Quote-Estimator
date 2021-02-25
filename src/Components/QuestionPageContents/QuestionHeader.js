import {useContext} from 'react';
import QuestionData from "./QuestionData";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import GlobalContext from '../../Contexts/GlobalContext';

const QuestionHeader = () => {
  const {questionIndex} = useContext(GlobalContext);
  return (
    <>
      <Card>
        <CardContent>
          <h1>
            {QuestionData[questionIndex].questionNumber}. {QuestionData[questionIndex].questionTopic} 
          </h1>
          <h2>
            {QuestionData[questionIndex].questionText}
          </h2>
        </CardContent>
      </Card>
    </>
  );
};

export default QuestionHeader;
