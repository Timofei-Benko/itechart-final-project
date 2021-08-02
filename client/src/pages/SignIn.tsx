import React, { FunctionComponent, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, Redirect } from 'react-router-dom';

import * as apiService from '../common/apiService';
import {
  SET_SIGN_UP_ERROR_DISPLAY,
  SET_SIGN_UP_ERROR_STATUS,
} from '../redux/actions';
import { ERRORS } from '../common/config/constants';
import { RootState } from '../common/config/interfaces';

import ContentContainer from '../components/dumb/ContentContainer';
import Form from '../components/dumb/Form';
import FormHeader from '../components/dumb/FormHeader';
import FormTitle from '../components/dumb/Title';
import Input from '../components/dumb/Input';
import InputError from '../components/dumb/InputError';
import SubmitBtn from '../components/dumb/SubmitBtn';
import ButtonLink from '../components/dumb/ButtonLink';

const SignIn: FunctionComponent = (): JSX.Element => {
  const [redirect, setRedirect] = useState<boolean>(false);

  const [signInData, setSignInData] = useState<{
    email: string;
    password: string;
  }>({
    email: '',
    password: '',
  });

  const [emailError, setEmailError] = useState<{
    display: boolean;
    message: string;
  }>({
    display: false,
    message: ERRORS.INVALID_EMAIL,
  });

  const [passwordError, setPasswordError] = useState<{
    display: boolean;
    message: string;
  }>({
    display: false,
    message: ERRORS.INVALID_PASSWORD,
  });

  const signUpError = useSelector((state: RootState) => state.signUpError);
  const dispatch = useDispatch();

  useEffect(() => {
    // cleanup to allow coming back to sign up page
    dispatch({
      type: SET_SIGN_UP_ERROR_STATUS,
      payload: false,
    });
  }, []);

  const inputChangeHandler = (e): void => {
    // cleanup to remove errors
    setEmailError({
      ...emailError,
      display: false,
    });

    setPasswordError({
      ...passwordError,
      display: false,
    });

    dispatch({
      type: SET_SIGN_UP_ERROR_DISPLAY,
      payload: false,
    });

    let name: string = e.target.name;
    let value: string = e.target.value;

    setSignInData({
      ...signInData,
      [name]: value,
    });
  };

  const setDataToLS = (token: string, userId: string): void => {
    localStorage.setItem('token', token);
    localStorage.setItem('user_id', userId);
    localStorage.setItem('is_signed_in', '1');
  };

  const handleSubmit = async (e): Promise<void> => {
    e.preventDefault();

    try {
      const response = await apiService.signIn(signInData);
      setDataToLS(response.data.token, response.data.user._id);
      setRedirect(true);
    } catch (e) {
      if (e.response.status === 404) {
        setEmailError({
          ...emailError,
          display: true,
        });
      }

      if (e.response.status === 401) {
        setPasswordError({
          ...passwordError,
          display: true,
        });
      }
    }
  };

  const errorMessageStyles = {
    marginBottom: '1rem',
    color: '#cf6c6c',
    fontSize: '.8rem',
    fontStyle: 'italic',
  };

  return (
    <ContentContainer height="100vh">
      {redirect && <Redirect to={'/personal-space'} />}
      <Form onSubmit={handleSubmit}>
        <FormTitle>Sign In</FormTitle>
        <FormHeader>
          Don't have an account?
          <NavLink to="/register">
            <ButtonLink>Sign Up</ButtonLink>
          </NavLink>
        </FormHeader>
        {signUpError.display && (
          <span style={errorMessageStyles}>{signUpError.message}</span>
        )}
        <Input
          onChange={inputChangeHandler}
          required
          type={'email'}
          name={'email'}
          placeholder={'Email *'}
          // @ts-ignore
          withError={true}
        />
        <InputError
          // @ts-ignore
          errorDisplay={emailError.display}
          errorMessage={emailError.message}
        />
        <Input
          onChange={inputChangeHandler}
          required
          type={'password'}
          name={'password'}
          placeholder={'Password *'}
          autoComplete={'current-password'}
          // @ts-ignore
          withError={true}
        />
        <InputError
          // @ts-ignore
          errorDisplay={passwordError.display}
          errorMessage={passwordError.message}
        />
        <SubmitBtn type={'submit'} value="Sign In" />
      </Form>
    </ContentContainer>
  );
};

export default SignIn;
