#Code

import Adafruit_DHT
import time

DHT_SENSOR = Adafruit_DHT.DHT11
DHT_PIN = 4  

def getTemp():
	fin = False
	
	while fin==False:

		humidity, temperature = Adafruit_DHT.read(DHT_SENSOR,DHT_PIN)

		if humidity is not None and temperature is not None:
			print("Temp= {0:0.1f}C Humidity={1:0.1f}%".format(temperature, humidity))
			fin = True
			return humidity, temperature






'''
def getTemp():

	humidity = 60
	temperature = 23

	fin = False
	while fin==False:
		print("estoy dentro")

		if humidity is not None and temperature is not None:
			#print("Temp= {0:0.1f}C Humidity={1:0.1f}%".format(temperature, humidity))
			fin = True
			return humidity, temperature
'''