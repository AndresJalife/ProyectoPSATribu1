import React, { Component } from 'react';
import { Button,  Modal, ModalHeader, ModalBody, FormGroup, Label, Input, Row, Col } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.css';

import TimePicker from 'react-times';

import 'react-times/css/classic/default.css';
import './ModalTickets.css'

export default class ModalTickets extends Component {

    constructor(props){
        super(props);

        this.state = {
            isShow: false
        };

        this.saveTicket = this.saveTicket.bind(this);
        this.changeVisibility = this.changeVisibility.bind(this);

        this.saveTIcketWithEnter = this.saveTicketWithEnter.bind(this);
    }

    changeVisibility() {
        this.setState({
            isShow: !this.state.isShow
        });

    }

    saveTicketWithEnter(e){
        if(e.key === 'Enter'){
            this.changeVisibility();
        }
    }

    saveTicket() {
        this.changeVisibility();
    }



    render(){

        return (
            <div>
                <Button color="primary" onClick={this.changeVisibility}>Crear Ticket</Button>

                <Modal isOpen={this.state.isShow}
                       toggle={this.changeVisibility}
                       onKeyPress={this.saveTicketWithEnter}>

                    <ModalHeader toggle={this.changeVisibility}>Carga de Ticket</ModalHeader>

                    <ModalBody onKeyPress={this.saveTicketWithEnter}>
                        <FormGroup>
                            <Label>Tarea</Label>
                            <Input type="select"></Input>
                        </FormGroup>
                        <FormGroup>
                            <Label>Tipo</Label>
                            <Input type="select"></Input>
                        </FormGroup>
                        <FormGroup>

                                    <Label>Descripcion</Label>
                                    <Input type="text"></Input>

                        </FormGroup>
                        <FormGroup>
                            <Label>Prioridad</Label>
                            <Input type="select"></Input>
                        </FormGroup>
                        <FormGroup>

                        </FormGroup>
                        <FormGroup check row>
                            <Col sm={{ size: 10, offset: 9 }}>
                                <Button color="primary" onClick={this.saveTicket}>Guardar</Button>
                            </Col>
                        </FormGroup>
                    </ModalBody>
                </Modal>
            </div>
        );
    }
}