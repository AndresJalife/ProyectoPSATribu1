import React, { Component } from 'react'
import {
    TabContent,
    TabPane,
    Nav,
    NavItem,
    NavLink,
    Card,
    Button,
    CardTitle,
    CardText,
    Row,
    Col,
    Container
} from 'reactstrap';
import classnames from 'classnames';

export default class ProyectoPage extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            project: {},
            active: '1',
        }
    }

    componentDidMount()
    {
        const id = this.props.match.params.id;
        fetch(`https://proyectopsa.herokuapp.com/proyectos/${id}`)
            .then(r => r.json())
            .then(r => {
                this.setState({
                    project: r.proyecto
                })
            });
    }


    render()
    {

        const toggle = tab => {
            if(this.state.active !== tab) this.setState({
                active:tab
            });
        }

        return (
            <div>
                <br />
                <Container className="themed-container" fluid="xl">
                <Nav tabs>
                    <NavItem>
                        <NavLink
                            className={classnames({ active: this.state.active === '1' })}
                            onClick={() => { toggle('1'); }}
                        >
                            General
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            className={classnames({ active: this.state.active === '2' })}
                            onClick={() => { toggle('2'); }}
                        >
                            Tareas
                        </NavLink>
                    </NavItem>
                </Nav>
                <TabContent activeTab={this.state.active}>
                    <TabPane tabId="1">
                        <Row>
                            <Col sm="12">
                                <h4>Tab 1 Contents</h4>
                            </Col>
                        </Row>
                    </TabPane>
                    <TabPane tabId="2">
                        <Row>
                            <Col sm="6">
                                <Card body>
                                    <CardTitle>Special Title Treatment</CardTitle>
                                    <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
                                    <Button>Go somewhere</Button>
                                </Card>
                            </Col>
                            <Col sm="6">
                                <Card body>
                                    <CardTitle>Special Title Treatment</CardTitle>
                                    <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
                                    <Button>Go somewhere</Button>
                                </Card>
                            </Col>
                        </Row>
                    </TabPane>
                </TabContent>
                </Container>
            </div>
        );
    }
}
