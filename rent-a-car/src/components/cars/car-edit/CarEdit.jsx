import { useState, useEffect } from 'react';
import { Redirect } from 'react-router';
import { getCarById } from '../../../core/services/CarService';
import { saveCar } from '../../../core/services/CarService';
import './CarEdit.css';

const DEFAULT_CAR_STATE = {
    picture: '',
    name: '',
    brand: '',
    model: '',
    constructionYear: '',
    vehicleType: '',
    fuelType: '',
    capacity: '',
    pricePerDay: '',
    isAvailable: '',
    rentedBy: ''
};

export function CarEdit(props) {
    const [editedCar, setEditedCar] = useState(DEFAULT_CAR_STATE);
    const [shouldRedirect, setShouldRedirect] = useState(false);

    useEffect(() => {
        if (props.computedMatch.params.id) {
            getCarById(props.computedMatch.params.id).then(response => {
                setEditedCar(response.data);
            });
        }
    }, [props.computedMatch.params.id]);

    const onInputChange = event => {
        setEditedCar(prevState => ({
            ...prevState,
            [event.target.name]: event.target.value.trim()
        }));
    };

    const onFormSubmit = event => {
        event.preventDefault();
        saveCar(editedCar).then(_ => {
            setShouldRedirect(true);
        });
    };

    const handleClearClick = () => {
        setEditedCar(DEFAULT_CAR_STATE);
    };

    return (
        <>
            {shouldRedirect && <Redirect to="/cars-list" />}
            <div className="car-edit-wrapper">
                <form className="car-edit-form" onSubmit={onFormSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">*Name: </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            className="form-control"
                            value={editedCar.name}
                            onChange={onInputChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="brand">*Brand: </label>
                        <input
                            type="text"
                            id="brand"
                            name="brand"
                            className="form-control"
                            value={editedCar.brand}
                            onChange={onInputChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="model">*Model: </label>
                        <input
                            type="text"
                            id="model"
                            name="model"
                            className="form-control"
                            value={editedCar.model}
                            onChange={onInputChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="constructionYear">
                            *Construction year:{' '}
                        </label>
                        <input
                            type="number"
                            id="constructionYear"
                            name="constructionYear"
                            className="form-control"
                            value={editedCar.constructionYear}
                            onChange={onInputChange}
                            min="1"
                            max="2021"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="vehicleType">*Vehicle Type: </label>
                        <select
                            type="select"
                            id="vehicleType"
                            name="vehicleType"
                            className="form-control"
                            value={editedCar.vehicleType}
                            onChange={onInputChange}
                            required
                        >
                            <option value="Economy">Economy</option>
                            <option value="Estate">Estate</option>
                            <option value="Luxury">Luxury</option>
                            <option value="SUV">SUV</option>
                            <option value="Cargo">Cargo</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="fuelType">*Fuel Type: </label>
                        <select
                            type="select"
                            id="fuelType"
                            name="fuelType"
                            className="form-control"
                            value={editedCar.fuelType}
                            onChange={onInputChange}
                            required
                        >
                            <option value="Petrol">Petrol</option>
                            <option value="Diesel">Diesel</option>
                            <option value="Hybrid">Hybrid</option>
                            <option value="Electric">Electic</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="capacity">*Capacity: </label>
                        <input
                            type="number"
                            id="capacity"
                            name="capacity"
                            className="form-control"
                            value={editedCar.capacity}
                            onChange={onInputChange}
                            min="1"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="pricePerDay">*Price per day: </label>
                        <input
                            type="number"
                            id="pricePerDay"
                            name="pricePerDay"
                            className="form-control"
                            value={editedCar.pricePerDay}
                            onChange={onInputChange}
                            min="1"
                            step=".01"
                            required
                        />
                    </div>

                    <button className="btn btn-primary mb-3">Save</button>
                    <button
                        className="btn btn-secondary"
                        onClick={handleClearClick}
                    >
                        Clear
                    </button>
                </form>
            </div>
        </>
    );
}
