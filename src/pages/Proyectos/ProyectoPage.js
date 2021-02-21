import React, { Component } from 'react'
import {Button} from "reactstrap";

export default class ProyectoPage extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            project: {}
        }
    }

    componentDidMount()
    {
        const id = this.props.match.params.id;
        fetch(`https://proyectopsa.herokuapp.com/proyectos/${id}`)
            .then(r => r.json())
            .then(r => {
                this.setState({
                    project: r.proyecto
                })
            });
    }


    render()
    {
        return (
            <div>
                <h1>Proyecto "{this.state.project.nombre}"</h1>
                <Button color="primary">primary</Button>
            </div>
        );
    }
}
