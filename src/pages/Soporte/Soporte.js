import React, { Component } from 'react'
import {Button, ButtonToolbar, Row, Col, Card, CardHeader, CardBody, Container, Table} from 'reactstrap';
import {Link, NavLink} from "react-router-dom";
import TicketCard from "../../components/CargaDeTickets/TicketCard";
import ModalTickets from '../../components/CargaDeTickets/ModalTickets';
import ModalFilter from '../../components/CargaDeTickets/ModalFilter';
import Loader from "react-loader-spinner";


export default class Soporte extends Component {

     constructor(props)
    {
        super(props);
        this.state = {
            tickets: []
        }
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
        });console.log(data) }));

    }



    render()
    {
        return  (<div className='paginaTickets'>
                    <div>
                        <Row>
                            <Col>
                                <ButtonToolbar>
                                    <ModalTickets></ModalTickets>
                                </ButtonToolbar>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <ButtonToolbar>
                                    <ModalFilter></ModalFilter>
                                </ButtonToolbar>
                            </Col>
                        </Row>
                    </div>
                                <Row>
                    <Col xl={{size: 6, offset: 3}}>
                        <Card>
                            <CardHeader tag="h2">Tickets disponibles</CardHeader>

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
                                                        <th>Nombre</th>
                                                        <th>Estado</th>
                                                        <th>Prioridad</th>
                                                        <th>Fecha limite</th>
                                                    </tr>
                                                    </thead>
                                                    <tbody>

                                                    {this.state.tickets.map((r) =>
                                                        <tr key={r["name"]}>
                                                            <td>{r["name"]}</td>
                                                            <td>{r["status"]}</td>
                                                            <td>{r["priority"]}</td>
                                                            <td>{r["limit date"]}</td>
                                                            <td>
                                                                <Link to={`/soporte/ticket_detail/${r.id}`}>
                                                                    <button type="button" className="btn btn-primary btn-sm">
                                                                        Ver ticket
                                                                    </button>
                                                                </Link>


                                                            </td>
                                                        </tr>

                                                    )}
                                                    </tbody>
                                                </Table>
                                            </Col>
                                        </Row>
                                    }


                                </Container>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>

                </div>);

    }


}