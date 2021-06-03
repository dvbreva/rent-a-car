import { useState, useEffect } from 'react';
import { getUserById } from '../../../core/services/UserService';
import { UserCard } from './../user-card/UserCard';

const User = props => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        getUserById(props.computedMatch.params.id).then(response => {
            setUser(response.data);
        });
    }, []);

    return <UserCard user={user} />;
};

export default User;
