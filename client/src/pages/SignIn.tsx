import React, { FunctionComponent, useState } from "react";
import { NavLink } from "react-router-dom";

import ContentContainer from "../components/dumb/ContentContainer";
import Form from "../components/dumb/Form";
import Input from "../components/dumb/Input";
import SubmitBtn from "../components/dumb/SubmitBtn";
import ButtonLink from "../components/dumb/ButtonLink";

const SignIn = (): JSX.Element => {
    return (
        <ContentContainer>
            <Form>
                <h1 style={
                    {
                        letterSpacing: '2px',
                        fontWeight: 'bold',
                        color: 'coral',
                        textShadow: '2px 2px gray',
                    }
                }
                >Sign In
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
                >Don't have an account?
                    <NavLink to='/register'>
                        <ButtonLink>Sign Up</ButtonLink>
                    </NavLink>
                </div>
            </Form>
        </ContentContainer>
    )
};

export default SignIn;