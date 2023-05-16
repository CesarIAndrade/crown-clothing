import { useState } from "react";

import {
  signInWithGooglePopup,
  registerUserInFirestore,
  _signInWithEmailAndPassword,
} from "../../utils/firebase/firebase.component";

import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";

import "./sign-in.styles.scss";

const initialState = {
  email: "",
  password: "",
};

const SignInForm = () => {
  const [formFields, setFormFields] = useState(initialState);
  const { email, password } = formFields;

  const signInWithGoogle = async () => {
    let { user } = await signInWithGooglePopup();
    await registerUserInFirestore(user);
  };

  const resetFormFields = () => {
    setFormFields(initialState);
  };

  const onChangeHandler = (event) => {
    let { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      let response = await _signInWithEmailAndPassword(email, password);
      // await registerUserInFirestore(user);
      resetFormFields();
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="sign-up-container">
      <h2>Already have an account?</h2>
      <span>Sign In with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Email"
          type="email"
          name="email"
          value={email}
          onChange={onChangeHandler}
          required
        />
        <FormInput
          label="Password"
          type="password"
          name="password"
          value={password}
          onChange={onChangeHandler}
          required
        />
        <div className="buttons-container">
          <Button>Sign In</Button>
          <Button type="button" buttonType="google" onClick={signInWithGoogle}>
            Google Sign In
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SignInForm;
