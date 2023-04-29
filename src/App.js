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
        </Routes>
      </Router>
    </div>
  );
}

export default App;
