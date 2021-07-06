import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import styled from 'styled-components/macro';

const Aside = styled.aside`
  display: flex;
  flex: 1;
  flex-direction: column;
  padding-right: 2rem;
  margin-right: 2rem;
  max-width: max-content;
  border-right: 2px solid gray;

  a {
    position: relative;
    display: block;
    text-decoration: none;
    height: 40px;
    color: black;
    transition: color .2s ease-in-out;
    white-space: nowrap;

    &:visited {
      color: initial;
    }

    &:after {
      content: '';
      position: absolute;
      bottom: 10px;
      display: block;
      height: 3px;
      width: 100%;
      background-color: #c6969f;
      transform: scale(0);
      transition: transform .2s ease-in-out;
    }

    &:is(.active, :hover) {
      color: #c6969f;
      
      &:after {
        transform: scale(1);
      }
    }
  }
`;

const Sidebar =  (props): JSX.Element => {
    const {
        location,
        path
    } = props;

    const isAccountTabActive = location.pathname === `${path}/account`;
    const isQuestionsTabActive = location.pathname === `${path}/questions`;

    return (
        <Aside>
            <Link
                to={`${path}/account`}
                className={isAccountTabActive ? 'active' : ''}
            >Account
            </Link>
            <Link
                to={`${path}/questions`}
                className={isQuestionsTabActive ? 'active' : ''}
            >My Questions
            </Link>
        </Aside>
    );
};

export default withRouter(Sidebar);
