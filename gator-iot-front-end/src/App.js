import './App.css';
import ImageDisplayWindow from './Components/imageDisplayWindow';
import NavBar from './Components/NavBar';

var signedInput = "Temp String for now";

function App() {
  return (
    <div>
      <NavBar />
     <ImageDisplayWindow signedTextInput={signedInput}/>
    </div>
  );
}

export default App;
