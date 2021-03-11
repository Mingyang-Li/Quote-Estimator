import {useContext} from 'react';
import QuestionData from "./QuestionData";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import GlobalContext from '../../Contexts/GlobalContext';

const QuestionHeader = () => {
  const { questionIndex, totalPrice } = useContext(GlobalContext);
  return (
    <>
      <Card>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            {QuestionData[questionIndex].questionNumber}. {QuestionData[questionIndex].questionTopic} 
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            {QuestionData[questionIndex].questionText}
          </Typography>
          <Typography variant="subtitle2" gutterBottom>
            Current total: ${totalPrice}
          </Typography>
        </CardContent>
      </Card>
    </>
  );
};

export default QuestionHeader;
