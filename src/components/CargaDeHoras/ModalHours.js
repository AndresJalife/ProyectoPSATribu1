import React, { Component } from 'react';
import { Alert, Button,  Modal, ModalHeader, ModalBody, FormGroup, Label, Input, Row, Col } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.css';

import TimePicker from 'react-times';
import HoursModel from '../../models/CargaDeHoras/HoursModel';

import 'react-times/css/classic/default.css';
import './ModalHours.css'
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import PropTypes from "prop-types";
import swal from "sweetalert";

export default class ModalHours extends Component {

    static propTypes = {
        onReload: PropTypes.func.isRequired
    };

    constructor(props){
        super(props);

        let hours = new HoursModel();
        hours.file = props.file;

        this.state = {
            isShow: false,
            hoursModel: hours,
            lstProjects: [],
            lstTasks: [],
            isTaskDisabled: true,
            taskIsLoading: false,
            errorMessage:""
        };

        this.saveHours = this.saveHours.bind(this);
        this.changeVisibility = this.changeVisibility.bind(this);

        this.saveHoursWithEnter = this.saveHoursWithEnter.bind(this);
    }

    changeVisibility() {
        this.setState({
            isShow: !this.state.isShow,
            errorMessage: "",
            isTaskDisabled: true
        });
        
        this.state.hoursModel.setIdProject(0);
        this.state.hoursModel.setIdTask(0);
        this.state.hoursModel.date = 0;
    }

    saveHoursWithEnter(e){
        if(e.key === 'Enter'){
            this.changeVisibility();
        }
    }

    saveHours() {

        if (!this.isFormValid()){
            this.setState({
                errorMessage: "Por favor, complete todos los campos obligatorios"
            });
            return;
        }

        let url = "https://squad6-backend.herokuapp.com/hours";

        let data = {
            file: this.state.hoursModel.file,
            idProject: this.state.hoursModel.idProject,
            idTask: this.state.hoursModel.idTask,
            quantityHours: this.state.hoursModel.quantityHours,
            quantityMinutes: this.state.hoursModel.quantityMinutes,
            date: this.state.hoursModel.date
        };

        var dateAsString = this.state.hoursModel.getDateAsString();
        var hoursAsString = this.state.hoursModel.getHoursAsString();

        let self = this;

        fetch(url, {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            redirect: 'follow',
            referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
            body: JSON.stringify(data) // body data type must match "Content-Type" header
        })
        .then(function(response) {

            if(!response.ok)
                throw new Error();

            swal({
                text: "Se cargaron " + hoursAsString + " horas del " + dateAsString + " con éxito.",
                icon: "success"
            }).then(() => {
                self.changeVisibility();
                self.props.onReload();
            });
        })
        .catch(function(error) {
            self.setState({
                errorMessage: "No se puede cargar más de 24 horas un mismo día"
            });
        });
    }

    onTimeChange(newHours) {
        this.state.hoursModel.setNewHours(parseInt(newHours.hour), parseInt(newHours.minute));

        this.setState({
            hoursModel: this.state.hoursModel
        })
    }

    onDateChange(newDate){
        var stringNewDate = newDate.replace(/-/gi, "");

        if (isNaN(parseInt(stringNewDate))){
            this.state.hoursModel.date = 0;
            return;
        }
        this.state.hoursModel.date = parseInt(stringNewDate);
    }

    isFormValid(){
        return this.state.hoursModel.completeData();
    }

    componentDidMount()
    {
        //https://proyectopsa.herokuapp.com/proyectos/
        fetch('https://proyectopsa.herokuapp.com/proyectos/')
            .then(r => r.json())
            .then((projects) =>
            {
                this.setState({
                    lstProjects: projects
                });
            }, (error) => {console.log(error);});
    }

    async getListTasks(){

        let urlTask = 'https://proyectopsa.herokuapp.com/proyectos/' + this.state.hoursModel.getIdProject() + '/tarea/';

        fetch(urlTask)
            .then(r => r.json())
            .then((tasks) =>
            {
                this.setState({
                    lstTasks: tasks
                });
            }, (error) => {console.log(error);});
    }

