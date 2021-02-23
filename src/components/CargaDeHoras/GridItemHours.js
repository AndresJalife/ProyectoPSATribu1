import React, { Component } from 'react';
import {Button, Table, Row, Col, Card, CardBody, Container} from 'reactstrap';
import HoursModel from "../../models/CargaDeHoras/HoursModel";
import PropTypes from "prop-types";
import { FaTrashAlt, FaPencilAlt } from "react-icons/fa";
import {Link} from "react-router-dom";

export default class GridItemHours extends Component {
    static propTypes = {
        hours: PropTypes.object.isRequired
    };

    constructor(props){
        super(props);

        this.state = {
            nameProject: "",
            nameTask: ""
        };
    }

    componentDidMount() {

        var url = 'https://proyectopsa.herokuapp.com/proyectos/' +
                   this.props.hours.idProject.toString() + '/tarea/' +
                   this.props.hours.idTask.toString();


        fetch(url)
            .then(r => r.json())
            .then((taskByProject) =>
            {
                /*
                var hoursModel = new HoursModel(
                    this.props.hours.id,
                    this.props.hours.file,
                    this.props.hours.idProject,
                    this.props.hours.idTask,
                    this.props.hours.quantityHours,
                    this.props.hours.quantityMinutes,
                    this.props.hours.date,
                    this.props.hours.loadingDate,
                    taskByProject.nombre,
                    taskByProject.nombre
                );*/

                this.setState({
                        nameProject: taskByProject.nombre,
                        nameTask: taskByProject.nombre
                 });
            }, (error) => {console.log(error);});
    }

    render(){
        return (
            <tr>
                <td>{this.state.nameProject}</td>
                <td>{this.state.nameTask}</td>
                <td>{this.props.hours.getDateAsString()}</td>
                <td>{this.props.hours.quantityHours}</td>
                <td>{this.props.hours.quantityMinutes}</td>
                <td>
                    <button type="button" className="btn btn-sm btn-rounded " style={{marginTop: "-7px", color: "blue"}}>
                        <FaPencilAlt/>
                    </button>
                </td>
                <td>
                    <button type="button" className="btn btn-sm btn-rounded " style={{marginTop: "-7px", color: "red"}}>
                        <FaTrashAlt/>
                    </button>
                </td>
            </tr>
        )
    }
}