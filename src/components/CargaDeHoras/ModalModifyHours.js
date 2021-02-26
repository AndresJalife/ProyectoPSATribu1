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
import swal from "sweetalert2";

import { FaPencilAlt } from "react-icons/fa";

export default class ModalModifyHours extends Component {

    static propTypes = {
        hours: PropTypes.object.isRequired,
        onReload: PropTypes.func.isRequired,
    };

    constructor(props){
        super(props);

        let hoursAux = new HoursModel();
        hoursAux.file = props.hours.file;

        this.state = {
            isShow: false,
            hoursModel: hoursAux,
            lstProjects: [],
            lstTasks: [],
            isTaskDisabled: false,
            taskIsLoading: false,
            errorMessage:""
        };

        this.state.hoursModel.setIdProject(this.props.hours.idProject);
        this.state.hoursModel.setIdTask(this.props.hours.idTask);
        this.state.hoursModel.setNewHours(this.props.hours.quantityHours, this.props.hours.quantityMinutes);
        this.state.hoursModel.date = this.props.hours.date;

        this.saveHoursById = this.saveHoursById.bind(this);
        this.changeVisibility = this.changeVisibility.bind(this);
        this.saveHoursWithEnter = this.saveHoursWithEnter.bind(this);
        this.getListTasks = this.getListTasks.bind(this);
        this.getListTasks();
    }

    changeVisibility() {
        this.setState({
            isShow: !this.state.isShow,
            errorMessage: "",
        });
    }

    saveHoursWithEnter(e){
        if(e.key === 'Enter'){
            this.changeVisibility();
        }
    }

    saveHoursById() {

        if (!this.isFormValid()){
            this.setState({
                errorMessage: "Por favor, complete todos los campos obligatorios"
            });
            return;
        }

        let url = 'https://squad6-backend.herokuapp.com/hours/' + this.props.hours.id;

        let data = {
            id: this.props.hours.id,
            file: this.props.hours.file,
            idProject: this.state.hoursModel.idProject,
            idTask: this.state.hoursModel.idTask,
            quantityHours: this.state.hoursModel.quantityHours,
            quantityMinutes: this.state.hoursModel.quantityMinutes,
            date: this.state.hoursModel.date,
            loadingDate: this.props.hours.loadingDate
        };

        var dateAsString = this.state.hoursModel.getDateAsString();
        var hoursAsString = this.state.hoursModel.getHoursAsString();

        let self = this;

        swal.fire({
            title: 'Modificar horas',
            text:
                "¿Está seguro que desea modificar estas horas?",
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            dangerMode: 'true',
            confirmButtonText: 'Confirmar',
            cancelButtonText: 'Cancelar'
        }).then(answer=>{
            if(answer.isConfirmed){

                fetch(url, {
                    method: 'PUT',
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

                        self.props.hours.idTask = self.state.hoursModel.idTask;
                        self.props.hours.idProject = self.state.hoursModel.idProject;

                        self.changeVisibility();
                        self.props.onReload();
                        swal.fire({
                            title: "Se modificaron las horas correctamente.",
                            icon: "success"
                        })
                    })
                    .catch(function(error) {
                        self.setState({
                            errorMessage: "No se puede cargar más de 24 horas un mismo día"
                        });
                    });
            }
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
        this.setState({ 
            hoursModel: this.state.hoursModel
        })
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

    getListTasks(){

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

    onProjectChange(newIdProject){

        this.setState({taskIsLoading: true});

        this.state.hoursModel.setIdProject(newIdProject);
        this.state.hoursModel.setIdTask(0);
        let shouldTaskDisabled = (newIdProject == 0);

        if (shouldTaskDisabled){
            this.setState({
                hoursModel: this.state.hoursModel,
                lstTasks: [],
                isTaskDisabled: shouldTaskDisabled,
                taskIsLoading: false
            });
            
        } else {
            this.getListTasks();
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

                <button type="button" className="btn btn-sm btn-rounded " onClick = {this.changeVisibility} style={{marginTop: "-7px", color: "blue"}}>
                                <FaPencilAlt/>
                            </button>

                <Modal isOpen={this.state.isShow}
                       toggle={this.changeVisibility}
                       onKeyPress={this.saveHoursWithEnter}>

                    <ModalHeader toggle={this.changeVisibility}>Modificar hora cargada</ModalHeader>

                    <ModalBody onKeyPress={this.saveHoursWithEnter}>
                        <FormGroup>
                            <Label>Proyecto *</Label>
                            <Input type="select"
                                   onChange={e => this.onProjectChange(e.target.value)}
                                   value={this.state.hoursModel.idProject.toString()}>
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
                                           onChange={e => this.onTaskChange(e.target.value)} 
                                           value={this.state.hoursModel.idTask.toString()}>
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
                                        onTimeChange={this.onTimeChange.bind(this)}
                                        />
                                </Col>

                                <Col lg={6}>
                                    <Label>Fecha *</Label>
                                    <Input type="date"
                                           max={(new Date().toISOString().split("T")[0])}
                                           onChange={e => this.onDateChange(e.target.value)}
                                           value={
                                            this.state.hoursModel.date.toString().substr(0,4) + "-" + 
                                            this.state.hoursModel.date.toString().substr(4,2) + "-" + 
                                            this.state.hoursModel.date.toString().substr(6,2)}></Input>
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
                                <Button color="primary" onClick={this.saveHoursById}>Guardar</Button>
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