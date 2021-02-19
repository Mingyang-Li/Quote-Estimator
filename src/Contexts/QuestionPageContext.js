import { useState } from "react";
import { createContext } from "react";
import QuestionData from "./Components/QuestionPageContents/QuestionData";

const [questionIndex, setQuestionIndex] = useState(0);
const [selectionType, setSelectionType] = useState(
    QuestionData[questionIndex].selectionType
);
const [allResponses, setAllResponses] = useState([]);
const [totalPrice, setTotalPrice] = useState(0);

const nextQuestion = () => {
    if (questionIndex < QuestionData.length-1) {
      setQuestionIndex(questionIndex + 1);
    }
  };

  const prevQuestion = () => {
    if (questionIndex > 0) {
      setQuestionIndex(questionIndex - 1);
    }
  };

  const backToStart = () => {
    setQuestionIndex(0);
  }

  const clearCurrentSelection = () => {
    console.log("clearCurrentSelection fired")
  }

  const clearAll = () => {
    console.log("clearAll fired")
  }

  const calculateTotalPrice = () => {
    let newTotal = 0;
    allResponses.forEach((question) => {
      if (question.selectionType === "single-select") {
        newTotal += question.estimatedCost;
      } else if (question.selectionType === "multi-select") {
        question.selectedAnswers.forEach((checkbox) => {
          newTotal += checkbox.estimatedCost;
        });
      }
    });
    setTotalPrice(newTotal);
  };

const callToActionButtons = [
    nextQuestion, prevQuestion, backToStart, clearCurrentSelection, clearAll, calculateTotalPrice
]

const QuestionPageContext = createContext(callToActionButtons);


export default QuestionPageContext;