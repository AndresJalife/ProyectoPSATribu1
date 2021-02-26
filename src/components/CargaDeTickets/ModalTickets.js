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
            resources: [{}],
            description: "",
            type: "consulta",
            priority: 1,
            resource_id: null,
            name: ""
        };

        this.saveTicket = this.saveTicket.bind(this);
        this.changeVisibility = this.changeVisibility.bind(this);

        this.saveTicketWithEnter = this.saveTicketWithEnter.bind(this);

        this.handleTypeChange = this.handleTypeChange.bind(this);
        this.handlePriorityChange = this.handlePriorityChange.bind(this);
        this.handleDescriptionChange = this.handleDescriptionChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleResourceChange = this.handleResourceChange.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this)
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
            "priority": this.state.priority,
            "resource_id": this.state.resource_id,
            "name": this.state.name,
            "id": Math.floor(Math.random() * (10000 - 0 + 1)) + 0
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
        this.setState({resource_id: event.target.value});
        console.log(event.target.value)
    }

    handleSubmit(event) {
        //alert('A name was submitted: ' + this.state.value);
        //event.preventDefault();
      }


    componentDidMount() {
        var url_resources = 'https://squad6-backend.herokuapp.com/resources';
        fetch(url_resources, {
            method: 'GET'
        }).then(response => response.json().then(data => {
            this.setState({resources: data});
            if (data.length > 0){
                this.state.resource_id = data[0].legajo
            }
        }));
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
                            <Input type="text" value={this.state.name} onChange={this.handleNameChange}></Input>
                        </FormGroup>
                        <FormGroup>
                            <Label>Recurso</Label>
                                <Input type="select" onChange={this.handleResourceChange} >
                                    {this.state.resources.map((p) => <option key={p.legajo} value={p.legajo}>{p.Nombre} {p.Apellido}</option>)} </Input>
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
                            <Input type="text" value={this.state.description} onChange={this.handleDescriptionChange}></Input>

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