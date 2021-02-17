import QuestionData from "./QuestionData";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

const QuestionHeader = (props) => {
  // const currIndex = props.questionIndex
  //console.log(QuestionData[currIndex].questionNumber)
  return (
    <>
      <Card>
        <CardContent>
          <h1>
            {QuestionData[props.questionIndex].questionNumber}.{" "}
            {QuestionData[props.questionIndex].questionTopic}
          </h1>
        </CardContent>
      </Card>
    </>
  );
};

export default QuestionHeader;
