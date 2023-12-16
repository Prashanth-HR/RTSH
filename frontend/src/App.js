import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './home/Home.tsx';
import { BrowserRouter } from "react-router-dom";

function App() {


  return (
    <>
      <div className="App">
        <BrowserRouter>
          <Home />
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
