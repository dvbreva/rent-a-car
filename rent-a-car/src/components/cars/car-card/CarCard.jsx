import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { getLoggedUser } from '../../../core/services/AuthService';

const wrapperStyles = {
    margin: '1rem'
};

const carContent = (car, onDelete, onRent) => {
    const loggedUser = getLoggedUser();

    return (
        <div className="car-card-wrapper" style={wrapperStyles}>
            <Card style={{ width: '20rem' }}>
                <Card.Img variant="top" src={car.picture} />
                <Card.Body>
                    <Card.Title>{car.name}</Card.Title>
                    <Card.Text>
                        <div>
                            <strong>Vehical Brand: </strong>
                            <span>{car.brand}</span>
                        </div>
                        <div>
                            <strong>Vehical Model: </strong>
                            <span>{car.model}</span>
                        </div>
                        <div>
                            <strong>Construction Year: </strong>
                            <span>{car.constructionYear}</span>
                        </div>
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
                    <div className="card-buttons">
                        <Link to={`/cars/${car.id}`}>
                            <Button variant="light" size="sm">
                                View
                            </Button>
                        </Link>
                        {car.isAvailable ? (
                            <>
                                <Button
                                    variant="light"
                                    size="sm"
                                    onClick={() =>
                                        onRent(car.id, loggedUser.id)
                                    }
                                >
                                    Rent
                                </Button>
                            </>
                        ) : null}
                        {loggedUser.isAdmin && (
                            <Link to={`/cars/edit/${car.id}`}>
                                <Button variant="primary" size="sm">
                                    Edit
                                </Button>
                            </Link>
                        )}
                        {loggedUser.isAdmin && (
                            <Button
                                variant="warning"
                                size="sm"
                                onClick={() => onDelete(car.id)}
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

export function CarCard({ car, onDelete, onRent, ...props }) {
    return car ? carContent(car, onDelete, onRent) : 'No car!';
}
