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
            tasks: [{}],
            ticket_tasks: [{}]
        };

        this.saveTicket = this.saveTicket.bind(this);
        this.changeVisibility = this.changeVisibility.bind(this);

        this.saveTicketWithEnter = this.saveTicketWithEnter.bind(this);
        this.handleTaskCheckboxChange = this.handleTaskCheckboxChange.bind(this)
        this.isTaskChecked = this.isTaskChecked.bind(this)
        this.getTasksToSave = this.getTasksToSave.bind(this)

    }
    componentDidMount() {
        var url_tasks = 'https://aninfo-soporte.herokuapp.com/tasks';
        fetch(url_tasks, {
            method: 'GET'
        }).then(response => response.json().then(data => {
                this.setState({tasks: data});
                for (var i = 0; i < this.state.tasks.length; i++) {
                    this.state.tasks[i].checked = false;
                }
                var splitted_url = window.location.href.split('/');
                console.log(splitted_url);
                var ticket_id = splitted_url[splitted_url.length - 1];

                var url_ticket_tasks = 'https://aninfo-soporte.herokuapp.com/tasks_by_id'
                var request_data = {ticket_id: ticket_id}
                fetch(url_ticket_tasks, {
                    method: 'POST',
                    body: JSON.stringify(request_data),
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    mode: 'cors'
                }).then(response => response.json().then(tasks => {
                    this.setState({ticket_tasks: tasks});
                    console.log(this.state);
                    this.checkAssignedProjects();
                }))
            }
        ))


    }

    checkAssignedProjects() {
        for (var i = 0; i < this.state.tasks.length; i++) {
            for (var j = 0; j < this.state.ticket_tasks.length; j++) {

                if (this.state.tasks[i]["codigo"] == this.state.ticket_tasks[j]["task_id"]) {
                    this.state.tasks[i].checked = true;
                    break;
                }
                this.state.tasks[i].checked=false;
            }
        }
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

    handleTaskCheckboxChange(event) {
        console.log(event.target.value);
        for (var i = 0; i < this.state.tasks.length; i++) {
            if (this.state.tasks[i]["codigo"] == event.target.value) {
                var task = this.state.tasks[i];
                if (task["checked"]) {
                    this.state.tasks[i]["checked"] = false;
                }
                else {
                    this.state.tasks[i]["checked"] = true;
                }
            }
        }
        //this.state.tasks[event.target.value].checked = true;
    }

    isTaskChecked(id){
       return this.state.tasks[id].checked == true;
    }

    getTasksToSave() {
        var arr = []
        for (var i = 0; i < this.state.tasks.length; i++) {
            if (this.state.tasks[i].checked == true) {
                arr.push({
                    task_id: this.state.tasks[i]["codigo"],
                    task_name: this.state.tasks[i]["nombre"]
                });
            }
        }
        return arr;
    }
    saveTicket() {
        this.changeVisibility();
        var url = 'https://aninfo-soporte.herokuapp.com/edit_tasks_ticket';
        var data = {
            "ticket_id": this.state.id,
            "tasks": this.getTasksToSave()
        };
        console.log(data);
        fetch(url, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
            mode:'cors'
        })
        swal.fire({
                            title: "Tareas asignadas al ticket correctamente",
                            icon: "success"
                        })
    }


    handleSubmit(event) {
        //alert('A name was submitted: ' + this.state.value);
        //event.preventDefault();
    }

    render(){

        return (
            <div>
                <Button color="primary" onClick={this.changeVisibility}>Editar tareas asignadas</Button>

                <Modal isOpen={this.state.isShow}
                       toggle={this.changeVisibility}
                       onKeyPress={this.saveTicketWithEnter}>

                    <ModalHeader toggle={this.changeVisibility}>Editar tareas asignadas</ModalHeader>

                    <ModalBody>
                        <FormGroup>
                            {this.state.tasks.map((p) =>
                           <li><input key={p.codigo} onClick={this.handleTaskCheckboxChange} type="checkbox" defaultChecked={p.checked}  ref={ref => (this.modal_tasks = ref)} value={p.codigo}/> {p.nombre}</li>)}
                        </FormGroup>
                    </ModalBody>
                    <FormGroup check row>
                            <Col sm={{ size: 10, offset: 9 }}>
                                <Button color="primary" onClick={this.saveTicket}>Guardar</Button>
                            </Col>
                    </FormGroup>
                </Modal>
            </div>
        );
    }
}