import { AuthError } from "firebase/auth";
import { ChangeEvent, FormEvent, useState } from "react";
import { useDispatch } from "react-redux";

import {
  emailSignInStart,
  googleSignInStart,
} from "../../store/user/user.action";

import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";
import FormInput from "../form-input/form-input.component";

import {
  ButtonsContainer,
  SignUpContainer,
  Title,
} from "./sign-in-form.styles";

const defaultFormFields = {
  email: "",
  password: "",
};

/// SignInForm ///////////////////////////////////////////
function SignInForm() {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;

  const dispatch = useDispatch();

  // reset form fields when finished sign-in
  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  // sign in use google account
  const signInWithGoogle = async () => {
    dispatch(googleSignInStart());
    // await signInWithGooglePopup();
  };

  // sign in use email & password (form submit)
  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      // const { user } = await signInAuthUserWithEmailAndPassword(
      //   email,
      //   password
      // );
      dispatch(emailSignInStart(email, password));
      resetFormFields();
    } catch (error) {
      // const typedError = error as { code: string };
      switch ((error as AuthError).code) {
        case "auth/wrong-password":
          alert("incorrect password for email");
          break;
        case "auth/user-not-found":
          alert("no user associated with this email");
          break;
        default:
          console.log(error);
      }
    }
  }

  // track all of the form input
  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  }

  return (
    <SignUpContainer>
      <Title>Already have an account</Title>
      <span>Sign in with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Email"
          type="email"
          name="email"
          value={email}
          onChange={handleChange}
          required
        />

        <FormInput
          label="Password"
          type="password"
          name="password"
          value={password}
          onChange={handleChange}
          required
        />
        <ButtonsContainer>
          <Button type="submit">Sign in</Button>
          <Button
            type="button"
            onClick={signInWithGoogle}
            buttonType={BUTTON_TYPE_CLASSES.google}
          >
            google sign in
          </Button>
        </ButtonsContainer>
      </form>
    </SignUpContainer>
  );
}

export default SignInForm;
