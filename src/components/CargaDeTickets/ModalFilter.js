import React, { Component } from 'react';
import { Button,  Modal, ModalHeader, ModalBody, FormGroup, Label, Input, Row, Col } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.css';

import TimePicker from 'react-times';

import 'react-times/css/classic/default.css';
import './ModalTickets.css'
import swal from "sweetalert2";

export default class ModalFilter extends Component {

    constructor(props){
        super(props);
        this.state = {
            isShow: false,
            tasks: [{}],
            ticket_tasks: [{}],
            available_status: [],
            available_priorities: []
        };

        this.changeVisibility = this.changeVisibility.bind(this);

        this.handleTaskCheckboxChange = this.handleTaskCheckboxChange.bind(this)
        this.isTaskChecked = this.isTaskChecked.bind(this)

    }
        componentDidMount() {
        var url = 'https://aninfo-soporte.herokuapp.com/tickets_main_data';
        var data = {};

        fetch(url, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
            mode:'cors'
        }).then(response => response.json().then(data => {this.setState({
            tickets: data
        });console.log(data);
        for (var i = 0; i < data.length; i++) {
                    this.state.available_status.push(data[i].status);
                    this.state.available_priorities.push(data[i].priority);
                }
        this.state.available_priorities = [...new Set(this.state.available_priorities)];
        this.state.available_status = [...new Set(this.state.available_status)];

        }));


    }


    changeVisibility() {
        this.setState({
            isShow: !this.state.isShow
        });

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


    handleSubmit(event) {
        //alert('A name was submitted: ' + this.state.value);
        //event.preventDefault();
    }

    render(){

        return (
            <div>
                <Button color="primary" onClick={this.changeVisibility}>Filtrar</Button>

                <Modal isOpen={this.state.isShow}
                       toggle={this.changeVisibility}
                       >

                    <ModalHeader toggle={this.changeVisibility}>Filtrar</ModalHeader>

                    <ModalBody>
                        Estado:
                        <FormGroup>
                            {this.state.available_status.map((p) =>
                           <li><input key={p} onClick={this.handleTaskCheckboxChange} type="checkbox" defaultChecked={false}   value={p}/> {p}</li>)}
                        </FormGroup>
                    </ModalBody>
                    <ModalBody>
                        Prioridad:
                        <FormGroup>
                            {this.state.available_priorities.map((p) =>
                           <li><input key={p} onClick={this.handleTaskCheckboxChange} type="checkbox" defaultChecked={false}   value={p}/> {p}</li>)}
                        </FormGroup>
                    </ModalBody>
                    <FormGroup check row>
                            <Col sm={{ size: 10, offset: 9 }}>
                                <Button color="primary" >Filtrar</Button>
                            </Col>
                    </FormGroup>
                </Modal>
            </div>
        );
    }
}