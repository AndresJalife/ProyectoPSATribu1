import React, { Component } from 'react'
import { Button, ButtonToolbar, Row, Col } from 'reactstrap';
import {NavLink} from "react-router-dom";
import TicketCard from "../components/CargaDeTickets/TicketCard";
import ModalTickets from '../components/CargaDeTickets/ModalTickets';
import ModalEdit from '../components/CargaDeTickets/ModalEdit';


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
        var url_2 = 'https://aninfo-soporte.herokuapp.com/1/tickets';
        var data = {};

        fetch(url, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
            mode:'cors'
        }).then(response => response.json().then(data => this.setState({
            tickets: data
        })));
    }



    render()
    {
        return  (<div className='paginaTickets'>
                    <div id='ticketsHeader'>
                        <p id='tituloTickets'>Tickets</p>
                    </div>
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
                                    <ModalEdit  ></ModalEdit>
                                </ButtonToolbar>
                            </Col>
                        </Row>
                    </div>
                    <div id='ticketsList'>
                        <p id='tituloTickets'>TicketsDisponibles</p>
                    </div>
                    <div id='ticketsContainer'>
                                {this.state.tickets.map((item) => <TicketCard  key={item.name} item={item} />)}
                    </div>
                </div>);

    }


}