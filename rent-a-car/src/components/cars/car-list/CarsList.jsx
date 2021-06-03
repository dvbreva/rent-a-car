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
    const [carCounts, setCarCounts] = useState({
        availableCount: 0,
        unavailableCount: 0
    });

    useEffect(() => {
        handleFetch();
    }, []);

    const handleFetch = () => {
        getAllCars().then(response => {
            let carsResponse = response.data;
            let availableCars = response.data.filter(
                x => x.isAvailable === true
            );
            let unavailableCars = response.data.filter(
                x => x.isAvailable === false
            );
            setCars(carsResponse);
            setCarCounts({
                availableCount: availableCars.length,
                unavailableCount: unavailableCars.length
            });
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
            <div className="cars-header">
                <div className="available-cars">
                    Available cars left: {carCounts.availableCount}
                </div>
                <hr></hr>
            </div>
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
