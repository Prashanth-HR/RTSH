import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
const imageUrl = process.env.PUBLIC_URL + '/testbed.png'; // Adjust the path if your image is in a different folder

const App = () => {
    const [reservedDates, setReservedDates] = useState([]);
    const [startDateTime, setStartDateTime] = useState(new Date());
    const [endDateTime, setEndDateTime] = useState(new Date());
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [description, setDescription] = useState('');
    useEffect(() => {
        fetch('http://127.0.0.1:5000/reserved-dates')
            .then(response => response.json())
            .then(data => {
                setReservedDates(data);
            });
    }, []);

    const handleReservation = () => {
        const data = {
            start: startDateTime.toISOString(),
            end: endDateTime.toISOString(),
            email: email,
            description: description,
            name: name,
        };

        fetch('http://127.0.0.1:5000/reserve', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        .then(response => response.json())
        .then(data => {
            alert(data.message); // Show a message to the user
            // Optionally, refresh the reserved dates
        })
        .catch(error => {
            console.error('Error:', error);
        });
    };

    return (
        <div>
            <FullCalendar
                plugins={[dayGridPlugin, timeGridPlugin]}
                initialView="timeGridWeek"
                events={reservedDates.map(dateRange => ({
                    title: 'Reserved',
                    start: dateRange.start,
                    end: dateRange.end,
                }))}
            />
            <div>
                <h2>Reserve a Time Slot</h2>
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
            </div>
            <img src={imageUrl} alt="Example" />
        </div>
    );
};

export default App;