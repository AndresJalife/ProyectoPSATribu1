import React, { Component } from 'react'

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
                Proyecto "{this.state.project.nombre}"
            </div>
        );
    }
}
