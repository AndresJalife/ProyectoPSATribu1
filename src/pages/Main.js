import React from 'react';
import { Route } from 'react-router';
import {Link} from "react-router-dom";

export default () => (
    <header>
        <nav>
            <ul>
                <li><Link to='/'>Inicio</Link></li>
                <li><Link to='/proyectos'>Proyectos</Link></li>
                <li><Link to='/cargadehoras'>Carga de horas</Link></li>
                <li><Link to='/recursos'>Recursos</Link></li>
                <li><Link to='/soporte'>Soporte</Link></li>
            </ul>
        </nav>
    </header>
);