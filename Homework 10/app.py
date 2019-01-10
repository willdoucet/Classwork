import numpy as np
import datetime as dt

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func

from flask import Flask, jsonify


#----------------------------------------------------------

engine=create_engine("sqlite:///Resources/hawaii.sqlite", connect_args={'check_same_thread': False})

Base = automap_base()

Base.prepare(engine, reflect=True)

Measurement = Base.classes.measurement
Station = Base.classes.station

session = Session(engine)

app = Flask(__name__)

#----------------------------------------------------------

@app.route("/")
def welcome():

    return (
        f"Available Routes:<br/>"
        f"api/v1.0/precipitation<br/>"
        )

@app.route("/api/v1.0/precipitation")
def precipitation():

    precip_last = session.query(Measurement.date, Measurement.prcp).order_by(Measurement.date.desc()).first()
    end_date_numbers = precip_last[0].split('-')
    now = dt.date(int(end_date_numbers[0]), int(end_date_numbers[1]), int(end_date_numbers[2]))

    year_ago = now - dt.timedelta(days=365)

    precip_data = session.query(Measurement.date, Measurement.prcp).filter(Measurement.date >= year_ago).\
                order_by(Measurement.date).all()

    precip_results = []

    for observation in precip_data:
        precip_dict = {}

        precip_dict[observation.date] = observation.prcp

        precip_results.append(precip_dict)

    return jsonify(precip_results)

@app.route("/api/v1.0/stations")
def stations():

    station_obs = session.query(Measurement.station, func.count(Measurement.station)).group_by(Measurement.station).\
                    order_by(func.count(Measurement.station).desc()).all()
    station_list = []
    for station in station_obs:
        station_dict = {}

        station_dict['id'] = station[0]
        station_dict['# of obs'] = station[1]

        station_list.append(station_dict)

    return jsonify(station_list)

@app.route("/api/v1.0/tobs")
def tobs():

    precip_last = session.query(Measurement.date, Measurement.prcp).order_by(Measurement.date.desc()).first()
    end_date_numbers = precip_last[0].split('-')
    now = dt.date(int(end_date_numbers[0]), int(end_date_numbers[1]), int(end_date_numbers[2]))

    year_ago = now - dt.timedelta(days=365)

    station_temps = session.query(Measurement.station, Measurement.date, Measurement.tobs).filter(Measurement.date >= year_ago).\
                order_by(Measurement.date).all()


    temp_obs = []

    for temp in station_temps:
        temp_dict = {}

        temp_dict['station id'] = temp.station
        temp_dict['date'] = temp.date
        temp_dict['temp'] = temp.tobs

        temp_obs.append(temp_dict)

    return jsonify(temp_obs)

@app.route("/api/v1.0/<start>")
def tempcalc(start):

    start_date = dt.datetime.strptime(start, '%Y-%m-%d').date()
    temp_results = session.query(func.min(Measurement.tobs), func.avg(Measurement.tobs), func.max(Measurement.tobs)).\
        filter(Measurement.date >= start_date).all()
    temp_result = list(np.ravel(temp_results))

    temp_dict = {}
    temp_dict['min temp'] = temp_result[0]
    temp_dict['avg temp'] = temp_result[1]
    temp_dict['max temp'] = temp_result[2]

    return jsonify(temp_dict)

@app.route("/api/v1.0/<start>/<end>")
def tempcalc2(start,end):

    start_date = dt.datetime.strptime(start, '%Y-%m-%d').date()
    end_date = dt.datetime.strptime(end, '%Y-%m-%d').date()
    temp_results = session.query(func.min(Measurement.tobs), func.avg(Measurement.tobs), func.max(Measurement.tobs)).\
        filter(Measurement.date >= start_date).filter(Measurement.date<= end_date).all()
    temp_result = list(np.ravel(temp_results))

    temp_dict = {}
    temp_dict['min temp'] = temp_result[0]
    temp_dict['avg temp'] = temp_result[1]
    temp_dict['max temp'] = temp_result[2]

    return jsonify(temp_dict)



if __name__ == '__main__':
    app.run(debug=True)