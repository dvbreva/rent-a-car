import { Switch } from 'react-router-dom';
import { AuthenticatedRoute } from '../../../core/guards/AuthenticatedRoute';
import User from '../../users/user/User';
import UsersList from '../../users/users-list/UsersList';

const Main = () => {
    return (
        <div className="main-content">
            <Switch>
                <AuthenticatedRoute
                    exact
                    path="/users-list"
                    component={UsersList}
                />
                <AuthenticatedRoute exact path="/users/:id" component={User} />
            </Switch>
        </div>
    );
};

export default Main;
