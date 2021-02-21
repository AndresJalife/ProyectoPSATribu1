import React, { Component } from 'react';
import { Button,  Modal, ModalHeader, ModalBody, FormGroup, Label, Input, Row, Col } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.css';

import TimePicker from 'react-times';
import HoursModel from '../../models/CargaDeHoras/HoursModel';

import 'react-times/css/classic/default.css';

export default class ModalHours extends Component {

    constructor(props){
        super(props);

        this.state = {
            isShow: false,
            hoursModel: new HoursModel()
        };

        this.saveHours = this.saveHours.bind(this);
        this.changeVisibility = this.changeVisibility.bind(this);

        this.saveHoursWithEnter = this.saveHoursWithEnter.bind(this);
    }

    changeVisibility() {
        this.setState({
            isShow: !this.state.isShow,
            hoursModel: this.state.hoursModel
        });

    }

    saveHoursWithEnter(e){

    }

    saveHours() {
        this.changeVisibility();
    }

    onTimeChange(newHours) {
       var newModel = new HoursModel(this.state.hoursModel);

       newModel.setNewHours(newHours.hour, newHours.minute);

        this.setState({
            isShow: this.state.isShow,
            hoursModel: newModel
        })
    }

    render(){

        return (
            <div>
                <Button color="primary" onClick={this.changeVisibility}>Nueva</Button>

                <Modal isOpen={this.state.isShow}
                       toggle={this.changeVisibility}
                       onKeyPress={this.saveHoursWithEnter()}>

                    <ModalHeader toggle={this.changeVisibility}>Carga de Horas</ModalHeader>

                    <ModalBody onKeyPress={this.saveHoursWithEnter()}>
                        <FormGroup>
                            <Label>Proyecto</Label>
                        </FormGroup>
                        <FormGroup>
                            <Label>Tarea</Label>
                        </FormGroup>
                        <FormGroup>
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
                        </FormGroup>
                        <FormGroup>
                            <Label>Fecha</Label>
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