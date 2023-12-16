import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const imageUrl = process.env.PUBLIC_URL + '/testbed.png'; // Adjust the path if your image is in a different folder

    const App = () => {
        const [reservedDates, setReservedDates] = useState([]);
        const [parkingLotReservedDates, setParkingLotReservedDates] = useState([]);
        const [startDateTime, setStartDateTime] = useState(new Date());
        const [endDateTime, setEndDateTime] = useState(new Date());
        const [name, setName] = useState('');
        const [email, setEmail] = useState('');
        const [description, setDescription] = useState('');
        const [reservationType, setReservationType] = useState({
            normal: false,
            parkingLot: false
        });
        useEffect(() => {
            // Fetch regular reservations
            fetch('http://127.0.0.1:5000/reserved-dates')
                .then(response => response.json())
                .then(data => {
                    console.log('Fetched reserved dates:', data); // Log the fetched data
                    setReservedDates(data);
                });
    
            // Fetch parking lot reservations
            fetch('http://127.0.0.1:5000/parking_lot_reserved-dates')
                .then(response => response.json())
                .then(data => {
                    setParkingLotReservedDates(data);
                });
        }, []);

        const allReservations = [...reservedDates, ...parkingLotReservedDates];
        const isParkingLotReservation = (reservation) => {
            return parkingLotReservedDates.includes(reservation);
        };
        const handleCheckboxChange = (e) => {
            setReservationType({...reservationType, [e.target.name]: e.target.checked });
        }
        const checkReserveability=  () => {
            const data = {
                start_datetime: startDateTime.toISOString(),
                end_datetime: endDateTime.toISOString(),
            };


            if (reservationType.normal) {
                fetch('http://127.0.0.1:5000/reserve_availability', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data),
                })
                .then(response => response.json())
                .then(data => alert(data.message))
                .catch(error => console.error('Error:', error));
            }

            if (reservationType.parkingLot) {
                fetch('http://127.0.0.1:5000/reserve_parking_lot_availability', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data),
                })
                .then(response => response.json())
                .then(data => alert(data.message))
                .catch(error => console.error('Error:', error));
            }


        }
        const handleReservation = () => {
            // Prepare the data to send
            const data = {
                start_datetime: startDateTime.toISOString(),
                end_datetime: endDateTime.toISOString(),
                email: email,
                description: description,
                name: name,
            };

            // Send the reservation request based on the type
            if (reservationType.normal) {
                fetch('http://127.0.0.1:5000/reserve', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data),
                })
                .then(response => response.json())
                .then(data => alert(data.message))
                .catch(error => console.error('Error:', error));
            }

            if (reservationType.parkingLot) {
                fetch('http://127.0.0.1:5000/reserve_parking_lot', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data),
                })
                .then(response => response.json())
                .then(data => alert(data.message))
                .catch(error => console.error('Error:', error));
            }
        };
        const formatReservationForCalendar = (reservation) => {
            console.log('Processing reservation:', reservation); // Log the current reservation
            return {
                title: `${reservation.description || 'Reserved'} - ${reservation.name} - ${reservation.email}`,
                start: reservation.start_datetime,
                end: reservation.end_datetime,
                color: isParkingLotReservation(reservation) ? '#ff7f50' : '#007bff',
                // Add more properties as needed
                extendedProps: {
                    email: reservation.email,
                    name: reservation.name,
                    description: reservation.description
                }
            };
        };
        return (
            <div>
                <FullCalendar
                    plugins={[dayGridPlugin, timeGridPlugin]}
                    initialView="timeGridWeek"
                    events={allReservations.map(formatReservationForCalendar)}
                />
                <div>
                    <h2>Reserve a Time Slot</h2>
                    <label>
                        <input
                            type="checkbox"
                            name="normal"
                            checked={reservationType.normal}
                            onChange={handleCheckboxChange}
                        /> Normal Reservation
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            name="parkingLot"
                            checked={reservationType.parkingLot}
                            onChange={handleCheckboxChange}
                        /> Parking Lot Reservation
                    </label>
                    <input 
                        type="text"
                        placeholder="Name"
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
                    <input 
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <input 
                        type="text"
                        placeholder="Description"
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                    />
                    <DatePicker 
                        selected={startDateTime}
                        onChange={date => setStartDateTime(date)}
                        showTimeSelect
                        dateFormat="Pp"
                        timeIntervals={15}  
                    />
                    <DatePicker 
                        selected={endDateTime}
                        onChange={date => setEndDateTime(date)}
                        showTimeSelect
                        dateFormat="Pp"
                        minDate={startDateTime}
                        timeIntervals={15}  
                    />
                    <button onClick={handleReservation}>Reserve</button>
                    <button onClick={checkReserveability}>Check reserveability</button>

                </div>
                <img src={imageUrl} alt="Example" />
            </div>
        );
    };

    export default App;