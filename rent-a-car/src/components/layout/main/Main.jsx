import { Switch } from 'react-router-dom';
import { AuthenticatedRoute } from '../../../core/guards/AuthenticatedRoute';
import User from '../../users/user/User';
import UsersList from '../../users/users-list/UsersList';
import './Main.css';
import EditUser from '../../users/user-edit/UserEdit';
import CarsList from '../../cars/car-list/CarsList';
import Car from '../../cars/car/Car';

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
                <AuthenticatedRoute
                    exact
                    path="/users/create"
                    component={EditUser}
                />
                <AuthenticatedRoute
                    exact
                    path="/users/edit/:id"
                    component={EditUser}
                />
                <AuthenticatedRoute
                    exact
                    path="/cars-list"
                    component={CarsList}
                />
                <AuthenticatedRoute exact path="/cars/:id" component={Car} />
            </Switch>
        </div>
    );
};

export default Main;
