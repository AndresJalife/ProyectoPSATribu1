import React, { Component } from 'react'
import {useParams} from "react-router";
import Paper from "@material-ui/core/Paper";
import {makeStyles} from "@material-ui/core";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";

async function getProjectData(id)
{
    const endpoint = `https://proyectopsa.herokuapp.com/proyectos/${id}`;
    return (await fetch(endpoint)).json();
}

export default async function ProyectoPage()
{
    let { id } = useParams();
    const project = await getProjectData(id);
    const classes = makeStyles({});
    return (
        <div>
            <Typography variant="h1" component="h2">
                {project.nombre}
            </Typography>
            <Paper className={classes.root}>
                <Tabs
                    value={<div></div>}
                    onChange={() => {}}
                    indicatorColor="primary"
                    textColor="primary"
                    centered
                >
                    <Tab label="Tareas" />
                    <Tab label="Metricas" />
                    <Tab label="Ni idea" />
                </Tabs>
            </Paper>
        </div>
    );
}
