import React, { FunctionComponent } from "react";
import styled from 'styled-components/macro';
import { NavLink } from 'react-router-dom';

import isSignedIn from "../../common/authentication/isSignedIn";

import ContentContainer from "../dumb/ContentContainer";
import ButtonLink from "../dumb/ButtonLink";
import Title from "../dumb/Title";

const Nav = styled.nav`
  position: relative;
  z-index: 1000;
  display: flex;
  width: 100%;
  height: 100px;
  justify-content: center;
  background-color: #FFFFFF;
  -webkit-box-shadow: 2px 9px 34px 0px #999999;
  box-shadow: 2px 9px 34px 0px #999999;
`;

const NavContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  margin: 0 1rem;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 1rem;
  width: 100%;
  max-width: 400px;
`;

const NavTitle = styled(Title)`
  font-size: 2rem;
  color: pink;
  letter-spacing: 1px;
`;

const Header: FunctionComponent = (): JSX.Element => {
    return (
        <Nav>
            <ContentContainer>
                <NavContainer>
                    <>
                        <NavTitle>Not stack overflow</NavTitle>
                    </>
                    <>
                        <ButtonContainer>
                            <NavLink to={'/questions'}>
                                <ButtonLink>Questions</ButtonLink>
                            </NavLink>
                            {
                                isSignedIn() ?
                                    <NavLink to={'/personal-space'}>
                                        <ButtonLink>Personal space</ButtonLink>
                                    </NavLink>
                                    :
                                    <NavLink to={'/login'}>
                                        <ButtonLink>Sign in</ButtonLink>
                                    </NavLink>
                            }
                        </ButtonContainer>
                    </>
                </NavContainer>
            </ContentContainer>
        </Nav>
    )
};

export default Header;
