import streamlit as st
import requests
from datetime import datetime

st.title('Date Reservation System')

# Streamlit widgets to input the start and end dates
start_date = st.date_input("Select the start date")
end_date = st.date_input("Select the end date")

if st.button('Reserve Dates'):
    # Convert dates to datetime objects
    start_datetime = datetime.combine(start_date, datetime.min.time())
    end_datetime = datetime.combine(end_date, datetime.min.time())

    # Format the datetime objects into ISO format
    start_iso = start_datetime.isoformat()
    end_iso = end_datetime.isoformat()

    # Prepare the data for the POST request
    data = {'start': start_iso, 'end': end_iso}

    # URL of the Flask app's `/reserve` route
    url = 'http://127.0.0.1:5000/reserve'

    # Make the POST request and get the response
    response = requests.post(url, json=data)

    if response.status_code == 200:
        st.success('Success: ' + response.json().get('message', ''))
    else:
        st.error('Error: ' + response.json().get('message', ''))

