import { Switch } from 'react-router-dom';
import { AuthenticatedRoute } from '../../../core/guards/AuthenticatedRoute';
import User from '../../users/user/User';
import UsersList from '../../users/users-list/UsersList';

import { UserEdit } from '../../users/user-edit/UserEdit';

const Main = () => {
    return (
        <div className="main-content">
            <Switch>
                <AuthenticatedRoute
                    exact
                    path="/users-list"
                    component={UsersList}
                />
                <AuthenticatedRoute
                    exact
                    path="/users/create"
                    component={UserEdit}
                />
                <AuthenticatedRoute exact path="/users/:id" component={User} />
                <AuthenticatedRoute
                    exact
                    path="/users/edit/:id"
                    component={UserEdit}
                />
            </Switch>
        </div>
    );
};

export default Main;
