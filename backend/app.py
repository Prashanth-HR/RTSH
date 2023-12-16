from flask import Flask, jsonify, request
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime, timedelta
from dotenv import load_dotenv
import os
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import smtplib, ssl

load_dotenv()
app = Flask(__name__)

EMAIL_USER =  os.getenv('EMAIL_USER')
EMAIL_PASS =  os.getenv('EMAIL_PASS')
ADMIN_EMAIL = 'batikanor@gmail.com'

URL = "http://localhost:3000/"
# Allows CORS for all domain and routes
CORS(app)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///startmunich.db'
db = SQLAlchemy()
db.init_app(app)

class ParkingLotReservation(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    start_datetime = db.Column(db.DateTime, nullable=False)
    end_datetime = db.Column(db.DateTime, nullable=False)
    description = db.Column(db.String, nullable=True) 
    name = db.Column(db.String, nullable=True)
    email = db.Column(db.String, nullable=False) 
    confirmed = db.Column(db.Boolean, default=False, nullable=False)



class Reservation(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    start_datetime = db.Column(db.DateTime, nullable=False)
    end_datetime = db.Column(db.DateTime, nullable=False)
    description = db.Column(db.String, nullable=True) 
    name = db.Column(db.String, nullable=True)
    email = db.Column(db.String, nullable=False) 
    confirmed = db.Column(db.Boolean, default=False, nullable=False)


with app.app_context():
    db.create_all()

# Function to send email
def send_confirmation_email(reservation_id, email):
    # Replace with the actual domain of your React app
    confirm_url = f'{URL}confirm/{reservation_id}'
    email_body = f'Please click on the link to confirm your reservation: {confirm_url}'
    # # Create a MIMEText object to properly format your email
    # msg = MIMEMultipart()
    # msg['From'] = EMAIL_USER
    # msg['To'] = ADMIN_EMAIL
    # msg['Subject'] = f"Reservation {reservation_id} from {email} is awaiting confirmation!"

    # # Message body
    # body = email_body
    # msg.attach(MIMEText(body, 'plain'))
    # # Send the email
    # server = smtplib.SMTP_SSL('smtp.mail.com', 465)  # Ensure this is your email provider's SMTP server
    # print(f"{EMAIL_USER=}")
    # server.login(EMAIL_USER, EMAIL_PASS)
    # server.send_message(msg)
    # server.quit()

    try:
        port = 465  # For SSL
        smtp_server = "smtp.gmail.com"
        sender_email = EMAIL_USER # Enter your address
        receiver_email = ADMIN_EMAIL  # Enter receiver address
        password = EMAIL_PASS
        message = """\
        Subject: Hi there

        This message is sent from Python.

        Reservation {reservation_id} from {email} is awaiting confirmation

        Please click on the link to confirm your reservation: {confirm_url}
        
        
        """
        context = ssl.create_default_context()
        with smtplib.SMTP_SSL(smtp_server, port, context=context) as server:
            server.login(sender_email, password)
            server.sendmail(sender_email, receiver_email, message)
    except:
        print("Email didnt work, TODO") #TODO

@app.route('/reserve_parking_lot_availability', methods=['GET'])
def reserve_parking_lot_availability():
    data = request.json 
    start_str = data['start_datetime'].rstrip('Z')  # Remove 'Z' if present #  'Z' (Zulu time, which is another way to denote UTC) 
    end_str = data['end_datetime'].rstrip('Z')  # Remove 'Z' if present
    start= datetime.fromisoformat(start_str)
    end = datetime.fromisoformat(end_str)
    # Ensure the start_datetimeand end times are in 15-minute intervals
    if (start.minute % 15 != 0) or (end.minute % 15 != 0):
        return jsonify({'available': False, 'message': 'Reservations must be in 15-minute intervals'}), 400
    # Check if the datetime range is available
    conflict = ParkingLotReservation.query.filter(
        (ParkingLotReservation.start_datetime < end) & (ParkingLotReservation.end_datetime > start)
    ).first()
    if conflict:
        return jsonify({'available': False}), 400
    return jsonify({'available': True})

@app.route('/reserve_parking_lot', methods=['POST'])
def reserveParkingLot():
    data = request.json 
    start_str = data['start_datetime'].rstrip('Z')  # Remove 'Z' if present #  'Z' (Zulu time, which is another way to denote UTC) 
    end_str = data['end_datetime'].rstrip('Z')  # Remove 'Z' if present
    start= datetime.fromisoformat(start_str)
    end = datetime.fromisoformat(end_str)
    if (start.minute % 15 != 0) or (end.minute % 15 != 0):
        return jsonify({'message': 'Reservations must be in 15-minute intervals'}), 400
    conflict = ParkingLotReservation.query.filter(
        (ParkingLotReservation.start_datetime < end) & (ParkingLotReservation.end_datetime > start)
    ).first()
    if conflict:
        return jsonify({'message': 'Datetime is not available for reservation'}), 400
    new_reservation = ParkingLotReservation(start_datetime=start, end_datetime=end, email=data['email'], description=data['description'], name=data['name'])
    token = new_reservation.id  # You could also implement generate_token
    send_confirmation_email(data['email'], token)
    db.session.add(new_reservation)
    db.session.commit()
    return jsonify({'message': 'Datetime is reserved'})

@app.route('/reserve_availability', methods=['GET'])
def reserve_availability():
    data = request.json 
    start_str = data['start_datetime'].rstrip('Z')  # Remove 'Z' if present #  'Z' (Zulu time, which is another way to denote UTC) 
    end_str = data['end_datetime'].rstrip('Z')  # Remove 'Z' if present
    start= datetime.fromisoformat(start_str)
    end = datetime.fromisoformat(end_str)
    # Ensure the start_datetimeand end times are in 15-minute intervals
    if (start.minute % 15 != 0) or (end.minute % 15 != 0):
        return jsonify({'available': False, 'message': 'Reservations must be in 15-minute intervals'}), 400
    # Check if the datetime range is available
    conflict = Reservation.query.filter(
        (Reservation.start_datetime < end) & (Reservation.end_datetime > start)
    ).first()
    if conflict:
        return jsonify({'available': False}), 400
    return jsonify({'available': True})

    
@app.route('/reserve', methods=['POST'])
def reserve():
    data = request.json 
    start_str = data['start_datetime'].rstrip('Z')  # Remove 'Z' if present #  'Z' (Zulu time, which is another way to denote UTC) 
    end_str = data['end_datetime'].rstrip('Z')  # Remove 'Z' if present
    start= datetime.fromisoformat(start_str)
    end = datetime.fromisoformat(end_str)


    # Ensure the start and end times are in 15-minute intervals
    if (start.minute % 15 != 0) or (end.minute % 15 != 0):
        return jsonify({'message': 'Reservations must be in 15-minute intervals'}), 400

    # Check if the datetime range is available
    conflict = Reservation.query.filter(
        (Reservation.start_datetime < end) & (Reservation.end_datetime > start)
    ).first()

    if conflict:
        return jsonify({'message': 'Datetime is not available for reservation'}), 400

    # Create a new reservation
    new_reservation = Reservation(start_datetime=start, end_datetime=end, email=data['email'], description=data['description'], name=data['name'])

    
    # Generate a token and send an email
    token = new_reservation.id  # You could also implement generate_token
    send_confirmation_email(data['email'], token)

    db.session.add(new_reservation)
    db.session.commit()
    return jsonify({'message': 'Datetime is reserved'})

@app.route('/parking_lot_reserved-dates', methods=['GET'])
def parking_lot_reserved_dates():
    reservations = ParkingLotReservation.query.all()
    reserved_date_ranges = []
    for reservation in reservations:
        start_date = reservation.start_datetime.isoformat()
        end_date = reservation.end_datetime.isoformat()
        reserved_date_ranges.append({'start_datetime': start_date, 'end_datetime': end_date, 'description': reservation.description, 'email':reservation.email})

    return jsonify(reserved_date_ranges)

@app.route('/reserved-dates', methods=['GET'])
def reserved_dates():
    reservations = Reservation.query.all()
    reserved_date_ranges = []
    for reservation in reservations:
        start_date = reservation.start_datetime.isoformat()
        end_date = reservation.end_datetime.isoformat()
        reserved_date_ranges.append({'start_datetime': start_date, 'end_datetime': end_date, 'description': reservation.description, 'email':reservation.email})

    return jsonify(reserved_date_ranges)

@app.route('/parking_lot_confirm/<int:reservation_id>', methods=['GET'])
def parking_lot_onfirm_reservation(reservation_id):
    reservation = ParkingLotReservation.query.get(reservation_id)
    if reservation and not reservation.confirmed:
        reservation.confirmed = True
        db.session.commit()
        return "Reservation confirmed successfully!", 200
    else:
        return "Invalid or already confirmed reservation.", 400
    



@app.route('/confirm/<int:reservation_id>', methods=['GET'])
def confirm_reservation(reservation_id):
    reservation = Reservation.query.get(reservation_id)
    if reservation and not reservation.confirmed:
        reservation.confirmed = True
        db.session.commit()
        return "Reservation confirmed successfully!", 200
    else:
        return "Invalid or already confirmed reservation.", 400
    

if __name__ == '__main__':
    app.run(debug=True)