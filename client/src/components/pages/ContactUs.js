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
                        <Nav.Link eventKey="first">How to Contact QuizBanana</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="second">How to Create Test</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="thrid">How to Analyze Survey Results</Nav.Link>
                    </Nav.Item>                    
                </Nav>
                </Col>
                <Col sm={9}>
                <Tab.Content>
                    <Tab.Pane eventKey="first">
                        <span style={{fontWeight: 500}}>Email: </span><br />
                            We offer 24/7 English email support for all customers! 
                            In order to keep your account secure, please contact us from the email address on file for your account.<br /><br />
                        <span style={{fontWeight: 500}}>Phone: </span><br />
                            We also offer phone support Mon-Fri from 8am-5pm Pacific Time.<br /><br />
                            *You will be able to find our contact information below.
                    </Tab.Pane>
                    <Tab.Pane eventKey="second">
                        <span style={{fontWeight: 500}}>Creating Quiz</span><br />
                            Click Create Quiz in the upper-right corner of dashboard. <br /><br />
                        <span style={{fontWeight: 500}}>Question Type</span><br />
                            We have several open-ended and closed-ended question types. 
                            The settings within a question allow you to control the type of data the question will collect. 
                            Make sure you pick the right question type for your quiz. <br /><br />
                        <span style={{fontWeight: 500}}>Adding and Editing</span><br />
                            Add new questions to your survey clicking +New Question on the Design page. And, you can edit anytime before you complete the quiz design.
                    </Tab.Pane>
                    <Tab.Pane eventKey="thrid">
                        <span style={{fontWeight: 500}}>Understanding your quiz results</span><br />
                            View the past quize will display all quizzes you send out, click the one you want to see the results. 
                            You can see a summary view of your quiz results; browse individual responses as well by clicking a specific responder.
                            It also allows you modify the individual test reseult. <br /><br />
                        <span style={{fontWeight: 500}}>Missing responses</span><br />
                            Responses are recorded in the Analyze Results section of your quiz. 
                            Please check the result page if you think there are mssing responses. <br /><br />
                        <span style={{fontWeight: 500}}>Sharing your quiz result</span><br />
                            Unfortunately, we do not support the quiz sharing at this moment. 
                            We are trying out best to provide sharing service as soon as possible <br /><br />
                      
                    </Tab.Pane>
                </Tab.Content>
                </Col>
            </Row>
            </Tab.Container>
            </div>
            <div>
                <Container style={{marginTop:30, marginBottom:15}}>
                    <span class="mb-0 h3" style={{marginBottom:5}}> Contact Us </span><br/>
                    QuizBanana’s mission is to be ‘Earth’s most customer-centric company’, and our Customer Service team is an essential part of that mission. 
                    Through our innovative and technologies developed by our “CS” team, we support customers from multiple locations around the nation. 
                    We consider each contact an opportunity to advocate for customers and provide support via phone and email. 
                    
                    Working in a dynamic and fast paced environment, our CS team is continuously raising the bar on customer experience by advocating and 
                    inventing for customers, playing a key role in leading the way towards QuizBanana’s ultimate goal to be Earth’s most customer-centric company.
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
