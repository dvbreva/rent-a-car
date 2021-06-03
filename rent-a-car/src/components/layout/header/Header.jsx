import './Header.css';
import { useEffect, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { logout, isUserAdmin } from '../../../core/services/AuthService';

const Header = () => {
    const [redirect, setRedirect] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        const roleResult = isUserAdmin();
        setIsAdmin(roleResult);
    }, []);

    const onLogout = () => {
        logout();
        setRedirect(true);
    };
    return (
        <>
            {redirect && <Redirect to="/login" />}
            <header className="header">
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <a className="navbar-brand m-2" href="#">
                        Rent-a-Car
                    </a>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-toggle="collapse"
                        data-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div
                        className="collapse navbar-collapse"
                        id="navbarSupportedContent"
                    >
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item active">
                                <Link className="nav-link" to="/">
                                    Home
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/cars-list">
                                    Cars List
                                </Link>
                            </li>
                            {isAdmin ? (
                                <>
                                    <li className="nav-item">
                                        <Link
                                            className="nav-link mr-2"
                                            to="/users-list"
                                        >
                                            Users List
                                        </Link>
                                    </li>
                                </>
                            ) : null}
                        </ul>
                        <span className="logout-btn" onClick={onLogout}>
                            Logout
                        </span>
                    </div>
                </nav>
            </header>
        </>
    );
};

export default Header;
