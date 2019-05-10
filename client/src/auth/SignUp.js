import React, { Component } from 'react';
import axios from 'axios';

import '../App.css'

class SignUp extends Component {
    state = {
        username: '',
        password: '',
    };

    handleChange = event => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    };

    submitForm = e => {
        e.preventDefault();
        axios
            .post('http://localhost:3300/api/register', this.state)
            .then(res => {
                localStorage.setItem('authorization', res.data.token);
                this.props.history.push('/jokes');
            })
            .catch(err => {
                console.error('Unable to sign up', err);
            });
    };

    render() {
        return (
            <>
                <h2>Sign Up</h2>
                <form onSubmit={this.submitForm}>
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        name="username"
                        value={this.state.username}
                        onChange={this.handleChange}
                    />
                    <br />
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        name="password"
                        onChange={this.handleChange}
                        value={this.state.password}
                    />
                    <br />
                    <label htmlFor="department">Department:</label>
                    <input
                        type="text"
                        name="department"
                        value={this.state.department}
                        onChange={this.handleChange}
                    />
                    <div>
                        <button type="submit">Submit</button>
                    </div>
                </form>
            </>
        );
    }
}

export default SignUp;
