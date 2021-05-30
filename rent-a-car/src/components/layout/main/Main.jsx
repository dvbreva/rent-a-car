import { Switch, Route } from 'react-router-dom';
import User from '../../users/user/User';
import UsersList from '../../users/users-list/UsersList';

const Main = () => {
    return (
        <div className="main-content">
            <Switch>
                <Route exact path="/users-list" component={UsersList} />
                <Route exact path="/users/:id" component={User} />
            </Switch>
        </div>
    );
};

export default Main;
