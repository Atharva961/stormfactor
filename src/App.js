import './App.css';
import Login from './Login';
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import Home from './Home';
import Signup from './Signup';
import Navbar from './Navbar';
import Chatbot from './Chatbot';
import Crops from './Crops';
import Schemes from './Schemes';

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar/>
        <Routes>
          <Route exact path="/" element={<Home/>} />
          <Route exact path="/login" element={<Login/>} />
          <Route exact path="/signup" element={<Signup/>} />
          <Route exact path="/chatbot" element={<Chatbot/>}/>
          <Route exact path="/crops" element={<Crops/>}/>
          <Route exact path="/schemes" element={<Schemes/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
