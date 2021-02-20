import React, { Component } from 'react';
import { Button, ButtonToolbar, Row, Col } from 'reactstrap';
import ModalHours from '../../components/CargaDeHoras/ModalHours';

export default class CargaDeHorasPage extends Component {
    render() {
        return (
            <div>
                <Row>
                    <Col>
                        <ButtonToolbar>
                            <ModalHours></ModalHours>
                        </ButtonToolbar>
                    </Col>
                </Row>
            </div>
        )
    }
}