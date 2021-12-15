'''
    pip install Flask
'''

from http_example import objectTemp


from flask import jsonify
from flask import Flask 
app = Flask(__name__)




@app.route('/')
def hello():
    return "Hoola Adrián"

@app.route('/temperaturas')
def temp():
    values = objectTemp()
    return jsonify(values)

if __name__ == "__main__":
    app.run(debug = True)
