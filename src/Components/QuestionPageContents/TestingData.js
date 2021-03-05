const TestingData = [
  {
    optionIndex: 2,
    questionIndex: 0,
    questionNumber: 1,
    questionTopic: "Scale",
    questionText: "How many users will use your application?",
    userResponse: { optionText: "101-500 Users", price: 35000 },
  },
  {
    optionIndex: 1,
    questionIndex: 1,
    questionNumber: 2,
    questionTopic: "Purpose",
    questionText: "What will you use it for?",
    userResponse: { optionText: "E-Commerce", price: 5000 },
  },
  {
    optionIndex: 0,
    questionIndex: 2,
    questionNumber: 3,
    questionTopic: "Management",
    questionText:
      "Would you like to be able edit content of your application by yourself? (CMS)",
    userResponse: { optionText: "Yes", price: 5000 },
  },
  {
    optionIndex: 2,
    questionIndex: 3,
    questionNumber: 4,
    questionTopic: "Appearance",
    questionText:
      "How pretty would you like your application to appear towards users?",
    userResponse: { optionText: "Polished", price: 2900 },
  },
  // these multi-select responses will have an optionIndex for each
  {
    questionIndex: 4,
    questionNumber: 5,
    questionTopic: "Users",
    questionText: "How will people use your application?",
    userResponse: [
      { optionIndex: 0, optionText: "FB sign up", price: 1500 },
      { optionIndex: 4, optionText: "2-factor authentication", price: 1500 },
    ],
  },
  {
    questionIndex: 5,
    questionNumber: 6,
    questionTopic: "Content Generation",
    questionText: "How will you generate content to your application?",
    userResponse: [
      { optionIndex: 1, optionText: "File Uploading", price: 1200 },
      { optionIndex: 5, optionText: "Global Search", price: 2000 },
      { optionIndex: 6, optionText: "Advanced Filters & Search", price: 2500 },
    ],
  },
  {
    questionIndex: 6,
    questionNumber: 7,
    questionTopic: "Payment Integration",
    questionText: "How would you like the web app to process payments?",
    userResponse: [
      { optionIndex: 0, optionText: "Stripe (Credit Card)", price: 1700 },
      { optionIndex: 5, optionText: "Paymark", price: 1400 },
    ],
  },
];
export default TestingData;
