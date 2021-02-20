import React from 'react';
import { Route } from 'react-router';
import {Link} from "react-router-dom";

export default () => (
    <header>
        <nav>
            <Link to='/'>Inicio</Link>
            <br />
            <Link to='/proyectos'>Proyectos</Link>
            <br />
            <Link to='/cargadehoras'>Carga de horas</Link>
            <br />
            <Link to='/recursos'>Recursos</Link>
            <br />
            <Link to='/soporte'>Soporte</Link>
            <br />
        </nav>
    </header>
);