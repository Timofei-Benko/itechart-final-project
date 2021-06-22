import React, { FunctionComponent } from "react";
import 'normalize.css';
import GlobalStyle from "./components/dumb/GlobalStyle";
import SignUp from './pages/SignUp';

const App: FunctionComponent = (): JSX.Element => {
    return (
        <>
            <GlobalStyle/>
            <SignUp/>
        </>
    );
};

export default App;
