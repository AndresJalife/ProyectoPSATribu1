import React, { Component } from 'react'
import ProyectoView from './ProyectoView';
import ProyectoData from './ProyectoData';
import ProyectoLogic from './ProyectoLogic';

export default class Proyecto extends Component {

    constructor(){
        super();
        this.View = new ProyectoView(this);
        this.Data = new ProyectoData(this);
        this.Logic = new ProyectoLogic(this);
    }

    render() {
        return (
            <div>
                {this.View.getHeader()}
                {this.View.getBody()}
            </div>
        )
    }

    get View(){
        return this.View;
    }

    get Logic(){
        return this.Logic;
    }

    get Data(){
        return this.Data;
    }
}

