import { deleteCar, getAllCars } from '../../../core/services/CarService';
import { useEffect, useState } from 'react';
import { CarCard } from '../car-card/CarCard';
import './CarsList.css';
import { getLoggedUser } from '../../../core/services/AuthService';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const CarsList = () => {
    const loggedUser = getLoggedUser();
    const [cars, setCars] = useState([]);

    useEffect(() => {
        handleFetch();
    }, []);

    const handleFetch = () => {
        getAllCars().then(response => {
            setCars(response.data);
        });
    };

    const onDelete = id => {
        deleteCar(id).then(() => {
            setCars(prevState => {
                return prevState.filter(u => u.id !== id);
            });
        });
    };

    return (
        <div className="cars-list-wrapper">
            {loggedUser.isAdmin ? (
                <>
                    <div className="cars-navigation">
                        <Link className="nav-link" to="/cars/create">
                            <Button variant="light">+ Add a new car</Button>
                        </Link>
                    </div>
                </>
            ) : null}
            <div className="car-cards">
                {cars.map(car => (
                    <CarCard
                        key={car.id}
                        car={car}
                        handleRefetch={handleFetch}
                        onDelete={onDelete}
                    />
                ))}
            </div>
        </div>
    );
};

export default CarsList;
