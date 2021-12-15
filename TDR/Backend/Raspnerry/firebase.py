import pyrebase
import itertools

firebaseConfig = {
    "apiKey": "AIzaSyCtweIlp28Qfg38n7hL4FTj3Uv9AfBhczk",
    "authDomain": "proyectosensoresraspberry.firebaseapp.com",
    "databaseURL": "https://proyectosensoresraspberry-default-rtdb.firebaseio.com/",
    "projectId": "proyectosensoresraspberry",
    "storageBucket": "proyectosensoresraspberry.appspot.com",
    "messagingSenderId": "529782078763",
    "appId": "1:529782078763:web:926a67ba8c8f612601196e",
    "measurementId": "G-2CPH2CCE11",
    "serviceAccount": "./raspberry_config/clave.json",

}

firebase =  pyrebase.initialize_app(firebaseConfig)
db = firebase.database()

#Añadir datos

'''
#Nos genera clave única automáticamente.

data = {
    "Temp": 27,
    "Humidity": "43.7%",
    "alt": "kkakjjh"
}
db.push(data)
'''

'''
#Crear nuestra clave única.
data = {
    "Temp": 0,
    "Humidity": "111.1%"
}
db.child("Calse_1a").set(data)
'''

'''
#Crear nuestra propia Ruta
data = {
    "Temp": 341,
    "Humidity": "434.4%"
}
createData("11-10-2002",data)
'''

'''
vsd= db.child("temperaturas").child("21-08-2021").get()

for t in vsd.each():
    print(t.key(),"\t",t.val(), "\n")
'''

#******************************************************************************* 
#********************[ Sensor DHT11 ] ****************************************** 

def createDataTemp(date,value): 
    db.child("temperaturas").child(date).push(value)

def getAllValuesTemp():  
    '''
    List = []
    x = db.child("temperaturas").get()
    for task in x.each():
        k = task.key()
        m = db.child("temperaturas").child(k).get()

        for temp in m.each():
            List.append(temp.val())
    return List
    '''



    List = []
    hummm = []
    temppp = []

    x = db.child("temperaturas").get()
    for task in x.each():
        k = task.key()
        
        list_dia = getAllDeyTemp(k)
        
        for i in list_dia:
            t =  [
                {
                "name": k,
                "value": i.get('Temp')
                },
            ]

            h =  [
                {
                "name": k,
                "value": i.get('Humidity')
                },
            ]
            hummm.append(h)
            temppp.append(t)


    
    aaa = [
      {
        "name": "Temperatura",
        "series": [temppp]
      },
      {
        "name": "Humedad",
        "series": [hummm]
      }
    ]
    return temppp


def getAllDeyTemp(value):
    List = []
    val = db.child("temperaturas").child(value).get()
    for task in val.each():
        List.append(task.val())
        #print(task.key() , ": " , task.val())

    '''
    List = []
    x = db.child("temperaturas").child(value).get()
    for task in x.each():
        k = task.key()
        m = db.child("temperaturas").child(k).get()

        for temp in m.each():
            List.append(temp.val())
    
    '''
    return List

#Delete data
def removeValueTemp(value):
    db.child("temperaturas").child("20-08-2021").child("-MhdeCBriS1GQwUN0dTo").remove()


#****************************************************************************** 
#********************[ Sensor Aire ] ****************************************** 
'''
data = {
    "Ro": 1.078680,
    "LPG": 0.007359,
    "CO": 0.004696,
    "Smoke": 0.01958,
}
'''
def createDataAir(date,value): 
    db.child("sensor_aire").child(date).push(value)

def getAllValuesAir():  
    '''
    List = []
    x = db.child("sensor_aire").get()
    for task in x.each():
        print(task.key() , ": " , task.val(), "\n")
    '''
    List = []
    x = db.child("sensor_aire").get()
    for task in x.each():
        k = task.key()
        m = db.child("sensor_aire").child(k).get()

        for temp in m.each():
            List.append(temp.val())
    return List

def getAllDeyAir(value):
    List = []
    val = db.child("sensor_aire").child(value).get()
    for task in val.each():
        #print(task.key() , ": " , task.val())
        List.append(task.val())
    return List

#****************************************************************************** 
#**************************[ Email ] ****************************************** 

def addEmail(emailVal, owner): 
    '''
    db.child("emails").child(owner)
    m = {
        "email": emailVal,
        "status": "true"
    }
    db.child("emails").child(owner).push(m)
    '''
    m = {
        "id_user": owner,
        "email": emailVal,
        "status": "true"
    }
    db.child("emails").push(m)

def getAllEmailOwner(owner): 
    '''
    List = [] 
    own = db.child("emails").child(owner).get()
    k = own.key()
    m = db.child("emails").child(k).get()

    for mail in m.each():   
        List.append(mail.val())

    return List
    '''

    lista = [] 
    keys = db.child("emails").get()

    for key in keys.each():  
        email = key.val()
        if email.get('id_user') == owner:
            lista.append(email)

    return lista



def getAllEmail(): 
    List = [] 

    val = db.child("emails").get()

    for mail in val.each():
        k = mail.key()
        m = db.child("emails").child(k).get()

        for mail in m.each():   
            List.append(mail.val())
    return List

def deleteEmail(emailx):  
    ''' 
    emails = db.child("emails").child(owner).get()
    for email in emails.each():
        if email.val() == emailx:
            keyEmail = email.key()
            db.child("emails").child(owner).child(keyEmail).remove()
    '''
    keys = db.child("emails").get()

    for key in keys.each():  
        email = key.val()
        if email.get('email') == emailx:
            db.child("emails").child(key.key()).remove()

def availableEmail(idUser, emaiL,value):
    keys = db.child("emails").get()
    for key in keys.each():  
        email = key.val()
        if email.get('id_user') == idUser and email.get('email') == emaiL:
            db.child("emails").child(key.key()).update({"status":value})

#****************************************************************************** 
#**************************[ Logs ] ****************************************** 

def addLog(date, error, tipo): 
    log = {
        "fecha": date,
        "error": error,
        "tipo": tipo,
    }
    db.child("logs").child(date).push(log)

def getAllLogs(): 
    List = [] 

    val = db.child("logs").get()

    for log in val.each():
        k = log.key()
        m = db.child("logs").child(k).get()

        for i in m.each():   
            List.append(i.val())
    return List


print(getAllValuesTemp())

#availableEmail("adrián","hola@gmail.com",'true')
#addEmail("hola@gmail.com", "adrián")
#deleteEmail("hh@gmail.com")
#print(getAllEmailOwner("lkl"))

'''
    mails = getAllEmail()
    print(mails)



    mails = getAllEmail()
    print(mails)



val = getAllEmailOwner("Adrián")
print(val)


#deleteEmail("kak","kka2@gmail.com")

getAllEmail()
'''


