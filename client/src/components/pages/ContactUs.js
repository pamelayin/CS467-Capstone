import React from 'react'
import Navigation from '../layouts/Navigation'
import {Nav, Tab, Row, Col, Container} from 'react-bootstrap';

const ContactUs = () => {
    return (
        <div>
            <Navigation greeting = "Customer Service"/>
            <div>
                <Container style={{marginTop:30, marginBottom:15}}>
                    <span class="mb-0 h3">Frequently Asked Questions</span>
                </Container>
            <Tab.Container id="left-tabs-example" defaultActiveKey="first">
            <Row>
                <Col sm={3}>
                <Nav variant="pills" className="flex-column">
                    <Nav.Item>
                        <Nav.Link eventKey="first">Tab 1</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="second">Tab 2</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="thrid">Tab 3</Nav.Link>
                    </Nav.Item>                    
                </Nav>
                </Col>
                <Col sm={9}>
                <Tab.Content>
                    <Tab.Pane eventKey="first">
                    Some say thy fault is youth, some wantonness; Some say thy grace is youth and gentle sport; Both grace and faults are lov'd of more and less: Thou mak'st faults graces that to thee resort. As on the finger of a throned queen The basest jewel will be well esteem'd, So are those errors that in thee are seen To truths translated, and for true things deem'd. How many lambs might the stern wolf betray, If like a lamb he could his looks translate!
                    </Tab.Pane>
                    <Tab.Pane eventKey="second">
                    Cupid laid by his brand and fell asleep: A maid of Dian's this advantage found, And his love-kindling fire did quickly steep In a cold valley-fountain of that ground; Which borrow'd from this holy fire of Love, A dateless lively heat, still to endure, And grew a seeting bath, which yet men prove Against strange maladies a sovereign cure. But at my mistress' eye Love's brand new-fired, The boy for trial needs would touch my breast;
                    </Tab.Pane>
                    <Tab.Pane eventKey="thrid">
                    Americano by his brand and fell asleep: A maid of Dian's this advantage found, And his love-kindling fire did quickly steep In a cold valley-fountain of that ground; Which borrow'd from this holy fire of Love, A dateless lively heat, still to endure, And grew a seeting bath, which yet men prove Against strange maladies a sovereign cure. But at my mistress' eye Love's brand new-fired, The boy for trial needs would touch my breast;
                    </Tab.Pane>
                </Tab.Content>
                </Col>
            </Row>
            </Tab.Container>
            </div>
            <div>
                <Container style={{marginTop:30, marginBottom:15}}>
                    <span class="mb-0 h3" style={{marginBottom:5}}> Contact Us </span><br/>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    <br/>
                    <br/>
                    Phone: (123) 789 - 5678
                    <br/>
                    Email: quizbanana@quizbanana.com
                </Container>
            </div>
        </div>
    )
}

export default ContactUs
