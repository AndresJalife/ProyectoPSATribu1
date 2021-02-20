import React, { Component } from 'react'
import {useParams} from "react-router";

async function getProjectData(id)
{
    const endpoint = `https://proyectopsa.herokuapp.com/proyectos/${id}`;
    return (await fetch(endpoint)).json();
}

export default async function ProyectoPage()
{
    let { id } = useParams();
    const project = await getProjectData(id);
    return (
        <div>
            {project.nombre}
        </div>
    );
}
