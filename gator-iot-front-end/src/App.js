import About from './Components/About';
import DisplayText from './Components/DisplayText';
import NavBar from './Components/NavBar';
import SignIn from './Components/SignIn';

import { getAuth } from 'firebase/auth';

import { useAuthState, userAuthState } from 'react-firebase-hooks/auth';
import { firebaseApp } from './firebase';

const auth = getAuth(firebaseApp);

function App() {

  const [user] = useAuthState(auth);

  const pageStyle = {
    background: 'linear-gradient(to right, #ff8c00, #0074cc)', // Orange to blue gradient
    height: '100vh',
    overflow: 'hidden',
  };

  const centerContainerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center', // Center horizontally
    justifyContent: 'center', // Center vertically
  };


  return (
    <div style = {pageStyle}>
      <NavBar />
      <section style={user ? {} : centerContainerStyle}>
        {user ? <DisplayText /> : <SignIn />}
      </section>
      <About />
    </div>
  );
}

export default App;
