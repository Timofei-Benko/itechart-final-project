import React, { FunctionComponent, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import useAuth from './common/authentication/useAuth';

import { SET_AUTHENTICATION_STATUS } from './redux/actions';
import { RootState } from './common/config/interfaces';

import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import PersonalSpace from './pages/PersonalSpace';
import Home from './pages/Home';

import 'normalize.css';
import GlobalStyle from './components/dumb/GlobalStyle';

const App: FunctionComponent = (): JSX.Element => {
  const dispatch = useDispatch();

  const setIsSignedInStatus = async () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { isSignedIn } = await useAuth();
    dispatch({
      type: SET_AUTHENTICATION_STATUS,
      payload: isSignedIn,
    });
  };

  useEffect(() => {
    setIsSignedInStatus();
  }, []);

  const isSignedIn = useSelector(
    (state: RootState) => state.authenticationStatus
  );

  return (
    <Router>
      <GlobalStyle />

      <Switch>
        <Route path="/login">
          <SignIn />
        </Route>

        <Route path="/register">
          <SignUp />
        </Route>

        <Route path="/home">
          <Home />
        </Route>
      </Switch>

      {isSignedIn ? (
        <Switch>
          <Route exact path="/">
            <Redirect to="/personal-space" />
          </Route>
          <Route path="/personal-space">
            <PersonalSpace />
          </Route>
        </Switch>
      ) : (
        <Redirect to="/login" />
      )}
    </Router>
  );
};

export default App;
