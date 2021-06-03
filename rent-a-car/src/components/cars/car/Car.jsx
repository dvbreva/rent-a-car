import { useState, useEffect } from 'react';
import { getCarById } from '../../../core/services/CarService';
import { CarCard } from './../car-card/CarCard';

const Car = props => {
    const [car, setCar] = useState(null);

    useEffect(() => {
        getCarById(props.computedMatch.params.id).then(response => {
            setCar(response.data);
        });
    }, []);

    return <CarCard car={car} />;
};

export default Car;
