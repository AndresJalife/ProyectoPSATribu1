export default class HoursModel {

    id = 0
    file = 0
    idProject = 0
    idTask = 0
    quantityHours = 0
    quantityMinutes = 0
    date = 0
    loadingDate = 0
    nameProject = ""
    nameTask = "";

    constructor(){
        this.id = 0;
        this.file = 0;
        this.idProject = 0;
        this.idTask = 0;
        this.quantityHours = 0;
        this.quantityMinutes = 0;
        this.date = 0;
        this.dateAsDateTime = 0;
        this.loadingDate = 0;
        this.nameProject = "";
        this.nameTask = "";
    }

    HoursModel(otherHours){
        this.id = otherHours.id;
        this.file = otherHours.file;
        this.idProject = otherHours.idProject;
        this.idTask = otherHours.idTask;
        this.quantityHours = otherHours.quantityHours;
        this.quantityMinutes = otherHours.quantityMinutes;
        this.date = otherHours.date;
        this.dateAsDateTime = otherHours.dateAsDateTime;
        this.loadingDate = otherHours.loadingDate;
        this.nameProject = otherHours.nameProject;
        this.nameTask = otherHours.nameTask;
    }

    getIdProject(){
        return this.idProject;
    }

    setIdProject(newIdProject){
        this.idProject = newIdProject;
    }

    getIdTask(){
        return this.idTask;
    }

    setIdTask(newIdTask){
        this.idTask = newIdTask;
    }

    getHoursAsString(){
        return this.quantityHours + ":" + this.quantityMinutes;
    }

    setNewHours(hours, minutes){
        this.quantityHours = hours;
        this.quantityMinutes = minutes;
    }

    getDateAsDateTime(){
        return this.dateAsDateTime;
    }

    setNewDateTime(newDateTime){
        this.date = (newDateTime.getFullYear() * 10000) +
                    (newDateTime.getMonth() + 1) * 100 +
                    (newDateTime.getDate());
        this.dateAsDateTime = newDateTime;
    }
}