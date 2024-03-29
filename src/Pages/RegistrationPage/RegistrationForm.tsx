import { Button, Card, Input } from 'antd';
import Form from 'antd/lib/form/Form';
import FormItem from 'antd/lib/form/FormItem';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import isEmail from 'sane-email-validation';
import passwordValidator from 'password-validator';
import { useDispatch, useSelector } from 'react-redux';
import { registerUserAction } from '../../state/user/actions';
import { selectError, selectRegisterUserState } from '../../state/user/selectors';
import { AsyncState } from '../../state/types';

const schema = new passwordValidator();

// Add properties to it
schema
  .is().min(8)                                    // Minimum length 8
  .is().max(100)                                  // Maximum length 100
  .has().uppercase()                              // Must have uppercase letters
  .has().lowercase()                              // Must have lowercase letters
  .has().digits(2)                                // Must have at least 2 digits
  .has().not().spaces()                           // Should not have spaces
  .is().not().oneOf(['Passw0rd', 'Password123']);

interface RegistrationFormProps { }

const RegistrationForm: React.FC<RegistrationFormProps> = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmEmail, setConfirmEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const dispatch = useDispatch();
  const registrationState = useSelector(selectRegisterUserState);
  const error = useSelector(selectError);
  const [submittedEmail, setSubmittedEmail] = useState('');

  const isEmailDuplicate = error && error.code === 'INVALID_EMAIL' && submittedEmail === email;
  const isEmailValid = isEmail(email) && !isEmailDuplicate;

  const emailHelpMessage = isEmailDuplicate
    ? 'This email address is already registered, please provide another email address.'
    : "Please provide a valid email address.";

  const emailValidationStatus = isEmailValid
    ? 'success'
    : isSubmitted ? 'error' : undefined;

  const isConfirmEmailValid = email === confirmEmail;

  const confirmEmailStatus = isConfirmEmailValid
    ? 'success'
    : isSubmitted ? 'error' : undefined;

  const isPasswordValid = schema.validate(password);
  const passwordValidationStatus = isPasswordValid
    ? 'success'
    : isSubmitted ? 'error' : undefined;

  const handleSubmit = () => {
    setIsSubmitted(true);
    setSubmittedEmail(email);
    if (isConfirmEmailValid && isEmailValid && isPasswordValid) {
      dispatch(registerUserAction.request({ email, password }));
    }
  }

  return <Form labelCol={{ span: 5 }}>
    <FormItem
      help={emailValidationStatus == 'error' && emailHelpMessage}
      validateStatus={emailValidationStatus}
      label="Email">
      <Input
        onChange={event => setEmail(event.target.value)}
        value={email}
        type="email" />
    </FormItem>
    <FormItem
      help={confirmEmailStatus == 'error' && 'Must match the email address above.'}
      validateStatus={confirmEmailStatus}
      label="Confirm Email">
      <Input
        onChange={event => setConfirmEmail(event.target.value)}
        value={confirmEmail}
        type="email" />
    </FormItem>
    <FormItem
      help={passwordValidationStatus == 'error' && 'Password must be at least 8 characters, include at least 2 numbers, a lower case and an upper case letter.'}
      validateStatus={passwordValidationStatus}
      label="Password">
      <Input
        onChange={event => setPassword(event.target.value)}
        value={password}
        type="password" />
    </FormItem>
    <FormItem wrapperCol={{ offset: 5 }}>
      <Button htmlType="submit" loading={registrationState == AsyncState.IN_PROGRESS} onClick={handleSubmit} type="primary">Register</Button>
    </FormItem>
    <FormItem wrapperCol={{ offset: 5 }}>
      <Link to="/login">I already have an account, login</Link>
    </FormItem>
  </Form>;
}

export default RegistrationForm;