
import smtplib

# ************************************************
# { Permitir acceso aplicaciónes poco seguras }
# ************************************************
gmail_user = 'treballrecerca41@gmail.com'
gmail_password = 'treball_recerca_2022'

import firebase
from firebase import getAllEmail


def sendMAil(subjectM, bodyM, temp, airQ):

    #We get mails from bd
    #mails = firebase.getAllEmail()

    sent_from = gmail_user
    to = 'youneskabiri17@gmail.com'
    subject = "ddd"
    body = bodyM
    email_text = """\
        From: %s
        To: %s
        Subjecxtx: %s

        %s
        """ % (sent_from, ", ".join(to), "ssssss", body)


    try:
        server = smtplib.SMTP_SSL('smtp.gmail.com', 465)
        server.login(gmail_user, gmail_password)
        server.sendmail(sent_from, to, "Alerta...")
        server.close()
    except:
        print('Something went wrong...')

temp = {
            "Temp": "40",
            "Humidity": "53"
        }
sendMAil('WARNIG', 'abrir ventanas',temp,1145)
#getEmails()
#cadena("{'-Mi2XczvX3GiHE1dt9Wj': 'flsayleaqiwzhnyojh@uivvn.net', '-Mi2Xd15Zajcz8Q8Z5Qp': 'qqlurlmjihjxighbwm@tbbyt.net'}")



