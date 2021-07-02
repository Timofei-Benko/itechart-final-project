import React, { FunctionComponent, useEffect, useRef } from "react";
import { BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom";

import store from "./redux/store";
import useUserStore from './redux/hooks/useUserStore';

import keepSignedIn from './common/authentication/keepSignedIn';
import isSignedIn from "./common/authentication/isSignedIn";

import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import PersonalSpace from "./pages/PersonalSpace";

import 'normalize.css';
import GlobalStyle from "./components/dumb/GlobalStyle";

const App: FunctionComponent = (): JSX.Element => {

    useEffect(() => {
        keepSignedIn();

        if (isSignedIn()) {
            store.dispatch(useUserStore());
            // store.dispatch(useUserQuestionStore());
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
            </Switch>

            {
                isSignedIn()
                    ?
                    <Switch>
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
