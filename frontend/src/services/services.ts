import axios from 'axios';

export const getBookings = () => {
    return axios.get(`http://localhost:8080/api/v1/users`)

}