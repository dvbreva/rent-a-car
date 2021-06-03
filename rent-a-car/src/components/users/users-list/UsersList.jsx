import { deleteUser, getAllUsers } from '../../../core/services/UserService';
import { useEffect, useState } from 'react';
import { UserCard } from '../user-card/UserCard';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './UsersList.css';
import { getLoggedUser } from '../../../core/services/AuthService';

const UsersList = () => {
    const loggedUser = getLoggedUser();
    const [users, setUsers] = useState([]);

    useEffect(() => {
        handleFetch();
    }, []);

    const handleFetch = () => {
        getAllUsers().then(response => {
            setUsers(response.data);
        });
    };

    const onDelete = id => {
        deleteUser(id).then(() => {
            setUsers(prevState => {
                return prevState.filter(u => u.id !== id);
            });
        });
    };

    return (
        <div className="users-list-wrapper">
            {loggedUser.isAdmin ? (
                <>
                    <div className="users-navigation">
                        <Link className="nav-link" to="/users/create">
                            <Button variant="light">+ Add a new user</Button>
                        </Link>
                    </div>
                </>
            ) : null}
            <div className="user-cards">
                {users.map(user => (
                    <UserCard
                        key={user.id}
                        user={user}
                        handleRefetch={handleFetch}
                        onDelete={onDelete}
                    />
                ))}
            </div>
        </div>
    );
};

export default UsersList;
