import React, { Component } from 'react';
import {
    Card, CardImg, CardText, CardBody, CardTitle,
    CardSubtitle, Button, ButtonToolbar, Row, Col, Container, Badge
} from 'reactstrap';
import ModalHours from '../../components/CargaDeHoras/ModalHours';
import {Link} from "react-router-dom";

export default class CargaDeHorasPage extends Component {
    render() {
        return (
            <div style={{padding: 10 + 'px'}}>
                <Row>

                    <Col xl={4} lg={4}>
                        <Card>
                            <CardBody>
                                <Container>
                                    <Row>

                                    </Row>
                                </Container>
                            </CardBody>
                        </Card>
                    </Col>

                    <Col xl={8} lg={8}>
                        <ButtonToolbar>
                            <ModalHours></ModalHours>
                        </ButtonToolbar>
                    </Col>
                </Row>
            </div>
        )
    }
}