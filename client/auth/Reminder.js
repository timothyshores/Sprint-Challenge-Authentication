import React from 'react';
import { Link } from 'react-router-dom';

import '../App.css';

function Reminder() {
    return (
        <>
            {localStorage.authorization
                ? null
                : <h4>Please <Link to="/register">sign up</Link> or <Link to="/login">login</Link></h4>
            }
        </>
    );
}

export default Reminder;
