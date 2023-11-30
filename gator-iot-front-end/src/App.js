import './App.css';
import About from './Components/About';
import DisplayText from './Components/DisplayText';
import NavBar from './Components/NavBar';


function App() {

  const pageStyle = {
    background: 'linear-gradient(to right, #ff8c00, #0074cc)', // Orange to blue gradient
    height: '100vh',
    overflow: 'hidden',
  };

  return (
    <div style = {pageStyle}>
      <NavBar />
      <DisplayText />
      <About />
    </div>
  );
}

export default App;
