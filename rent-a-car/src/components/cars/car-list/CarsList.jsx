import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
    deleteCar,
    getAllCars,
    rentCar
} from '../../../core/services/CarService';
import { CarCard } from '../car-card/CarCard';
import { getLoggedUser } from '../../../core/services/AuthService';
import { Button } from 'react-bootstrap';
import './CarsList.css';

const CarsList = () => {
    const loggedUser = getLoggedUser();
    const [cars, setCars] = useState([]);
    const [carCounts, setCarCounts] = useState({
        availableCount: 0,
        unavailableCount: 0
    });
    const [shouldRefetch, setShouldRefetch] = useState(null);

    useEffect(() => {
        handleFetch();
    }, [shouldRefetch]);

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

    const onRent = async (id, userId) => {
        const result = await rentCar(id, userId);
        if (result && result.status === 201) {
            setShouldRefetch(true);
        }
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
                        onRent={onRent}
                    />
                ))}
            </div>
        </div>
    );
};

export default CarsList;
