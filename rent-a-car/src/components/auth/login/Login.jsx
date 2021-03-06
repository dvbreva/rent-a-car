import { useState } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { login } from '../../../core/services/AuthService';
import './Login.css';

export function Login(props) {
    const [userData, setUserData] = useState(null);
    const [redirect, setRedirect] = useState(false);
    const [error, setError] = useState('');

    const onInputChange = event => {
        event.persist();
        setUserData(prevState => ({
            ...prevState,
            [event.target.name]: event.target.value
        }));
    };

    const onFormSubmit = event => {
        event.preventDefault();

        login(userData)
            .then(_ => {
                setRedirect(true);
            })
            .catch(err => setError(err.message));
    };

    return (
        <>
            {redirect && <Redirect to="/" />}
            <div className="login-form-wrapper">
                <form className="login-form" onSubmit={onFormSubmit}>
                    {error && <span className="text-danger">{error}</span>}
                    <div className="form-group">
                        <label htmlFor="email">Email: </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            className="form-control"
                            onChange={onInputChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password: </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            className="form-control"
                            onChange={onInputChange}
                            required
                        />
                    </div>
                    <button className="btn btn-primary mb-2">Login</button>
                    <div>
                        <Link to="/register">Do not have an account yet?</Link>
                    </div>
                </form>
            </div>
        </>
    );
}
