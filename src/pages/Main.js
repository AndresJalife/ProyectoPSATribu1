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
            <div id="container">
                <br/>
                <div className="button" >
                    <Link to='/proyectos'>
                        <Card body inverse style={styles}>
                            <CardTitle tag="h5">Proyectos</CardTitle>
                        </Card>
                    </Link>
                </div>
                <br />
                <div className="button">
                    <Link to='/recursos'>
                        <Card body inverse style={styles}>
                            <CardTitle tag="h5">Recursos</CardTitle>
                        </Card>
                    </Link>
                </div>
                <br />
                <div className="button">              
                    <Link to='/soporte'>
                        <Card body inverse style={styles}>
                            <CardTitle tag="h5">Soporte</CardTitle>
                        </Card>
                    </Link>
                </div>
            </div>
        </nav>
    </header>
);
