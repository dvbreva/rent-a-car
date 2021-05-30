import { getAllUsers } from '../../../core/services/UserService';
import { useEffect, useState } from 'react';
import { UserCard } from '../user-card/UserCard';
import './UsersList.css';

const UsersList = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        getAllUsers().then(response => {
            setUsers(response.data);
        });
    }, []);

    return (
        <div className="users-list-wrapper">
            {users.map(user => (
                <UserCard key={user.id} user={user} />
            ))}
        </div>
    );
};

export default UsersList;
