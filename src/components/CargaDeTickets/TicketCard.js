import React, { Component } from 'react'
import {ButtonToolbar, Col, Row} from "reactstrap";
import ModalTickets from "./ModalTickets";

export default function TicketCard (props)
{
    return (
        <div>
            <Row>
                <Col>
                    Ticket {props.item.id}
                </Col>
                <Col>
                    <Row>
                        Proyecto: {props.item.project_id}
                    </Row>
                    <Row>
                        Estado: {props.item.status}
                    </Row>
                    <Row>
                        Prioridad: {props.item.priority}
                    </Row>
                </Col>
            </Row>
        </div>)
}
