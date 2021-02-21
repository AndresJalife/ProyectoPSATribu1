import React, { Component } from 'react';
import { Button,  Modal, ModalHeader, ModalBody, FormGroup, Label, Input, Row, Col } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.css';

import TimePicker from 'react-times';
import HoursModel from '../../models/CargaDeHoras/HoursModel';

import 'react-times/css/classic/default.css';
import './ModalHours.css'
import ProyectoCard from "../Proyectos/ProyectoCard";

export default class ModalHours extends Component {

    constructor(props){
        super(props);

        this.state = {
            isShow: false,
            hoursModel: new HoursModel(),
            lstProjects: [],
            isTaskDisabled: true
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
        this.changeVisibility();
    }

    onTimeChange(newHours) {
        this.state.hoursModel.setNewHours(newHours.hour, newHours.minute);

        this.setState({
            hoursModel: this.state.hoursModel
        })
    }

    onDateChange(newDate){
        this.state.hoursModel.setNewDateTime(newDate);

        this.setState({
            hoursModel: this.state.hoursModel
        })
    }

    componentDidMount()
    {
        fetch('https://proyectopsa.herokuapp.com/proyectos/')
            .then(r => r.json())
            .then((projects) =>
            {
                this.setState({
                    lstProjects: projects
                });
            }, (error) => {console.log(error);});
    }

    onProjectChange(newIdProject){
        this.state.hoursModel.setIdProject(newIdProject);
        
        this.setState({
            hoursModel: this.state.hoursModel,
            isTaskDisabled: (newIdProject == 0)
        });
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
                            <Label>Proyecto</Label>
                            <Input type="select"
                                   onChange={e => this.onProjectChange(e.target.value)}>
                                <option value="0"></option>
                                {this.state.lstProjects.map((p) => <option value={p.codigo}>{p.nombre}</option>)}
                            </Input>
                        </FormGroup>
                        <FormGroup>
                            <Label>Tarea</Label>
                            <Input type="select"
                                   disabled={this.state.isTaskDisabled}></Input>
                        </FormGroup>
                        <FormGroup>
                            <Row>
                                <Col lg={6}>
                                    <Label>Cantidad de Horas</Label>
                                    <TimePicker
                                        theme="classic"
                                        time={this.state.hoursModel.getHoursAsString()}
                                        timeMode="24"
                                        timeConfig={{
                                            step: 15,
                                            unit: 'minutes'
                                        }}
                                        onTimeChange={this.onTimeChange.bind(this)}/>
                                </Col>

                                <Col lg={6}>
                                    <Label>Fecha</Label>
                                    <Input type="date"
                                           max={(new Date().toISOString().split("T")[0])}></Input>
                                </Col>
                            </Row>

                        </FormGroup>
                        <FormGroup>

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