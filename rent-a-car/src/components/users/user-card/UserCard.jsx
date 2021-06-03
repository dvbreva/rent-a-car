import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { getLoggedUser } from '../../../core/services/AuthService';
import { Button } from 'react-bootstrap';

const wrapperStyles = {
    margin: '1rem'
};

const userContent = (user, onDelete) => {
    const loggedUser = getLoggedUser();

    return (
        <div className="user-card-wrapper" style={wrapperStyles}>
            <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src={user.picture} />
                <Card.Body>
                    <Card.Title>{user.name}</Card.Title>
                    <Card.Text>
                        <div>
                            <strong>Email: </strong>
                            <span>{user.email}</span>
                        </div>
                        <div>
                            <strong>Phone: </strong>
                            <span>{user.phone}</span>
                        </div>
                        <div>
                            <strong>Administrator: </strong>
                            <span>{user.isAdmin.toString()}</span>
                        </div>
                    </Card.Text>
                    <div className="card-buttons">
                        <Link to={`/users/${user.id}`}>
                            <Button variant="light">View</Button>
                        </Link>
                        {loggedUser.isAdmin && (
                            <Link to={`/users/edit/${user.id}`}>
                                <Button variant="primary">Edit</Button>
                            </Link>
                        )}
                        {loggedUser.isAdmin && (
                            <Button
                                variant="warning"
                                onClick={() => onDelete(user.id)}
                            >
                                Delete
                            </Button>
                        )}
                    </div>
                </Card.Body>
            </Card>
        </div>
    );
};

export function UserCard({ user, onDelete, ...props }) {
    return user ? userContent(user, onDelete) : 'No user!';
}
