import React, { Component } from 'react';
import axios from 'axios';

class Login extends Component {
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
            .post('http://localhost:3300/api/login', this.state)
            .then(res => {
                localStorage.setItem('authorization', res.data.token);
                this.props.history.push('/users');
            })
            .catch(err => {
                console.error('Unable to login', err);
            });
    };

    render() {
        return (
            <>
                <h2>Login</h2>
                <form onSubmit={this.submitForm}>
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        name="username"
                        value={this.state.username}
                        onChange={this.handleChange}
                    />
                    <br />
                    <br />
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        name="password"
                        onChange={this.handleChange}
                        value={this.state.password}
                    />
                    <div>
                        <button type="submit">Submit</button>
                    </div>
                </form>
            </>
        );
    }
}

export default Login;
