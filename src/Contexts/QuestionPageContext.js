const QuestionPageContext = {
     questionIndex: 0,
     currQuestion : {
        questionNumber: 0,
        questionTopic: "Demo",
        questionText: "Question text",
        answerOptions: [
            { answerText: "test1", price: 100 },
            { answerText: "test2", price: 100 },
            { answerText: "test3", price: 100 },
            // { answerText: "Custom", price: 0 },
        ],
        isCompulstory: true,
        selectionType: "single-select",
    }
}


export default QuestionPageContext;