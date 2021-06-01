import { deleteUser, getAllUsers } from '../../../core/services/UserService';
import { useEffect, useState } from 'react';
import { UserCard } from '../user-card/UserCard';
import './UsersList.css';

const UsersList = () => {
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
            {users.map(user => (
                <UserCard
                    key={user.id}
                    user={user}
                    handleRefetch={handleFetch}
                    onDelete={onDelete}
                />
            ))}
        </div>
    );
};

export default UsersList;
