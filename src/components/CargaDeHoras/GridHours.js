import React, { Component } from 'react';
import {Button, Table, Row, Col, Card, CardBody, Container, CardHeader, ButtonToolbar} from 'reactstrap';
import HoursModel from "../../models/CargaDeHoras/HoursModel";
import GridItemHours from "./GridItemHours";
import ModalHours from "./ModalHours";
import Loader from "react-loader-spinner";
import PropTypes from "prop-types";

export default class GridHours extends Component {

    constructor(props){
        super(props);

        this.state = {
            isLoading: true,
            lstHours: []
        };

        this.onReloadGrid = this.onReloadGrid.bind(this);
    }

    componentDidMount() {

        fetch('https://squad6-backend.herokuapp.com/hoursFile/' + this.props.file.toString())
            .then(r => r.json())
            .then((hoursByFile) =>
            {
                let lstHoursModel = [];

                hoursByFile.forEach(x => {
                    let model = new HoursModel();

                    model.id = x.id;
                    model.file = x.file;
                    model.idProject = x.idProject;
                    model.idTask = x.idTask;
                    model.quantityHours = x.quantityHours;
                    model.quantityMinutes = x.quantityMinutes;
                    model.date = x.date;
                    model.loadingDate = x.loadingDate;

                    lstHoursModel.push(model);
                });

                lstHoursModel.sort((a, b) => a.date < b.date ? 1 : -1);
                this.setState({
                    isLoading: false,
                    lstHours: lstHoursModel
                });
            }, (error) => {console.log(error);});
    }

    onReloadGrid(){
        fetch('https://squad6-backend.herokuapp.com/hoursFile/' + this.props.file.toString())
            .then(r => r.json())
            .then((hoursByFile) =>
            {
                let lstHoursModel = [];

                hoursByFile.forEach(x => {
                    let model = new HoursModel();

                    model.id = x.id;
                    model.file = x.file;
                    model.idProject = x.idProject;
                    model.idTask = x.idTask;
                    model.quantityHours = x.quantityHours;
                    model.quantityMinutes = x.quantityMinutes;
                    model.date = x.date;
                    model.loadingDate = x.loadingDate;

                    lstHoursModel.push(model);
                });

                lstHoursModel.sort((a, b) => a.date < b.date ? 1 : -1);
                this.setState({
                    isLoading: false,
                    lstHours: lstHoursModel
                });
            }, (error) => {console.log(error);});
    }

    render(){
        return (
            <div>
                <Card>

                    <CardHeader tag="h2" style={{display: "flex"}}>
                        <Col xl={10} style={{paddingLeft: "12%"}}>
                            Horas Cargadas
                        </Col>

                        <Col xl={2}>
                            <ModalHours file={this.props.file} onReload={this.onReloadGrid}></ModalHours>
                        </Col>
                    </CardHeader>

                    <CardBody>
                        <Container>

                            {this.state.isLoading ?
                                <Col className="text-center">
                                    <Loader
                                        type="TailSpin"
                                        color="#00BFFF"
                                        height={50}
                                        width={50}></Loader>
                                </Col>
                            :
                                this.state.lstHours.length ?
                                    <Table striped hover size="sm">
                                        <thead>
                                        <tr>
                                            <th>Proyecto</th>
                                            <th>Tarea</th>
                                            <th>Fecha</th>
                                            <th>Horas</th>
                                            <th>Minutos</th>
                                            <th>Modificar</th>
                                            <th>Eliminar</th>
                                        </tr>
                                        </thead>

                                        <tbody>
                                        {this.state.lstHours.map((h) =>
                                            <GridItemHours key={h.id} hours={h} onReload={this.onReloadGrid}></GridItemHours>
                                        )}
                                        </tbody>
                                    </Table>
                                    :
                                    <h4>El recurso no posee horas cargadas.</h4>
                            }
                        </Container>
                    </CardBody>
                </Card>
            </div>
        )
    }
}