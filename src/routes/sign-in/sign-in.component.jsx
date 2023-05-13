import { signInWithGooglePopup, registerUserInFirestore } from "../../utils/firebase/firebase.component";

const SignIn = () => {
  const logGoogleUser = async () => {
    let { user } = await signInWithGooglePopup();
    let userRef = await registerUserInFirestore(user);
    console.log(userRef);
  };

  return (
    <>
      <button onClick={logGoogleUser}>Sign In</button>
    </>
  );
};

export default SignIn;
