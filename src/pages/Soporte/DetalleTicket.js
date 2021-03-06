import {
    Breadcrumb,
    BreadcrumbItem,
    ButtonToolbar,
    Card,
    CardBody,
    CardHeader,
    Col,
    Container,
    Row,
    Table
} from "reactstrap";
import {Link} from "react-router-dom";
import React, {Component} from "react";
import ModalEdit from '../../components/CargaDeTickets/ModalEdit';
import ModalTasks from '../../components/CargaDeTickets/ModalTasks';
import Loader from "react-loader-spinner";


export default class TicketDetail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            editable: false,
            ticket_tasks: []
        }
        this.assignedTasks = this.assignedTasks.bind(this);

    }
    componentDidMount() {
        var splitted_url = window.location.href.split('/');
        var ticket_id = splitted_url[splitted_url.length - 1];

        var tasks_url = 'https://aninfo-soporte.herokuapp.com/tasks_by_id'
        var data = {ticket_id: ticket_id}
        fetch(tasks_url, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
            mode:'cors'
        }).then(response => response.json().then(tasks => {
            this.setState({tasks: tasks});
            //console.log(tasks);
            //this.modal_tasks.setState({tasks: tasks})

        }))


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
            creation_date: ticket["creation date"],
            limit_date:  ticket["limit date"],
            resource_id: ticket["resource id"],
            resource_name: ticket["resource name"]
        });
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
                    this.setState({...this.state, ticket_tasks: tasks});
                    console.log(this.state);
                }));

        if (ticket["status"] !== "resuelto") {
                this.setState({...this.state, editable: true});
                console.log(this.state.editable);
                this.modal_edit.setState({
                    id: ticket["id"],
                    name: ticket["name"],
                    description: ticket["description"],
                    status: ticket["status"],
                    priority: ticket["priority"],
                    type: ticket["type"],
                    creation_date: ticket["creation date"],
                    limit_date: ticket["limit date"],
                    resource_id: ticket["resource id"],
                    resource_name: ticket["resource name"]
                });
                this.modal_tasks.setState({
                    id: ticket["id"],
                    name: ticket["name"],
                    description: ticket["description"],
                    status: ticket["status"],
                    priority: ticket["priority"],
                    type: ticket["type"],
                    creation_date: ticket["creation date"],
                    limit_date: ticket["limit date"],
                    resource_id: ticket["resource id"],
                    resource_name: ticket["resource name"]
                })
            }
            else {
                this.setState({...this.state, editable: false});
                console.log(this.state.editable);
            }

        }));
    }

    assignedTasks(){
        if (this.state.ticket_tasks.length == 0) {
            return "Ninguna"
        }
        else {
            return ""
        }
    }

    render() {
        return (
            <div style={{padding: 10 + 'px'}}>

                <Row>
                    <Col xl={12} lg={12}>
                        <Breadcrumb>
                            <BreadcrumbItem><Link to="/">Home</Link></BreadcrumbItem>
                            <BreadcrumbItem><Link to="/soporte">Soporte</Link></BreadcrumbItem>
                            <BreadcrumbItem>Detalle Ticket</BreadcrumbItem>
                        </Breadcrumb>
                    </Col>
                </Row>

                <Row>
                    <Col xl={{size: 8, offset: 2}}>
                        <Card>
                            <CardHeader tag="h2">Detalle de ticket</CardHeader>

                            <CardBody>
                                <Container>

                                    {this.state.isLoading ?
                                        <Row>
                                            <Col className="text-center">
                                                <Loader
                                                    type="TailSpin"
                                                    color="#00BFFF"
                                                    height={50}
                                                    width={50}></Loader>
                                            </Col>
                                        </Row>
                                        :
                                        <Row>
                                            <Col>
                                                <Table striped>
                                                    <thead>
                                                    <tr>
                                                        <th>Estado</th>
                                                        <th>Prioridad</th>
                                                        <th>Descripcion</th>
                                                        <th>Tipo</th>
                                                        <th>Recurso trabajando</th>
                                                        <th>Fecha Creacion</th>
                                                        <th>Fecha Limite</th>
                                                    </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr >
                                                            <td>{this.state.status}</td>
                                                            <td>{this.state.priority}</td>
                                                            <td>{this.state.description}</td>
                                                            <td>{this.state.type}</td>
                                                            <td>{this.state.resource_name}</td>
                                                            <td>{this.state.creation_date}</td>
                                                            <td>{this.state.limit_date}</td>

                                                        </tr>

                                                    </tbody>
                                                </Table>
                                            </Col>
                                        </Row>
                                    }
                    <Col>
                        Tareas asignadas: {this.assignedTasks()}
                    {this.state.ticket_tasks.map((p) =>
                           <Row><li key={p.codigo}>{p.name}</li></Row>)}

                        </Col>
                    <Row>
                        { this.state.editable &&
                        <Row>
                            <Col  xs="6" >
                                <ButtonToolbar>
                                    <ModalEdit data={this.state} ref={ref => (this.modal_edit = ref)}></ModalEdit>
                                </ButtonToolbar>
                            </Col>
                            <Col xs="auto" >
                                <ButtonToolbar>
                                    <ModalTasks data={this.state} ref={ref => (this.modal_tasks = ref)}></ModalTasks>
                                </ButtonToolbar>
                            </Col>
                        </Row>
                        }
                    </Row>
                                </Container>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>

            </div>)
    }
}