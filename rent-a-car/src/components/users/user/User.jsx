import { useState, useEffect } from 'react';
import { getUserById } from '../../../core/services/UserService';
import { UserCard } from './../user-card/UserCard';

const User = props => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        getUserById(props.match.params.id).then(response => {
            console.log(response);
            setUser(response.data);
        });
    }, []);

    return <UserCard user={user} />;
};

export default User;
