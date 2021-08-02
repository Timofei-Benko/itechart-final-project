import React, { FunctionComponent, useState } from 'react';
import { NavLink, Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { ISignUpUserData, RootState } from '../common/config/interfaces';

import { PASSWORD_VALIDATION, ERRORS } from '../common/config/constants';

import { SET_SIGN_UP_ERROR } from '../redux/actions';

import * as apiService from '../common/apiService';

import ContentContainer from '../components/dumb/ContentContainer';
import Form from '../components/dumb/Form';
import FormTitle from '../components/dumb/Title';
import FormHeader from '../components/dumb/FormHeader';
import Input from '../components/dumb/Input';
import Delimiter from '../components/dumb/Delimiter';
import SubmitBtn from '../components/dumb/SubmitBtn';
import InputError from '../components/dumb/InputError';
import LanguagesMultiSelect from '../components/smart/MultiSelect';
import ButtonLink from '../components/dumb/ButtonLink';

const SignUp: FunctionComponent = (): JSX.Element => {
  const [userData, setUserData] = useState<Partial<ISignUpUserData>>({});

  const [languageList, setLanguageList] = useState<
    Array<{ value?: string; label?: string }>
  >([]);

  const [passwordError, setPasswordError] = useState<{
    message: string;
    display: boolean;
  }>({
    message: '',
    display: false,
  });

  const [redirect, setRedirect] = useState<boolean>(false);

  const signUpError = useSelector((state: RootState) => state.signUpError);
  const dispatch = useDispatch();

  const getRequestBody = (): ISignUpUserData => {
    const {
      firstName,
      lastName,
      email,
      password,
      username,
      position,
      experience,
    } = userData as Omit<ISignUpUserData, 'passwordConfirmation'>;

    return {
      firstName,
      lastName,
      email,
      password,
      username,
      position,
      experience,
      languages: languageList.map((el) => el.value),
    };
  };

  const handleSubmit = async (e): Promise<void> => {
    e.preventDefault();

    const isValidPass: boolean = PASSWORD_VALIDATION.test(
      userData.password as string
    );

    if (!isValidPass) {
      setPasswordError({
        ...passwordError,
        message: ERRORS.INVALID_PASSWORD_FORMAT,
        display: !isValidPass,
      });
      return;
    }

    const isSamePass: boolean =
      (userData.password as string) ===
      (userData.passwordConfirmation as string);

    if (!isSamePass) {
      setPasswordError({
        ...passwordError,
        message: ERRORS.PASSWORDS_DO_NOT_MATCH,
        display: !isSamePass,
      });
      return;
    } else {
      setPasswordError({
        ...passwordError,
        display: !isSamePass,
      });
    }

    try {
      await apiService.signUp(getRequestBody());
      setRedirect(true);
    } catch (e) {
      if (e.response.status === 409) {
        dispatch({
          type: SET_SIGN_UP_ERROR,
          payload: {
            status: true,
            display: true,
            message: ERRORS.ALREADY_SIGNED_UP,
          },
        });
      }
    }
  };

  const inputChangeHandler = (e): void => {
    const name: string = e.target.name;
    const value: string = e.target.value;

    if (name === 'experience') {
      const experience: number | undefined = parseInt(value);

      setUserData({
        ...userData,
        experience: Number.isNaN(experience) ? undefined : experience,
      });
      return;
    }

    if (!value) {
      setUserData({
        ...userData,
        [name]: undefined,
      });
      return;
    }

    setUserData({
      ...userData,
      [name]: value,
    });
  };

  return (
    <>
      {(signUpError.status || redirect) && <Redirect to="/login" />}
      <ContentContainer height={'100vh'}>
        <Form onSubmit={handleSubmit}>
          <FormTitle>Sign Up</FormTitle>
          <FormHeader>
            Already have an account?
            <NavLink to="/login">
              <ButtonLink>Sign In</ButtonLink>
            </NavLink>
          </FormHeader>
          <Input
            onChange={inputChangeHandler}
            required
            type={'text'}
            name={'firstName'}
            placeholder={'First Name *'}
          />
          <Input
            onChange={inputChangeHandler}
            required
            type={'text'}
            name={'lastName'}
            placeholder={'Last Name *'}
          />
          <Input
            onChange={inputChangeHandler}
            required
            type={'email'}
            name={'email'}
            placeholder={'Email *'}
          />
          <Input
            onChange={inputChangeHandler}
            required
            type={'password'}
            name={'password'}
            placeholder={'Password *'}
            autoComplete={'new-password'}
            // @ts-ignore
            withError={true}
            errorDisplay={passwordError.display}
          />
          <InputError
            // @ts-ignore
            errorDisplay={passwordError.display}
            errorMessage={passwordError.message}
          />
          <Input
            onChange={inputChangeHandler}
            required
            type={'password'}
            name={'passwordConfirmation'}
            placeholder={'Confirm Password *'}
            autoComplete={'new-password'}
            // @ts-ignore
            errorDisplay={passwordError.display}
          />
          <Delimiter />
          <Input
            onChange={inputChangeHandler}
            type={'text'}
            name={'username'}
            placeholder={'Username'}
          />
          <Input
            onChange={inputChangeHandler}
            type={'text'}
            name={'position'}
            placeholder={'Position'}
          />
          <Input
            onChange={inputChangeHandler}
            type={'number'}
            name={'experience'}
            placeholder={'Years of Experience'}
          />
          {/*<label style={{ marginBottom: '.5rem' }}>List your preferred technologies, comma separated</label>*/}
          {/*<span style={{*/}
          {/*    marginBottom: '.5rem',*/}
          {/*    fontStyle: 'italic',*/}
          {/*    fontSize: '.9rem',*/}
          {/*    color: 'gray',*/}
          {/*}}>(e.g. JS, React, VueJS, NodeJS, ...)</span>*/}
          {/*<Input onChange={inputChangeHandler}*/}
          {/*       type={'text'} name={'languages'} />*/}
          <LanguagesMultiSelect
            languageList={languageList}
            setLanguageList={setLanguageList}
          />
          <SubmitBtn type={'submit'} value="Sign Up" />
        </Form>
      </ContentContainer>
    </>
  );
};

export default SignUp;
