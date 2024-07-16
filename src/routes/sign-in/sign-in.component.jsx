import Button from "../../components/button/button.component";
import SignUpForm from "../../components/sign-up-form/sign-up-form.component";
import {
  signInWithGooglePopup,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils";

function SignIn() {
  const logGoogleUser = async () => {
    const { user } = await signInWithGooglePopup();
    const userDocRef = await createUserDocumentFromAuth(user);
  };

  return (
    <div>
      <h1>Sign in page</h1>
      <Button buttonType="google" onClick={logGoogleUser}>
        sign in with Google Popup
      </Button>
      <SignUpForm />
    </div>
  );
}

export default SignIn;
