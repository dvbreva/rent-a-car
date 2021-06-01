import { deleteCar, getAllCars } from '../../../core/services/CarService';
import { useEffect, useState } from 'react';
import { CarCard } from '../car-card/CarCard';
import './CarsList.css';

const CarsList = () => {
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
            {cars.map(car => (
                <CarCard
                    key={car.id}
                    car={car}
                    handleRefetch={handleFetch}
                    onDelete={onDelete}
                />
            ))}
        </div>
    );
};

export default CarsList;
