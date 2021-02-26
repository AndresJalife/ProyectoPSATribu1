import {ButtonToolbar, Col, Row} from "reactstrap";
import {Link} from "react-router-dom";
import React, {Component} from "react";
import ModalEdit from '../../components/CargaDeTickets/ModalEdit';


export default class TicketDetail extends Component {

    constructor(props) {
        super(props);
        this.state = {
        }

    }
    componentDidMount() {
        var splitted_url = window.location.href.split('/');
        var ticket_id = splitted_url[splitted_url.length - 1];
        var ticket_data_url = 'https://aninfo-soporte.herokuapp.com/ticket_data'
        var data = {ticket_id: ticket_id}
        fetch(ticket_data_url, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
            mode:'cors'
        }).then(response => response.json().then(ticket => {
            this.setState({
            id: ticket["id"],
            name: ticket["name"],
            description: ticket["description"],
            status: ticket["status"],
            priority: ticket["priority"],
            type: ticket["type"],
            //TODO: multiple tasks
            //task_name: ticket["task name"],
            //task_id: ticket["task id"],
            creation_date: ticket["creation date"],
            limit_date:  ticket["limit date"],
            resource_id: ticket["resource id"],
            resource_name: ticket["resource name"]
        });
            this.modal_edit.setState({
                id: ticket["id"],
                name: ticket["name"],
                description: ticket["description"],
                status: ticket["status"],
                priority: ticket["priority"],
                type: ticket["type"],
                //TODO: multiple tasks
                //task_name: ticket["task name"],
                //task_id: ticket["task id"],
                creation_date: ticket["creation date"],
                limit_date:  ticket["limit date"],
                resource_id: ticket["resource id"],
                resource_name: ticket["resource name"]});
    }));
    }


    render() {
        return (
            <div>
                Detalle de ticket
                <Row>
                    <Col>
                        <ButtonToolbar>
                            <ModalEdit data={this.state} ref={ref => (this.modal_edit = ref)}></ModalEdit>
                        </ButtonToolbar>
                    </Col>
                </Row>
                <Row>
                    <Col>
                       {this.state.name}
                    </Col>
                    <Col>
                        <Row>
                            Estado: {this.state.status}
                        </Row>
                        <Row>
                            Prioridad: {this.state.priority}
                        </Row>
                        <Row>
                            Descripcion: {this.state.description}
                        </Row>
                        <Row>
                            Tipo: {this.state.type}
                        </Row>
                        <Row>
                            Fecha Creacion: {this.state.creation_date}
                        </Row>
                        <Row>
                            Fecha Limite: {this.state.limit_date}
                        </Row>
                    </Col>
                </Row>
            </div>)
    }
}