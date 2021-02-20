import React from 'react';
import { Route } from 'react-router';

/**
 * Import all page components here
 */
import App from './components/App';
import CargaDeHoras from './pages/CargaDeHoras';
import Proyecto from './pages/Proyecto';
import Recursos from './pages/Recursos';
import Soporte from './pages/Soporte';

/**
 * All routes go here.
 * Don't forget to import the components above after adding new route.
 */
export default (
    <Route path="/" component={App}>
        <Route path="/proyecto" component={Proyecto} />
        <Route path="/recursos" component={Recursos} />
        <Route path="/cargadehoras" component={CargaDeHoras} />
        <Route path="/soporte" component={Soporte} />
    </Route>
);