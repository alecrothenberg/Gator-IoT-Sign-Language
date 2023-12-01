import { firebaseApp } from "../firebase";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const auth = getAuth(firebaseApp);

const SignIn = () => {
    const signInButtonStyle = {
        display: 'block',
        backgroundColor: '#000000', // Blue color
        color: 'white',
        padding: '8px 16px',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
      };

    const signInWithGoogle = () => {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider);
    }
    return (
        <button style={signInButtonStyle} onClick={signInWithGoogle}>Sign in with Google</button>
    ) 
}

export default SignIn;