import React, { FunctionComponent, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';

import store from './redux/store';
import useUserStore from './redux/hooks/useUserStore';

import keepSignedIn from './common/authentication/keepSignedIn';
import isSignedIn from './common/authentication/isSignedIn';

import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import PersonalSpace from './pages/PersonalSpace';
import Home from './pages/Home';

import 'normalize.css';
import GlobalStyle from './components/dumb/GlobalStyle';

const App: FunctionComponent = (): JSX.Element => {

    useEffect(() => {
        keepSignedIn();

        if (isSignedIn()) {
            // eslint-disable-next-line react-hooks/rules-of-hooks
            store.dispatch(useUserStore());
        }
    }, []);

    return (
        <Router>
            <GlobalStyle/>

            <Switch>
                <Route path='/login'>
                    <SignIn/>
                </Route>

                <Route path='/register'>
                    <SignUp/>
                </Route>

                <Route path='/home'>
                    <Home/>
                </Route>
            </Switch>

            {
                isSignedIn()
                    ?
                    <Switch>
                        <Route exact path='/'>
                            <Redirect to='/personal-space' />
                        </Route>
                        <Route path='/personal-space'>
                            <PersonalSpace />
                        </Route>
                    </Switch>
                    :
                    <Redirect to='/login' />
            }

        </Router>
    );
};

export default App;
