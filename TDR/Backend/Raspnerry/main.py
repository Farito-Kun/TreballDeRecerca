import time
from datetime import date
import sensor_dht11
import firebase
import emailServive 

def cronos():
    List = ['Sunday','Saturday']
    year, month, day, hour, min = map(int, time.strftime("%Y %m %d %H %M").split())
    today_name = date.today().strftime("%A")

    v =int(str(hour)+str(min))
    if today_name not in List:
        if v <= 1430 and v >=800:
            return True
        else:
            return False
    else:
        return False

def check_values(temp, hum, air):
    if temp >=26 and hum <=50 and hum >=30 and air <= 1200 :
        return True
    else:
        return False

def run():
    err = False
    while True:
        #Get dht11 values
        r = sensor_dht11.getTemp()
        '''
        
        year, month, day, hour, min = map(int, time.strftime("%Y %m %d %H %M").split())
        data = str(day)+'-'+str(month)+'-'+str(year)




        temp = {
            "Temp": r[1],
            "Humidity": r[0]
        }
        #Save db 
        firebase.createDataTemp(data,temp)

        #Get air values

        #check values
        airOK = check_values(r[1], r[0], 20)
        if airOK== False:
             emailServive.sendMAil('WARNIG', 'abrir ventanas',temp,1145)
             time.sleep(300)

             r = temp.Temp+ " | " + temp.Humidity
             firebase.addLog(data,r,"Sensor temperatura.")    : <------Falts----- Test
             err = True
             
        while err:
            r = sensor_dht11.getTemp()
            temp = {
                "Temp": r[1],
                "Humidity": r[0]
            }
            #Save db 
            firebase.createDataTemp(data,temp)     
            airOK = check_values(r[1],r[0],1145)
            if airOK:
                emailServive.sendMAil('SUCCES', 'todo bien',temp,1145)
                err = False
        time.sleep(5)
        '''


if __name__ == "__main__":
    run()

   #Run Http server also. 

