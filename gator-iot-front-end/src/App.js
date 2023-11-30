import './App.css';
import About from './Components/About';
import DisplayText from './Components/DisplayText';
import NavBar from './Components/NavBar';


var signedInput = "Temp String for now";

function App() {
  return (
    <div>
      <NavBar />
      <About />
      <DisplayText signedTextInput={signedInput}/>
    </div>
  );
}

export default App;
