import { firebaseApp } from "../firebase";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const auth = getAuth(firebaseApp);

const SignOut = () => {

    const signOutButtonStyle = {
        marginLeft: 'auto', // This will push the button to the right
        backgroundColor: '#000000', // Blue color
        color: 'white',
        padding: '8px 16px',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
      };

    return auth.currentUser && (
        <button style={signOutButtonStyle} onClick={() => auth.signOut()}>Sign Out</button>
    ) 
}

export default SignOut;