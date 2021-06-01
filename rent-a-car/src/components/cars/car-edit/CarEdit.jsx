import './CarEdit.css';
import { useState, useEffect } from 'react';
import { getCarById } from '../../../core/services/CarService';
import { saveCar } from '../../../core/services/CarService';
import { Redirect } from 'react-router';

export function CarEdit(props) {
    const [editedCar, setEditedCar] = useState({
        picture: '',
        name: '',
        vehicleType: '',
        fuelType: '',
        capacity: '',
        pricePerDay: '',
        isAvailable: '',
        rentedBy: ''
    });
    const [shouldRedirect, setShouldRedirect] = useState(false);

    useEffect(() => {
        if (props.computedMatch.params.id) {
            getCarById(props.computedMatch.params.id).then(response => {
                setEditedCar(response.data);
            });
        }
    }, [props.computedMatch.params.id]);

    const onInputChange = event => {
        setEditedUser(prevState => ({
            ...prevState,
            [event.target.name]: event.target.value.trim()
        }));
    };

    const onFormSubmit = event => {
        event.preventDefault();

        saveUser(editedUser).then(_ => {
            console.log('SUCCESS');
            setShouldRedirect(true);
        });
    };

    return (
        <>
            {shouldRedirect && <Redirect to="/cars-list" />}
            <div className="user-edit-wrapper">
                <form className="user-edit-form" onSubmit={onFormSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Name: </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            className="form-control"
                            value={editedCar.name}
                            onChange={onInputChange}
                            required
                        />
                        <label htmlFor="name">Vehicle Type: </label>
                        <input
                            type="text"
                            id="vehicleType"
                            name="vehicleType"
                            className="form-control"
                            value={editedCar.vehicleType}
                            onChange={onInputChange}
                            required
                        />
                        <label htmlFor="name">Fuel Type: </label>
                        <input
                            type="text"
                            id="fuelType"
                            name="fuelType"
                            className="form-control"
                            value={editedCar.fuelType}
                            onChange={onInputChange}
                            required
                        />
                        <label htmlFor="name">Capacity: </label>
                        <input
                            type="text"
                            id="capacity"
                            name="capacity"
                            className="form-control"
                            value={editedCar.capacity}
                            onChange={onInputChange}
                            required
                        />
                        <label htmlFor="name">Price per day: </label>
                        <input
                            type="text"
                            id="price"
                            name="price"
                            className="form-control"
                            value={editedCar.price}
                            onChange={onInputChange}
                            required
                        />
                    </div>
                    <button className="btn btn-primary">Save</button>
                </form>
            </div>
        </>
    );
}
