import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { getLoggedUser } from '../../../core/services/AuthService';

const wrapperStyles = {
    margin: '1rem'
};

const carContent = (car, onDelete) => {
    const loggedUser = getLoggedUser();

    return (
        <div className="car-card-wrapper" style={wrapperStyles}>
            <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src={car.picture} />
                <Card.Body>
                    <Card.Title>{car.name}</Card.Title>
                    <Card.Text>
                        <div>
                            <strong>Vehical Type: </strong>
                            <span>{car.vehicleType}</span>
                        </div>
                        <div>
                            <strong>Fuel Type: </strong>
                            <span>{car.fuelType}</span>
                        </div>
                        <div>
                            <strong>Capacity: </strong>
                            <span>{car.capacity}</span>
                        </div>
                        <div>
                            <strong>Price: </strong>
                            <span>{car.pricePerDay}</span>
                        </div>
                        <div>
                            <strong>Availability: </strong>
                            <span>{car.isAvailable ? 'True' : 'False'}</span>
                        </div>
                    </Card.Text>
                    <Link to={`/cars/${car.id}`}>View details</Link> |{' '}
                    {loggedUser.isAdmin && (
                        <Link to={`/cars/edit/${car.id}`}>Edit car</Link>
                    )}{' '}
                    |{' '}
                    {loggedUser.isAdmin && (
                        <span
                            className="delete-btn"
                            onClick={() => onDelete(car.id)}
                        >
                            Delete car
                        </span>
                    )}
                </Card.Body>
            </Card>
        </div>
    );
};

export function CarCard({ car, onDelete, ...props }) {
    console.log(props);
    return car ? carContent(car, onDelete) : 'No car!';
}
