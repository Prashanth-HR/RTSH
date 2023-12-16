import axios from 'axios';

export const getBookings = () => {
    return axios.get(`http://127.0.0.1:5000/reserved-dates`)
}

export const createBooking = (data) => {
    return axios.post(`http://127.0.0.1:5000/reserve`, data)
}

export const checkBookAvailability = (data) => {
    return axios.post('http://127.0.0.1:5000/reserve_availability', data)
}

export const getBookingsParking = () => {
    return axios.get(`http://127.0.0.1:5000/parking_lot_reserved-dates`)
}

export const createBookingParking = (data) => {
    return axios.post(`http://127.0.0.1:5000/reserve_parking_lot`, data)
}

export const checkBookAvailabilityParking = (data) => {
    return axios.post('http://127.0.0.1:5000/reserve_parking_lot_availability', data)
}