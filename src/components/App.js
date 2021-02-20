import logo from '../logo.svg';
import './App.css';
import React from "react";
import CargaDeHoras from './../pages/CargaDeHoras';
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
                <Route path="/proyectos" component={MainProyectos} />
                <Route exact path="/" component={Main} />
                <Route path="/recursos" component={Recursos} />
                <Route path="/cargadehoras" component={CargaDeHoras} />
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
