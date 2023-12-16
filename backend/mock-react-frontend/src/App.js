import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const App = () => {
    const [reservedDates, setReservedDates] = useState([]);
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());

    useEffect(() => {
        fetch('http://127.0.0.1:5000/reserved-dates')
            .then(response => response.json())
            .then(data => {
                setReservedDates(data);
            });
    }, []);

    const handleReservation = () => {
        const data = {
            start: startDate.toISOString(),
            end: endDate.toISOString(),
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
                plugins={[dayGridPlugin]}
                initialView="dayGridMonth"
                events={reservedDates.map(dateRange => ({
                    title: 'Reserved',
                    start: dateRange.start,
                    end: dateRange.end,
                }))}
            />
            <div>
                <h2>Reserve a Date</h2>
                <DatePicker 
                    selected={startDate}
                    onChange={date => setStartDate(date)}
                    selectsStart
                    startDate={startDate}
                    endDate={endDate}
                />
                <DatePicker 
                    selected={endDate}
                    onChange={date => setEndDate(date)}
                    selectsEnd
                    startDate={startDate}
                    endDate={endDate}
                    minDate={startDate}
                />
                <button onClick={handleReservation}>Reserve</button>
            </div>
        </div>
    );
};

export default App;
