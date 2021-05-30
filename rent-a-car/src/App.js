import Layout from './components/layout/Layout';

import { Switch } from 'react-router';
import { Login } from './components/auth/login/Login';
import { AuthenticatedRoute } from './core/guards/AuthenticatedRoute';
import { NonAuthenticatedRoute } from './core/guards/NonAuthenticatedRoute';
import { Register } from './components/auth/register/Register';

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <Switch>
                    <NonAuthenticatedRoute
                        exact
                        path="/login"
                        component={Login}
                    />
                    <NonAuthenticatedRoute
                        exact
                        path="/register"
                        component={Register}
                    />
                    <AuthenticatedRoute path="/" component={Layout} />
                </Switch>
            </header>
        </div>
    );
}

export default App;
