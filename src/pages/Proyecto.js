import React, { Component } from 'react'

export default class Proyecto extends Component {
    render() {
        return (
            <div class='proyectosContainer'>
                <p>Proyectos</p>
                <button class='botonAgregarProyecto' onClick={this.agregarProyecto()}>Agregar Proyecto</button>
                +
                <div class='listaProyecto'>

                </div>
            </div>
        )
    }
}
