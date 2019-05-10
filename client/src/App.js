import React from 'react';
import { Route, NavLink } from 'react-router-dom';

import Login from './auth/Login';
import SignUp from './auth/SignUp';
import Jokes from './jokes/Jokes';
import Reminder from './auth/Reminder';

import './App.css';

function App(props) {
    const logout = () => {
        localStorage.removeItem('authorization');
        window.location.pathname = '/'
    }

    return (
        <div className="App">
            <header className="App-header">
                <h1>Sprint Challenge Authentication</h1>
                <NavLink to="/jokes">Jokes</NavLink>
                &nbsp; | &nbsp;
                <NavLink to="/register">Sign Up</NavLink>
                &nbsp; | &nbsp;
                <NavLink to="/login">Login</NavLink>
                &nbsp; | &nbsp;
                <a href="/" onClick={logout}>Logout</a>
            </header>
            <main>
                <Route path="/jokes" component={Jokes} />
                <Route path="/register" component={SignUp} />
                <Route path="/login" component={Login} />
                <Route exact path="/" component={Reminder} />
            </main>
        </div>
    );
}

export default App;
