import React, { Component } from 'react';
import { Button,  Modal, ModalHeader, ModalBody, FormGroup, Label, Input, Row, Col } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.css';

import TimePicker from 'react-times';
import HoursModel from '../../models/CargaDeHoras/HoursModel';

import 'react-times/css/classic/default.css';
import './ModalHours.css'
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

export default class ModalHours extends Component {

    constructor(props){
        super(props);

        var hours = new HoursModel();
        hours.file = props.file;

        this.state = {
            isShow: false,
            hoursModel: hours,
            lstProjects: [],
            lstTasks: [],
            isTaskDisabled: true,
            taskIsLoading: false
        };

        this.saveHours = this.saveHours.bind(this);
        this.changeVisibility = this.changeVisibility.bind(this);

        this.saveHoursWithEnter = this.saveHoursWithEnter.bind(this);
    }

    changeVisibility() {
        this.setState({
            isShow: !this.state.isShow
        });

    }

    saveHoursWithEnter(e){
        if(e.key === 'Enter'){
            this.changeVisibility();
        }
    }

    saveHours() {

        if (!this.isFormValid())
            return;

        let url = "https://squad6-backend.herokuapp.com/hours";

        let data = {
            file: this.state.hoursModel.file,
            idTask: this.state.hoursModel.idTask,
            quantityHours: this.state.hoursModel.quantityHours,
            quantityMinutes: this.state.hoursModel.quantityMinutes,
            date: this.state.hoursModel.date
        };

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
            self.changeVisibility();
        })
        .catch(function(error) {

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
                    </ModalBody>

                </Modal>
            </div>
        );
    }
}