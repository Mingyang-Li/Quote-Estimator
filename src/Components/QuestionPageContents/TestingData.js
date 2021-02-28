const TestingData = [
  {
    questionNumber: 1,
    questionTopic: "Scale",
    questionText: "How many users will use your application?",
    userResponse: { answerText: "101-500 Users", price: 35000 },
  },
  {
    questionNumber: 2,
    questionTopic: "Purpose",
    questionText: "What will you use it for?",
    userResponse: { answerText: "E-Commerce", price: 5000 },
  },
  {
    questionNumber: 3,
    questionTopic: "Management",
    questionText:
      "Would you like to be able edit content of your application by yourself? (CMS)",
    userResponse: { answerText: "Yes", price: 5000 },
  },
  {
    questionNumber: 4,
    questionTopic: "Appearance",
    questionText:
      "How pretty would you like your application to appear towards users?",
    userResponse: { answerText: "Polished", price: 2900 },
  },
  {
    questionNumber: 5,
    questionTopic: "Users",
    questionText: "How will people use your application?",
    userResponse: [
      { answerText: "FB sign up", price: 1500 },
      { answerText: "Google sign up", price: 1500 },
      { answerText: "Twitter sign up", price: 1500 },
      { answerText: "Email sign up", price: 1500 },
      { answerText: "2-factor authentication", price: 1500 },
      //{ answerText: "Custom", price: 0 },
    ],
  },
  {
    questionNumber: 6,
    questionTopic: "Content Generation",
    questionText: "How will you generate content to your application?",
    userResponse: [
      { answerText: "Activity Feeds", price: 1000 },
      { answerText: "File Uploading", price: 1200 },
      { answerText: "User Profiles", price: 1200 },
      { answerText: "In-app Messaging", price: 1400 },
      { answerText: "Audio/Video Streaming", price: 1600 },
      { answerText: "Global Search", price: 2000 },
      { answerText: "Advanced Filters & Search", price: 2500 },
      //{ answerText: "Custom", price: 0 },
    ],
  },
  {
    questionNumber: 7,
    questionTopic: "Payment Integration",
    questionText: "How would you like the web app to process payments?",
    userResponse: [
      { answerText: "Stripe (Credit Card)", price: 1700 },
      { answerText: "PayPal", price: 1500 },
      { answerText: "Afterpay", price: 1600 },
      { answerText: "LayBuy", price: 1600 },
      { answerText: "Genoapay", price: 1600 },
      { answerText: "Paymark", price: 1400 },
      { answerText: "Bank Transfer", price: 1400 },
      { answerText: "Paystation", price: 1400 },
      //{ answerText: "Custom", price: 0 },
    ],
  },
];
export default TestingData;
