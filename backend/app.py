from flask import Flask, jsonify, request
from flask_cors import CORS
app = Flask(__name__)
from threading import Thread, Lock
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from flask_login import UserMixin
from datetime import datetime

app = Flask(__name__)

# Allows CORS for all domain and routes
CORS(app)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///startmunich.db'

# SQLAlchemy is ORM (ObjectRelationalMapping) 
db = SQLAlchemy()
db.init_app(app) 

reservationLock = Lock()




class Reservation(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    start_datetime = db.Column(db.DateTime, nullable=False)
    end_datetime = db.Column(db.DateTime, nullable=False)

# Create the database tables within an application context
with app.app_context():
    db.create_all()


# App routes
@app.route('/reserve', methods=['POST'])
def reserve():
    data = request.json
    start = datetime.fromisoformat(data['start'])
    end = datetime.fromisoformat(data['end'])
    # Check if the datetime range is available
    with reservationLock:
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




if __name__ == '__main__':
    app.run(debug=True)