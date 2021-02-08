import QuestionPage from './Pages/QuestionPage'
import ResponsesPage from './Pages/ResponsesPage'

function App() {
  const clickedCalculateCost = false;
    switch (clickedCalculateCost) {
      case false:
        return (<QuestionPage/>);
      case true:
        return (<ResponsesPage/>);    
    }
}

export default App;
