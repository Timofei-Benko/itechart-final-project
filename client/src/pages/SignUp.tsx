import React, { FunctionComponent, useState } from "react";
import { NavLink } from "react-router-dom";

import * as apiService from '../common/apiService';

import ContentContainer from '../components/dumb/ContentContainer';
import Form from '../components/dumb/Form';
import Input from '../components/dumb/Input';
import Delimiter from '../components/dumb/Delimiter';
import SubmitBtn from '../components/dumb/SubmitBtn';
import PasswordError from '../components/dumb/PasswordError';
import LanguagesMultiSelect from '../components/smart/MultiSelect';
import ButtonLink from '../components/dumb/ButtonLink';

import { ISignUpUserData } from '../config/interfaces';
import { PASSWORD_VALIDATION } from '../components/constants';

const SignUp: FunctionComponent = (): JSX.Element => {

    const [userData, setUserData] = useState<ISignUpUserData>({});

    const [languageList, setLanguageList] = useState<Array<{ value?: string, label?: string}>>([]);

    const [error, setError] = useState({
        message: '',
        display: false,
    });

    const getRequestBody = (): { user: ISignUpUserData } => {
        const {
            firstName,
            lastName,
            email,
            password,
            username,
            position,
            experience
        } = userData;

        return {
            user: {
                firstName,
                lastName,
                email,
                password,
                username,
                position,
                experience,
                languages: languageList.map(el => el.value),
            }
        };
    };

    const handleSubmit = async (e): Promise<void> => {
        e.preventDefault();

        const isValidPass: boolean = PASSWORD_VALIDATION.test(userData.password as string);

        if (!isValidPass) {
            setError({
                ...error,
                message: 'password must be at least 9 characters long, contain upper-, lowercase letters and' +
                    ' special symbols',
                display: !isValidPass,
            });
            return;
        }

        const isSamePass: boolean = userData.password as string === userData.passwordConfirmation as string;

        if (!isSamePass) {
            setError({
                ...error,
                message: 'passwords do not match',
                display: !isSamePass,
            });
            return;
        } else {
            setError({
                ...error,
                display: !isSamePass,
            });
        }

        let response;

        try {
            await apiService.signUp(getRequestBody());
        } catch(e) {
            if (e.response.status === 409) {
                // do something if user already exists
            }
        }
    };

    const inputChangeHandler = (e): void => {
        let name: string = e.target.name;
        let value: string = e.target.value;

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
            <ContentContainer>
                <Form onSubmit={ handleSubmit }>
                    <h1 style={
                        {
                            letterSpacing: '2px',
                            fontWeight: 'bold',
                            color: 'coral',
                            textShadow: '2px 2px gray',
                        }
                    }
                    >Sign Up
                    </h1>
                    <div
                        style={
                        {
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            gap: '1rem',
                            marginBottom: '1rem'
                        }
                    }
                    >Already have an account?
                        <NavLink to='/login'>
                            <ButtonLink>Sign In</ButtonLink>
                        </NavLink>
                    </div>
                    <Input onChange={inputChangeHandler}
                           required type={'text'} name={'firstName'} placeholder={'First Name *'} />
                    <Input onChange={inputChangeHandler}
                           required type={'text'} name={'lastName'} placeholder={'Last Name *'} />
                    <Input onChange={inputChangeHandler}
                           required type={'email'} name={'email'} placeholder={'Email *'} />
                    <Input onChange={inputChangeHandler}
                           required
                           type={'password'}
                           name={'password'}
                           placeholder={'Password *'}
                           autoComplete={'new-password'}
                           // @ts-ignore
                           withError={ true }
                           errorDisplay={ error.display }
                    />
                    <PasswordError
                        // @ts-ignore
                        errorDisplay={ error.display }
                        errorMessage={ error.message }
                    />
                    <Input onChange={inputChangeHandler}
                           required
                           type={'password'}
                           name={'passwordConfirmation'}
                           placeholder={'Confirm Password *'}
                           autoComplete={'new-password'}
                            // @ts-ignore
                           errorDisplay={ error.display }
                    />
                    <Delimiter />
                    <Input onChange={inputChangeHandler}
                           type={'text'} name={'username'} placeholder={'Username'} />
                    <Input onChange={inputChangeHandler}
                           type={'text'} name={'position'} placeholder={'Position'} />
                    <Input onChange={inputChangeHandler}
                           type={'number'} name={'experience'} placeholder={'Years of Experience'} />
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
                        languageList={ languageList }
                        setLanguageList={ setLanguageList }
                    />
                    <SubmitBtn type={'submit'}/>
                </Form>
            </ContentContainer>
        </>
    )
};

export default SignUp;
