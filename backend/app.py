from flask import Flask, jsonify, request
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime, timedelta

app = Flask(__name__)

# Allows CORS for all domain and routes
CORS(app)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///startmunich.db'
db = SQLAlchemy()
db.init_app(app)

class Reservation(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    start_datetime = db.Column(db.DateTime, nullable=False)
    end_datetime = db.Column(db.DateTime, nullable=False)

with app.app_context():
    db.create_all()

@app.route('/reserve', methods=['POST'])
def reserve():
    data = request.json
    start = datetime.fromisoformat(data['start'])
    end = datetime.fromisoformat(data['end'])

    # Ensure the start and end times are in 15-minute intervals
    if (start.minute % 15 != 0) or (end.minute % 15 != 0):
        return jsonify({'message': 'Reservations must be in 15-minute intervals'}), 400

    # Check if the datetime range is available
    conflict = Reservation.query.filter(
        (Reservation.start_datetime < end) & (Reservation.end_datetime > start)
    ).first()

    if conflict:
        return jsonify({'message': 'Datetime is not available'}), 400

    # Create a new reservation
    new_reservation = Reservation(start_datetime=start, end_datetime=end)
    db.session.add(new_reservation)
    db.session.commit()
    return jsonify({'message': 'Datetime is reserved'})

@app.route('/reserved-dates', methods=['GET'])
def reserved_dates():
    reservations = Reservation.query.all()
    reserved_date_ranges = []
    for reservation in reservations:
        start_date = reservation.start_datetime.isoformat()
        end_date = reservation.end_datetime.isoformat()
        reserved_date_ranges.append({'start': start_date, 'end': end_date})

    return jsonify(reserved_date_ranges)

if __name__ == '__main__':
    app.run(debug=True)