import React, { Component } from 'react';
import { Button,  Modal, ModalHeader, ModalBody, FormGroup, Label, Input, Row, Col } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.css';

import TimePicker from 'react-times';

import 'react-times/css/classic/default.css';
import './ModalTickets.css'
import swal from "sweetalert2";

export default class ModalTickets extends Component {

    constructor(props){
        super(props);
        this.state = {
            isShow: false,
            ticket_original_data: props.data,
            resources: [{}]
        };

        this.saveTicket = this.saveTicket.bind(this);
        this.changeVisibility = this.changeVisibility.bind(this);

        this.saveTicketWithEnter = this.saveTicketWithEnter.bind(this);

        this.handleTypeChange = this.handleTypeChange.bind(this);
        this.handlePriorityChange = this.handlePriorityChange.bind(this);

        //this.handleTaskChange = this.handleTaskChange.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleDescriptionChange = this.handleDescriptionChange.bind(this)
        this.handleStatusChange = this.handleStatusChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleResourceChange = this.handleResourceChange.bind(this);

    }
    componentDidMount() {
        var url = 'https://squad6-backend.herokuapp.com/resources';

        fetch(url, {
            method: 'GET'
        }).then(response => response.json().then(data => this.setState({
            resources: data
        })));
        var url_tasks = 'https://aninfo-soporte.herokuapp.com/tasks';
        fetch(url_tasks, {
            method: 'GET'
        }).then(response => response.json().then(data => {
            this.setState({tasks: data});
            if (data.length > 0){
                this.state.task_id = data[0].codigo
            }
        }
        ))
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
        var url = 'https://aninfo-soporte.herokuapp.com/edit_ticket';
        var data = {
            "ticket_id": this.state.id,
            "name": this.state.name,
            "description": this.state.description,
            "priority": this.state.priority,
            "status": this.state.status,
            "resource_id": this.state.resource_id
        };
        if (data["description"] == "" || data["name"] == "") {
            swal.fire({
                            title: "Debe ingresar nombre y descripcion",
                            icon: "warning"
                        })
        } else {
        fetch(url, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
            mode:'cors'
        });
        swal.fire({
                            title: "Se modificó el ticket correctamente",
                            icon: "success"
                        })};


    }

    handleTypeChange(event) {
        this.setState({type: event.target.value});
        console.log(event.target.value)
    }
    handleNameChange(event) {
        this.setState({name: event.target.value});
        console.log(event.target.value)
    }
    //handleTaskChange(event) {
    //    this.setState({task: event.target.value});
    //    console.log(event.target.value)
    //}
    handlePriorityChange(event) {
        this.setState({priority: event.target.value});
        console.log(event.target.value)
    }
    handleDescriptionChange(event) {
        this.setState({description: event.target.value});
        console.log(event.target.value)
    }
    handleStatusChange(event) {
        this.setState({status: event.target.value});
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

    render(){

        return (
            <div>
                <Button color="primary" onClick={this.changeVisibility}>Editar Ticket</Button>

                <Modal isOpen={this.state.isShow}
                       toggle={this.changeVisibility}
                       onKeyPress={this.saveTicketWithEnter}>

                    <ModalHeader toggle={this.changeVisibility}>Editar Ticket</ModalHeader>

                    <ModalBody>
                        <FormGroup>
                            <Label>Nombre</Label>
                            <Input type="text" value={this.state.name} onChange={this.handleNameChange}></Input>
                        </FormGroup>
                        <FormGroup>
                            <Label>Descripcion</Label>
                            <Input type="text" value={this.state.description} onChange={this.handleDescriptionChange}></Input>
                        </FormGroup>
                        <FormGroup>
                            <Label>Prioridad </Label>
                            <Input type="select" value={this.state.priority} onChange={this.handlePriorityChange}>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                            </Input>
                        </FormGroup>
                        <FormGroup>
                            <Label>Estado </Label>
                            <Input type="select" value={this.state.status} onChange={this.handleStatusChange}>
                                <option value="en progreso soporte">en progreso soporte</option>
                                <option value="escalado en ingeneria">escalado en ingeneria</option>
                                <option value="esperando respuesta del cliente">esperando respuesta del cliente</option>
                                <option value="resuelto">resuelto</option>
                            </Input>
                        </FormGroup>
                        <FormGroup>
                            <Label>Recurso</Label>
                                <Input type="select" value={this.state.resource_id} onChange={this.handleResourceChange} >
                                    {this.state.resources.map((p) => <option key={p.legajo} value={p.legajo}>{p.Nombre} {p.Apellido}</option>)}                                </Input>
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