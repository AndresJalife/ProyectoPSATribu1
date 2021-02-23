import React from 'react';
import { Route } from 'react-router';
import {Link} from "react-router-dom";

export default () => (
    <header>
        <nav>
            <Link to='/ProyectoPSATribu1/'>Inicio</Link>
            <br />
            <Link to='/ProyectoPSATribu1/proyectos'>Proyectos</Link>
            <br />
            <Link to='/ProyectoPSATribu1/recursos'>Recursos</Link>
            <br />
            <Link to='/ProyectoPSATribu1/soporte'>Soporte</Link>
            <br />
        </nav>
    </header>
);