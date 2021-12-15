export class ApiRutas {

    globalUrl = "http://127.0.0.1:5000/"
    


    //-------- Email ----------------------
    //add email
    addEmail = this.globalUrl+"emails/"

    //emails-owner/<owner>
    getEmailsOwner = this.globalUrl+"emails-owner/"

    //emails-owner/<owner>
    deleteEmails = this.globalUrl+"emails/"

    //email disponible
    disponible = this.globalUrl+"available-email/"




    //-------- Logs ----------------------
    //Get logs
    getLogs = this.globalUrl+"logs"

    //Temperatura
    getTemperatura = this.globalUrl+"temperaturas"

    //CO2
    getCO2 = this.globalUrl+"aire-co2"
}