    onProjectChange(newIdProject){

        this.setState({taskIsLoading: true});

        this.state.hoursModel.setIdProject(newIdProject);

        let shouldTaskDisabled = (newIdProject == 0);

        if (shouldTaskDisabled){
            this.setState({
                hoursModel: this.state.hoursModel,
                lstTasks: [],
                isTaskDisabled: shouldTaskDisabled,
                taskIsLoading: false
            });
        } else {
            let urlTask = 'https://proyectopsa.herokuapp.com/proyectos/' + this.state.hoursModel.getIdProject() + '/tarea/';

            fetch(urlTask)
                .then(r => r.json())
                .then((tasks) =>
                {
                    this.setState({
                        hoursModel: this.state.hoursModel,
                        lstTasks: tasks,
                        isTaskDisabled: false,
                        taskIsLoading: false
                    });
                }, (error) => {console.log(error);});
        }
    }

    onTaskChange(newIdTask){
        this.state.hoursModel.setIdTask(parseInt(newIdTask));

        this.setState({
            hoursModel: this.state.hoursModel
        })
    }

    render(){

        return (
            <div>

                <Button color="primary" onClick={this.changeVisibility}>Nueva</Button>

                <Modal isOpen={this.state.isShow}
                       toggle={this.changeVisibility}
                       onKeyPress={this.saveHoursWithEnter}>

                    <ModalHeader toggle={this.changeVisibility}>Carga de Horas</ModalHeader>

                    <ModalBody onKeyPress={this.saveHoursWithEnter}>
                        <FormGroup>
                            <Label>Proyecto *</Label>
                            <Input type="select"
                                   onChange={e => this.onProjectChange(e.target.value)}>
                                <option value="0"></option>
                                {this.state.lstProjects.map((p) => <option key={p.codigo} value={p.codigo}>{p.nombre}</option>)}
                            </Input>
                        </FormGroup>
                        <FormGroup>
                            <Label>Tarea *</Label>
                            {
                                this.state.taskIsLoading ?
                                    <Col className="text-center">
                                        <Loader
                                            type="TailSpin"
                                            color="#00BFFF"
                                            height={30}
                                            width={30}></Loader>
                                    </Col>
                                    :
                                    <Input type="select"
                                           disabled={this.state.isTaskDisabled}
                                           onChange={e => this.onTaskChange(e.target.value)}>
                                        <option value="0"></option>
                                        {this.state.lstTasks.map((t) => <option key={t.codigo} value={t.codigo}>{t.nombre}</option>)}
                                    </Input>
                            }

                        </FormGroup>
                        <FormGroup>
                            <Row>
                                <Col lg={6}>
                                    <Label>Cantidad de Horas *</Label>
                                    <TimePicker
                                        theme="classic"
                                        time={this.state.hoursModel.getHoursAsString()}
                                        timeMode="24"
                                        timeConfig={{
                                            from: '0:15',
                                            to: '23:45',
                                            step: 15,
                                            unit: 'minutes'
                                        }}
                                        onTimeChange={this.onTimeChange.bind(this)}/>
                                </Col>

                                <Col lg={6}>
                                    <Label>Fecha *</Label>
                                    <Input type="date"
                                           max={(new Date().toISOString().split("T")[0])}
                                           onChange={e => this.onDateChange(e.target.value)}></Input>
                                </Col>
                            </Row>

                        </FormGroup>
                        <FormGroup>
                            <Col className="col-datos-oblig">
                                (*) para aquellos campos que sean requeridos obligatoriamente
                                <hr/>
                            </Col>
                        </FormGroup>
                        <FormGroup check row>
                            <Col sm={{ size: 10, offset: 9 }}>
                                <Button color="primary" onClick={this.saveHours}>Guardar</Button>
                            </Col>
                        </FormGroup>

                        {this.state.errorMessage ? (
                          <Alert id="alerta" color="danger"> {this.state.errorMessage} </Alert>
                        ) : (
                          null
                        )}
                    </ModalBody>

                </Modal>
            </div>
        );
    }
}