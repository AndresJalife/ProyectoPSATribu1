import logo from '../logo.svg';
import './App.css';
import React from "react";
import CargaDeHorasPage from '../pages/CargaDeHoras/CargaDeHorasPage';
import MainProyectos from '../pages/Proyectos/MainProyectos';
import Recursos from './../pages/Recursos';
import Soporte from './../pages/Soporte';
import Main from './../pages/Main';
import {Route, Switch} from "react-router";

function App(props) {
  return (
    <div className="App">
        <header>
            This is my website!
        </header>

        <main>
            <Switch>
                <Route path="/proyecto" component={MainProyectos} />
                <Route exact path="/" component={Main} />
                <Route path="/recursos" component={Recursos} />
                <Route path="/cargadehoras" component={CargaDeHorasPage} />
                <Route path="/soporte" component={Soporte} />
            </Switch>
        </main>

        <footer>
            Your copyright message
        </footer>
    </div>
  );
}

export default App;
