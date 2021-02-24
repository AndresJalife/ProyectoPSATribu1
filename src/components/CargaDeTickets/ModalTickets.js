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
            isShow: false,
            type: "consulta",
            priority: "1",
        };

        this.saveTicket = this.saveTicket.bind(this);
        this.changeVisibility = this.changeVisibility.bind(this);

        this.saveTicketWithEnter = this.saveTicketWithEnter.bind(this);

        this.handleTypeChange = this.handleTypeChange.bind(this);
        this.handlePriorityChange = this.handlePriorityChange.bind(this);
        this.handleTaskChange = this.handleTaskChange.bind(this);
        this.handleDescriptionChange = this.handleDescriptionChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this);

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
        var url = 'https://aninfo-soporte.herokuapp.com/create_ticket';
        var data = {
            "type" : this.state.type,
            "description": this.state.description,
            "task": this.state.task,
            "priority": this.state.priority,
            "resource_id": this.state.resource_id,
            "name": this.state.name
        };
        console.log(data)
        fetch(url, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
            mode:'cors'
        })

    }

    handleTypeChange(event) {
        this.setState({type: event.target.value});
        console.log(event.target.value)
    }
    handleTaskChange(event) {
        this.setState({task: event.target.value});
        console.log(event.target.value)
    }
    handlePriorityChange(event) {
        this.setState({priority: event.target.value});
        console.log(event.target.value)
    }
    handleDescriptionChange(event) {
        this.setState({description: event.target.value});
        console.log(event.target.value)
    }
    handleNameChange(event) {
        this.setState({name: event.target.value});
        console.log(event.target.value)
    }
    handleResourceChange(event) {
        this.setState({resource: event.target.value});
        console.log(event.target.value)
    }

    handleSubmit(event) {
        //alert('A name was submitted: ' + this.state.value);
        //event.preventDefault();
      }
    render(){

        return (
            <div>
                <Button color="primary" onClick={this.changeVisibility}>Crear Ticket</Button>

                <Modal isOpen={this.state.isShow}
                       toggle={this.changeVisibility}
                       onKeyPress={this.saveTicketWithEnter}>

                    <ModalHeader toggle={this.changeVisibility}>Crear Ticket</ModalHeader>

                    <ModalBody>
                        <FormGroup>
                            <Label>Nombre</Label>
                            <Input type="text" value={this.state.value} onChange={this.handleDescriptionChange}></Input>
                        </FormGroup>
                        <FormGroup>
                            <Label>Tarea</Label>
                            <Input type="select" value={this.state.value} onChange={this.handleTaskChange}>
                                <option value="grapefruit">Grapefruit</option>
                                <option value="grapefruittt">Grapefruittttttt</option>
                            </Input>
                        </FormGroup>
                        <FormGroup>
                            <Label>Recurso</Label>
                            <Input type="select" value={this.state.value} onChange={this.handleTaskChange}>
                                <option value="1">Martin</option>
                                <option value="2">Nicolas</option>
                            </Input>
                        </FormGroup>
                        <FormGroup>
                            <Label>Tipo</Label>
                            <Input type="select" value={this.state.type} onChange={this.handleTypeChange}>
                                <option value="consulta">Consulta</option>
                                <option value="error">Error</option>
                            </Input>
                        </FormGroup>
                        <FormGroup>
                            <Label>Descripcion</Label>
                            <Input type="text" value={this.state.value} onChange={this.handleDescriptionChange}></Input>

                        </FormGroup>
                        <FormGroup>
                            <Label>Prioridad</Label>
                            <Input type="select" value={this.state.priority} onChange={this.handlePriorityChange}>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                            </Input>
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