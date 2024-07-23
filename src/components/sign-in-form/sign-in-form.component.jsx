import { useState } from "react";

import {
  createUserDocumentFromAuth,
  signInAuthUserWithEmailAndPassword,
  signInWithGooglePopup,
} from "../../utils/firebase/firebase.utils";

import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";
import FormInput from "../form-input/form-input.component";

import {
  SignUpContainer,
  Title,
  ButtonsContainer,
} from "./sign-in-form.styles.jsx";

const defaultFormFields = {
  email: "",
  password: "",
};

/// SignInForm ///////////////////////////////////////////
function SignInForm() {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;

  // reset form fields when finished sign-in
  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  // sign in use google account
  const signInWithGoogle = async () => {
    await signInWithGooglePopup();
  };

  // sign in use email & password (form submit)
  async function handleSubmit(event) {
    event.preventDefault();

    try {
      const { user } = await signInAuthUserWithEmailAndPassword(
        email,
        password
      );

      resetFormFields();
    } catch (err) {
      switch (err.code) {
        case "auth/wrong-password":
          alert("incorrect password for email");
          break;
        case "auth/user-not-found":
          alert("no user associated with this email");
          break;
        default:
          console.log(err);
      }
    }
  }

  // track all of the form input
  function handleChange(event) {
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
