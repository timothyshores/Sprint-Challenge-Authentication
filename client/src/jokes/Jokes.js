import React from 'react';
import axios from 'axios';
import Reminder from '../auth/Reminder';

class Jokes extends React.Component {
    state = {
        jokes: [],
    };

    render() {
        return (
            <>
                <Reminder />
                <h2>Dad Jokes</h2>
                {this.state.jokes.map(joke => (
                    <p key={joke.id}>{joke.joke}</p>
                ))}
            </>
        );
    }

    componentDidMount() {
        const requestConfig = {
            headers: {
                authorization: localStorage.getItem('authorization'),
            },
        };
        axios
            .get('http://localhost:3300/api/jokes', requestConfig)
            .then(res => {
                this.setState({ jokes: res.data });
            })
            .catch(err => console.error(err));
    }
}

export default Jokes;
