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