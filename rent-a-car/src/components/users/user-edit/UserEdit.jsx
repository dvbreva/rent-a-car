import { useState, useEffect } from 'react';
import { Redirect } from 'react-router';
import { getUserById } from '../../../core/services/UserService';
import { saveUser } from './../../../core/services/UserService';
import './UserEdit.css';

const DEFAULT_USER_STATE = {
    name: '',
    email: '',
    phone: '',
    isAdmin: false,
    password: ''
};

function EditUser(props) {
    const [editedUser, setEditedUser] = useState(DEFAULT_USER_STATE);
    const [shouldRedirect, setShouldRedirect] = useState(false);

    useEffect(() => {
        if (props.computedMatch.params.id) {
            getUserById(props.computedMatch.params.id).then(response => {
                setEditedUser(response.data);
            });
        }
    }, [props.computedMatch.params.id]);

    const onInputChange = event => {
        setEditedUser(prevState => ({
            ...prevState,
            [event.target.name]: event.target.value.trim()
        }));
    };

    const onFormSubmit = event => {
        event.preventDefault();
        saveUser(editedUser).then(_ => {
            setShouldRedirect(true);
        });
    };

    const handleClearClick = () => {
        setEditedUser(DEFAULT_USER_STATE);
    };

    return (
        <>
            {shouldRedirect && <Redirect to="/users-list" />}
            <div className="user-edit-wrapper">
                <form className="user-edit-form" onSubmit={onFormSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">*Name: </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            className="form-control"
                            value={editedUser.name}
                            onChange={onInputChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">*Email: </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            className="form-control"
                            value={editedUser.email}
                            onChange={onInputChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="phone">*Phone: </label>
                        <input
                            type="tel"
                            id="phone"
                            name="phone"
                            className="form-control"
                            value={editedUser.phone}
                            onChange={onInputChange}
                            pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">*Password: </label>
                        <input
                            type="text"
                            id="password"
                            name="password"
                            className="form-control"
                            value={editedUser.password}
                            onChange={onInputChange}
                            required
                        />
                    </div>

                    <button className="btn btn-primary mb-3">Save</button>
                    <button
                        className="btn btn-secondary"
                        onClick={handleClearClick}
                    >
                        Clear
                    </button>
                </form>
            </div>
        </>
    );
}

export default EditUser;
