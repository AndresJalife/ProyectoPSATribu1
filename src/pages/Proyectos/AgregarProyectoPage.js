import React, { Component } from 'react'
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import './AgregarProyectoPage.css';

export default class AgregarProyectoPage extends Component {
    render() {
        return (
            <div  className='formContainer'>
                <Form>
                    <FormGroup>
                        <Label for="exampleEmail">Nombre Proyecto</Label>
                        <Input type="date" name="email" id="exampleEmail" className='asd' placeholder="" />
                    </FormGroup>
                    <FormGroup>
                        <Label for="exampleEmail">Fecha Inicio</Label>
                        <Input type="date" name="email" id="exampleEmail" className='asd' placeholder="" />
                    </FormGroup>
                    <FormGroup>
                        <Label for="exampleEmail">Fecha Fin</Label>
                        <Input type="date" name="email" id="exampleEmail" className='asd' placeholder="" />
                    </FormGroup>
                    <FormGroup>
                        <Label for="exampleEmail">Horas</Label>
                        <Input type="date" name="email" id="exampleEmail" className='asd' placeholder="" />
                    </FormGroup>
                    <FormGroup>
                        <Label for="exampleEmail">Presupuesto</Label>
                        <Input type="date" name="email" id="exampleEmail" className='asd' placeholder="" />
                    </FormGroup>
                    <FormGroup>
                        <Label for="exampleEmail">Estado</Label>
                        <Input type="date" name="email" id="exampleEmail" className='asd' placeholder="" />
                    </FormGroup>
                    <FormGroup>
                        <Label for="exampleEmail">Descripción</Label>
                        <Input type="date" name="email" id="exampleEmail" className='asd' placeholder="" />
                    </FormGroup>
                    <Button>Submit</Button>
                </Form>
            </div>
        )
    }
}

