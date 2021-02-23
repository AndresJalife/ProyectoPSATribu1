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
        this.quantityMinutes = 15;
        this.date = 0;
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
        this.loadingDate = otherHours.loadingDate;
        this.nameProject = otherHours.nameProject;
        this.nameTask = otherHours.nameTask;
    }

    HoursModel(id, file, idProject, idTask, quantityHours, quantityMinutes, date, loadingDate, nameProject, nameTask){
        this.id = id;
        this.file = file;
        this.idProject = idProject;
        this.idTask = idTask;
        this.quantityHours = quantityHours;
        this.quantityMinutes = quantityMinutes;
        this.date = date;
        this.loadingDate = loadingDate;
        this.nameProject = nameProject;
        this.nameTask = nameTask;
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

    getDateAsString(){
        let dateString = this.date.toString();

        let year = dateString.substr(0,4),
            mont = dateString.substr(4,2),
            days = dateString.substr(6,2);

        return `${days}/${mont}/${year}`;
    }

    setNewHours(hours, minutes){
        this.quantityHours = hours;
        this.quantityMinutes = minutes;
    }

    completeData(){
        if ((this.idTask === 0) ||
            ((this.quantityHours === 0) && (this.quantityMinutes === 0)) ||
            (this.date === 0))
            return false;

        return true;
    }
}