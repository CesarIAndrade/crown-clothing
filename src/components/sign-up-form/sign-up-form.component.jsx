import { useState } from "react";

import {
  _createUserWithEmailAndPassword,
  registerUserInFirestore,
} from "../../utils/firebase/firebase.component";

import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";

import "./sign-up.styles.scss";

const initialState = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const SignUpForm = () => {
  const [formFields, setFormFields] = useState(initialState);
  const { displayName, email, password, confirmPassword } = formFields;

  const resetFormFields = () => {
    setFormFields(initialState);
  };

  const onChangeHandler = (event) => {
    let { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      alert("Your password does not match");
      return;
    }
    try {
      let { user } = await _createUserWithEmailAndPassword(email, password);
      await registerUserInFirestore(user, { displayName });
      resetFormFields();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="sign-up-container">
      <h2>Don't have an account?</h2>
      <span>Sign Up with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Display Name"
          type="text"
          name="displayName"
          value={displayName}
          onChange={onChangeHandler}
          required
        />
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
        <FormInput
          label="Confirm Password"
          type="password"
          name="confirmPassword"
          value={confirmPassword}
          onChange={onChangeHandler}
          required
        />
        <Button>Sign Up</Button>
      </form>
    </div>
  );
};

export default SignUpForm;
