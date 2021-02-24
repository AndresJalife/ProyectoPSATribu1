import React, { Component } from 'react'
import {ButtonToolbar, Col, Row} from "reactstrap";
import ModalTickets from "./ModalTickets";
import {Link} from "react-router-dom";

export default function TicketCard (props)
{
    return (
        <div>
            <Row>
                <Col>
                    <Link to={`/soporte/ticket_detail/${props.item.id}`}>Ticket {props.item.name}</Link>
                </Col>
                <Col>
                    <Row>
                        Proyecto: {props.item['project name']}
                    </Row>
                    <Row>
                        Estado: {props.item.status}
                    </Row>
                    <Row>
                        Prioridad: {props.item.priority}
                    </Row>
                    <Row>
                        Fecha Limite: {props.item['limit date']}
                    </Row>
                </Col>
            </Row>
        </div>)
}
