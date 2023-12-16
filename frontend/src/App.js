import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { BrowserRouter } from 'react-router-dom';
import Home from './home/Home.tsx';


const App = () => {
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

