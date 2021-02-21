import React, { Component } from 'react'
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import './AgregarProyectoPage.css';

export default class AgregarProyectoPage extends Component {

    crearProyecto(){
        // Document.
    }

    render() {
        return (
            <div className='formContainer'>
                <Form>
                    <FormGroup>
                        <Label for="nombreProyecto" id='nombre'>Nombre Proyecto *</Label>
                        <Input type="string" name="nombreProyecto" id="nombreProyecto" className='general' maxlength="256" required />
                    </FormGroup>
                    <FormGroup>
                        <Label for="fechaInicio">Fecha Inicio *</Label>
                        <Input type="date" name="fechaInicio" id="fechaInicio" className='general' required/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="fechaFin">Fecha Fin</Label>
                        <Input type="date" name="fechaFin" id="fechaFin" className='general' />
                    </FormGroup>
                    <FormGroup>
                        <Label for="estado">Estado</Label>
                        <Input type="date" name="estado" id="estado" className='general' />
                    </FormGroup>
                    <FormGroup>
                        <Label for="horas">Horas</Label>
                        <Input type="number" name="horas" id="horas" className='general' />
                    </FormGroup>
                    <FormGroup>
                        <Label for="presupuesto">Presupuesto</Label>
                        <Input type="number" name="presupuesto" id="presupuesto" className='general' />
                    </FormGroup>
                    <FormGroup>
                        <Label for="descripcion">Descripción *</Label>
                        <Input type="textarea" name="descripcion" id="descripcion" className='general' maxlength="256" required />
                    </FormGroup>
                    <Button onClick={this.crearProyecto()}>Crear Proyecto</Button>
                </Form>
                <label>(*) para aquellos campos que sean requeridos obligatoriamente</label>
            </div>
        )
    }
}

