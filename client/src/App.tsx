import React, { FunctionComponent } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';

import 'normalize.css';
import GlobalStyle from "./components/dumb/GlobalStyle";


const App: FunctionComponent = (): JSX.Element => {
    return (
        <Router>
            <GlobalStyle/>
            <Switch>
                <Route path='/login'>
                    <SignIn />
                </Route>
                <Route path='/register'>
                    <SignUp />
                </Route>
            </Switch>
        </Router>
    );
};

export default App;
