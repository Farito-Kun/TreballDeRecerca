'''
    pip install Flask
'''

from http_example import objectTemp

import firebase
from flask import jsonify,Response
import json
from flask import Flask, jsonify, request

#Cors
from flask_cors import CORS, cross_origin

app = Flask(__name__)
CORS(app, support_credentials=True)


#****************** [ Emails ] *****************************************
#***********************************************************************


@app.route('/emails/', methods=['POST'])
@cross_origin(supports_credentials=True)
def addEmail():
    req = request.get_json()
    emial = req.get('email')
    ownr = req.get('id_user')

    firebase.addEmail(emial,ownr)
    return jsonify("Correct!")


@app.route('/emails/<email>', methods=['DELETE'])
@cross_origin(supports_credentials=True)
def deleteEmail(email):
    firebase.deleteEmail(email)
    return jsonify("Correct!!!")


@app.route('/emails-owner/<owner>', methods=['GET'])
@cross_origin(supports_credentials=True)
def getEmailsOwner(owner):
    return jsonify(firebase.getAllEmailOwner(owner))

@app.route('/available-email/', methods=['PUT'])
@cross_origin(supports_credentials=True)
def availableEmail():
    req = request.get_json()

    id_user = req.get('id_user')
    email = req.get('email')
    status = req.get('status')
    return jsonify(firebase.availableEmail(id_user,email,status))



#****************** [ Sensor DHT11 ] *****************************************
#*****************************************************************************

@app.route('/temperaturas',methods=['GET'])
@cross_origin(supports_credentials=True)
def getAllTemperatures():
    '''
    temps= [
        {
            "name": "34",
            "value": 42
        },
        {
            "name": "34",
            "value": 42
        },
        {
            "name": "34",
            "value": 42
        },
        {
            "name": "34",
            "value": 42
        },
    ]
    '''
    return jsonify(firebase.getAllValuesTemp())
    return jsonify(temps)

@app.route('/temperaturas-day/<day>',methods=['GET'])
@cross_origin(supports_credentials=True)
def getDayTemp(day):
    return jsonify(firebase.getAllDeyTemp(day))

#****************** [ Sensor Aire ] *****************************************
#****************************************************************************
@app.route('/aire-co2',methods=['GET'])
@cross_origin(supports_credentials=True)
def getAllAir():
    return jsonify(firebase.getAllValuesAir())

@app.route('/aire-co2/<day>',methods=['GET'])
@cross_origin(supports_credentials=True)
def getDayAir(day):
    return jsonify(firebase.getAllDeyAir(day))


#****************** [ Logs ] ************************************************
#****************************************************************************
@app.route('/logs',methods=['GET'])
@cross_origin(supports_credentials=True)
def getLogs():
    return jsonify(firebase.getAllLogs())

if __name__ == "__main__":
    app.run(debug = True)