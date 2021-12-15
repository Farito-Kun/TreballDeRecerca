# SPDX-FileCopyrightText: 2021 ladyada for Adafruit Industries
# SPDX-License-Identifier: MIT
'''
import time
import board
import adafruit_ccs811

i2c = board.I2C()  # uses board.SCL and board.SDA
ccs811 = adafruit_ccs811.CCS811(i2c)

# Wait for the sensor to be ready
while not ccs811.data_ready:
    pass

while True:
    print("CO2: {} PPM, TVOC: {} PPB".format(ccs811.eco2, ccs811.tvoc))
    time.sleep(0.5)
'''
#this example reads and prints CO2 equiv. measurement, TVOC measurement, and temp every 2 seconds

import time
import Adafruit_CCS811

ccs =  Adafruit_CCS811()

while not ccs.available():
	pass
temp = ccs.calculateTemperature()
ccs.tempOffset = temp - 25.0

while(1):
    if ccs.available():
	    temp = ccs.calculateTemperature()
	    if not ccs.readData():
	      print("CO2: ", ccs.geteCO2(), "ppm, TVOC: ", ccs.getTVOC(), " temp: ", temp)

	    else:
	      print ("ERROR!")
	      while(1):
	      	pass
	
