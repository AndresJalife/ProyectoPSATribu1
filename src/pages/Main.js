import React from 'react';
import { Route } from 'react-router';
import {Link} from "react-router-dom";
import "./Main.css";
import { Card, CardTitle, CardText, Col } from 'reactstrap';

const styles = {
    backgroundColor: '#343a40',
    borderColor: 'rgb(112 170 255)'
}

export default () => (


    <header>
        <nav>
            <br/>
            <Col xl={{size: 6, offset: 3}}>
                <div style={{display: "flex"}}>
                    <Col xl={6} lg={6} className="col-link-inicial">
                        <Link to='/'>
                            <Card body inverse style={styles}>
                                <CardTitle tag="h5">Inicio</CardTitle>
                            </Card>
                        </Link>
                    </Col>

                    <Col xl={6} lg={6} className="col-link-inicial">
                        <Link to='/proyectos'>
                            <Card body inverse style={styles}>
                                <CardTitle tag="h5">Proyectos</CardTitle>
                            </Card>
                        </Link>
                    </Col>
                </div>
            </Col>

            <br />

            <Col xl={{size: 6, offset: 3}}>
                <div style={{display: "flex"}}>
                    <Col xl={6} lg={6} className="col-link-inicial">
                        <Link to='/recursos'>
                            <Card body inverse style={styles}>
                                <CardTitle tag="h5">Recursos</CardTitle>
                            </Card>
                        </Link>
                    </Col>

                    <Col xl={6} lg={6} className="col-link-inicial">
                        <Link to='/soporte'>
                            <Card body inverse style={styles}>
                                <CardTitle tag="h5">Soporte</CardTitle>
                            </Card>
                        </Link>
                    </Col>
                </div>
            </Col>
        </nav>
    </header>
);
