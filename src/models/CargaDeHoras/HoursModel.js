export default class HoursModel {

    id = 0
    file = 0
    idTask = 0
    quantityHours = 0
    quantityMinutes = 0
    date = 0
    loadingDate = 0;

    constructor(){
        this.id = 0;
        this.file = 0;
        this.idTask = 0;
        this.quantityHours = 0;
        this.quantityMinutes = 0;
        this.date = 0;
        this.loadingDate = 0;
    }

    HoursModel(otherHours){
        this.id = otherHours.id;
        this.file = otherHours.file;
        this.idTask = otherHours.idTask;
        this.quantityHours = otherHours.quantityHours;
        this.quantityMinutes = otherHours.quantityMinutes;
        this.date = otherHours.date;
        this.loadingDate = otherHours.loadingDate;
    }

    getHoursAsString(){
        return this.quantityHours + ":" + this.quantityMinutes;
    }

    setNewHours(hours, minutes){
        this.quantityHours = hours;
        this.quantityMinutes = minutes;
    }
}